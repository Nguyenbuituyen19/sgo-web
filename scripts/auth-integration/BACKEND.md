# Customer account integration

The website uses the existing Spring backend at `NEXT_PUBLIC_API_URL` (default `http://localhost:8080`). Browser requests go through `/api/auth/*` on the Next.js server. Access and refresh tokens stay in HttpOnly cookies; browser responses contain only the account or MFA challenge.

## Account registration

`POST /api/v1/auth/register` accepts `email`, `displayName`, and `password`. The form's account name is stored in `identity.account.display_name`; customers sign in using Email.

The backend validates and normalizes input, hashes the password with the existing Argon2id encoder, and saves the account, `application-user` role binding, permission revision, and audit event in one transaction. Role and tenant never come from the browser. The backend selects `core.customer.tenant-key`, defaulting to `default`.

Existing account, role and session tables are reused. No new account table or migration is needed. Registrations appear in the existing admin account list for the same tenant. Customer accounts cannot call account-management APIs.

The implementation is installed in `../sgodata_web/backend`: CustomerRegistrationController, AuthController, SecurityConfig and OrderService, plus four focused test classes. The backend Docker container has been rebuilt and started with the new registration API.

## Website behavior

Registration creates the account, then signs in using the existing login API. Login supports enrolled MFA and recovery codes. Password-only login is allowed for unenrolled customers who have exclusively the normal user role and no administrative/global policy. Administrators and enrolled customers retain their MFA requirements.

Selecting a Cloud package, adding a suggested service, choosing a license purchase, or continuing checkout checks the server session. Anonymous customers can sign in or sign up in the shared popup, then resume the requested action. Cart selections remain available across authentication, reloads, and storage updates from another tab.

`POST /api/v1/orders/create` requires authentication and takes the customer Email from that account rather than the request's Email.

The existing checkout still simulates order submission; this change connects account registration/login and purchase authentication, not payment processing or checkout persistence. Public Email password recovery is also not yet implemented.

## Verification

Completed: TypeScript, ESLint with zero errors in changed files, 17 auth BFF scenarios, 8 cart-storage scenarios, 13 backend unit tests, and 5 integration cases against a new temporary PostgreSQL database. Existing font/unused-variable/internal-navigation warnings remain in the layout and Cloud pricing files.

Run the frontend checks from the website project root:

```powershell
node scripts/auth-integration/check-auth-bff.mjs
node scripts/auth-integration/check-cart-store.mjs
```

Build the Java 21 verification image from backend source, then run isolated integration checks:

```powershell
docker build -f scripts/auth-integration/Dockerfile.verify -t sgodata-auth-verify:local ../sgodata_web/backend
& scripts/auth-integration/Verify-Backend.ps1
```

The verification script creates a separate internal Docker network and a PostgreSQL container with synthetic credentials, runs Maven offline in the verification image, and removes temporary resources afterward. It does not use the application database. Never point CustomerRegistrationIntegrationTest at a shared application database: its existing test harness resets the test admin password.
