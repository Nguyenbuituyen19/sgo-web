$ErrorActionPreference = 'Stop'
$authTestTag = 'sgodata-auth-it-' + [Guid]::NewGuid().ToString('N').Substring(0, 8)
$authTestNetwork = $authTestTag + '-net'
$authTestDb = $authTestTag + '-db'
$authTestPassword = [Guid]::NewGuid().ToString('N')
$authTestNetworkCreated = $false
$authTestDbCreated = $false
$authTestExitCode = 1

try {
  docker network create --internal --label codex.task=sgo-auth-verification $authTestNetwork | Out-Null
  if ($LASTEXITCODE -ne 0) { throw 'Could not create the isolated test network.' }
  $authTestNetworkCreated = $true
  docker run -d --rm --name $authTestDb --network $authTestNetwork --label codex.task=sgo-auth-verification --tmpfs /var/lib/postgresql/data -e POSTGRES_DB=auth_it -e POSTGRES_USER=auth_it -e "POSTGRES_PASSWORD=$authTestPassword" postgres:17-alpine | Out-Null
  if ($LASTEXITCODE -ne 0) { throw 'Could not create the isolated test database.' }
  $authTestDbCreated = $true

  $authTestReady = $false
  for ($attempt = 0; $attempt -lt 60; $attempt++) {
    docker exec $authTestDb pg_isready -U auth_it -d auth_it | Out-Null
    if ($LASTEXITCODE -eq 0) { $authTestReady = $true; break }
    Start-Sleep -Milliseconds 500
  }
  if (-not $authTestReady) { throw 'The isolated test database did not become ready.' }

  $authTestArguments = @(
    'run', '--rm', '--network', $authTestNetwork,
    '-e', "IT_DB_URL=jdbc:postgresql://${authTestDb}:5432/auth_it",
    '-e', 'IT_DB_USER=auth_it', '-e', "IT_DB_PASSWORD=$authTestPassword",
    '-e', 'DB_MIGRATION_USER=auth_it', '-e', "DB_MIGRATION_PASSWORD=$authTestPassword",
    '-e', 'PAYMENT_BANK_BIN=000000', '-e', 'PAYMENT_BANK_ACCOUNT_NUMBER=integration-only',
    '-e', 'PAYMENT_BANK_ACCOUNT_NAME=Integration',
    '-e', 'VIETQR_CLIENT_ID=integration-only', '-e', 'VIETQR_API_KEY=integration-only',
    '-e', 'SPRING_MAIL_HOST=127.0.0.1', '-e', 'SPRING_MAIL_PORT=9',
    '-e', 'SPRING_MAIL_USERNAME=integration-only', '-e', 'SPRING_MAIL_PASSWORD=integration-only',
    '-e', 'CORE_OUTBOX_ENABLED=false', '-e', 'CORE_JOBS_ENABLED=false',
    '-e', 'CORE_JOBS_SCHEDULER_ENABLED=false',
    'sgodata-auth-verify:local', 'mvn', '-B', '-o', '-Dtest=CustomerRegistrationIntegrationTest', 'test'
  )
  docker @authTestArguments
  $authTestExitCode = $LASTEXITCODE
} finally {
  if ($authTestDbCreated) { docker stop $authTestDb | Out-Null }
  if ($authTestNetworkCreated) { docker network rm $authTestNetwork | Out-Null }
}
exit $authTestExitCode
