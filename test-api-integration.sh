#!/bin/bash
# API Integration Test Script
# This script helps verify the API integration is working correctly

echo "=================================="
echo "Personal Finance API Integration Test"
echo "=================================="
echo ""

# Check if backend is running
echo "1. Checking if backend API is accessible..."
BACKEND_URL="http://localhost:3000"
if curl -s -o /dev/null -w "%{http_code}" "${BACKEND_URL}/up" | grep -q "200"; then
    echo "✓ Backend is accessible at ${BACKEND_URL}"
else
    echo "✗ Cannot reach backend at ${BACKEND_URL}"
    echo "  Please ensure the Rails backend is running: rails server"
    exit 1
fi

echo ""
echo "2. Testing API endpoints (requires valid API key)..."
echo ""

# Prompt for API key
read -p "Enter your API key (or press Enter to skip API tests): " API_KEY

if [ -z "$API_KEY" ]; then
    echo "Skipping API endpoint tests."
    echo ""
    echo "To generate an API key, run in Rails console:"
    echo "  user = User.find_by(email: 'your_email@example.com')"
    echo "  api_key = user.generate_api_key"
    echo "  puts \"API Key: #{api_key}\""
else
    echo ""
    echo "Testing with API key: ${API_KEY:0:10}..."
    
    # Test accounts endpoint
    echo ""
    echo "→ Testing GET /api/v1/accounts"
    RESPONSE=$(curl -s -w "\n%{http_code}" \
        -H "Authorization: Bearer ${API_KEY}" \
        -H "Content-Type: application/json" \
        "${BACKEND_URL}/api/v1/accounts")
    
    STATUS=$(echo "$RESPONSE" | tail -n1)
    BODY=$(echo "$RESPONSE" | sed '$d')
    
    if [ "$STATUS" = "200" ]; then
        echo "✓ Accounts endpoint working (Status: 200)"
        COUNT=$(echo "$BODY" | grep -o '"id"' | wc -l)
        echo "  Found ${COUNT} accounts"
    else
        echo "✗ Accounts endpoint failed (Status: ${STATUS})"
        echo "  Response: ${BODY}"
    fi
    
    # Test categories endpoint
    echo ""
    echo "→ Testing GET /api/v1/categories"
    RESPONSE=$(curl -s -w "\n%{http_code}" \
        -H "Authorization: Bearer ${API_KEY}" \
        -H "Content-Type: application/json" \
        "${BACKEND_URL}/api/v1/categories")
    
    STATUS=$(echo "$RESPONSE" | tail -n1)
    BODY=$(echo "$RESPONSE" | sed '$d')
    
    if [ "$STATUS" = "200" ]; then
        echo "✓ Categories endpoint working (Status: 200)"
        COUNT=$(echo "$BODY" | grep -o '"id"' | wc -l)
        echo "  Found ${COUNT} categories"
    else
        echo "✗ Categories endpoint failed (Status: ${STATUS})"
        echo "  Response: ${BODY}"
    fi
    
    # Test transactions endpoint
    echo ""
    echo "→ Testing GET /api/v1/transactions"
    RESPONSE=$(curl -s -w "\n%{http_code}" \
        -H "Authorization: Bearer ${API_KEY}" \
        -H "Content-Type: application/json" \
        "${BACKEND_URL}/api/v1/transactions")
    
    STATUS=$(echo "$RESPONSE" | tail -n1)
    BODY=$(echo "$RESPONSE" | sed '$d')
    
    if [ "$STATUS" = "200" ]; then
        echo "✓ Transactions endpoint working (Status: 200)"
        COUNT=$(echo "$BODY" | grep -o '"id"' | wc -l)
        echo "  Found ${COUNT} transactions"
    else
        echo "✗ Transactions endpoint failed (Status: ${STATUS})"
        echo "  Response: ${BODY}"
    fi
fi

echo ""
echo "=================================="
echo "Test Summary"
echo "=================================="
echo ""
echo "Frontend Configuration:"
echo "  - API Base URL: Check app/services/api.service.js"
echo "  - Current setting: /api/v1"
echo "  - For local development, update to: http://localhost:3000/api/v1"
echo ""
echo "To use the frontend with API:"
echo "  1. Ensure backend is running"
echo "  2. Generate an API key"
echo "  3. Open browser console and run:"
echo "     localStorage.setItem('pfm_api_key', 'your_api_key');"
echo "     localStorage.setItem('pfm_user', JSON.stringify({id: 1, email: 'test@example.com', name: 'Test User'}));"
echo "     location.reload();"
echo "  4. Navigate to the dashboard"
echo ""
echo "For more details, see API_INTEGRATION.md"
echo ""
