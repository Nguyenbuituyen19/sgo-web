#!/bin/bash
# Script kiểm tra FAQ từ API provision-details

API_BASE="http://localhost:8080/api/v1"

echo "=========================================="
echo "KIỂM TRA FAQ TỪ ENDPOINT PROVISION-DETAILS"
echo "=========================================="
echo ""

# Lấy danh sách provisions
echo "1. Lấy danh sách provisions..."
PROVISIONS=$(curl -s "$API_BASE/provision/active" | jq -r '.data[] | select(.code == "web") | {id, code, name}')
echo "$PROVISIONS"
echo ""

# Extract provision ID
PROVISION_ID=$(echo "$PROVISIONS" | jq -r '.id')
echo "Provision ID: $PROVISION_ID"
echo ""

# Lấy chi tiết provision (bao gồm FAQs)
echo "2. Lấy chi tiết provision (có FAQs)..."
curl -s "$API_BASE/provision-details/$PROVISION_ID" | jq '.'
echo ""

echo "=========================================="
echo "HOÀN TẤT"
echo "=========================================="
