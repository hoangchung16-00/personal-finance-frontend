# Quick Start Guide - API Integration

This is a quick reference for getting the frontend connected to the backend API.

## Prerequisites

✅ Backend API running (usually at `http://localhost:3000`)
✅ User account created in backend
✅ API key generated for the user

## 5-Minute Setup

### Step 1: Configure API URL

Edit `app/app.constants.js`:

```javascript
BASE_URL: 'http://localhost:3000/api/v1',  // Change for your environment
```

### Step 2: Generate API Key

In your Rails backend console (`rails c`):

```ruby
# Create a user (if you don't have one)
user = User.create!(
  email: "dev@example.com",
  first_name: "Developer",
  last_name: "User"
)

# Generate API key
api_key = user.generate_api_key
puts "Your API key: #{api_key}"
# Copy this key - you'll need it!
```

### Step 3: Set API Key in Browser

Open your browser console (F12) and run:

```javascript
// Set your API key
localStorage.setItem('pfm_api_key', 'paste_your_api_key_here');

// Set user info
localStorage.setItem('pfm_user', JSON.stringify({
  id: 1,
  email: 'dev@example.com',
  name: 'Developer User'
}));

// Reload the page
location.reload();
```

### Step 4: Start the Frontend

```bash
npm install  # First time only
npm start
```

Navigate to `http://localhost:3000` (or the port shown)

## Verify It's Working

### Check 1: Dashboard Loads
- Go to the dashboard
- Should see "Loading dashboard..." briefly
- Then data should appear (or empty state if no data in backend)

### Check 2: Console Shows No Errors
- Open browser console (F12)
- Should not see any 401 or 403 errors
- Network tab should show successful API calls

### Check 3: Test an Action
- Try deleting a transaction (if you have any)
- Or check if categories load on the categories page

## Common Issues

### ❌ "Cannot connect to server"
**Solution:** Backend not running or wrong URL in config
```bash
# In backend directory
rails server
```

### ❌ "Invalid or missing API key"
**Solution:** API key not set or expired
- Generate a new key (Step 2)
- Set it in browser (Step 3)

### ❌ CORS errors
**Solution:** Backend CORS not configured
- Check `config/initializers/cors.rb` in backend
- Should allow your frontend origin

### ❌ Empty data everywhere
**Solution:** Backend has no data
```ruby
# In Rails console - create some test data
user = User.first
account = user.accounts.create!(name: "Test Account", account_type: "checking", balance: 1000)
category = user.categories.create!(name: "Groceries")
account.transactions.create!(
  amount: 50,
  transaction_type: "expense",
  date: Date.today,
  description: "Test transaction",
  category: category
)
```

## Quick Test Commands

### Test API from command line:
```bash
# Set your API key
export API_KEY="your_api_key_here"

# Test accounts
curl -H "Authorization: Bearer $API_KEY" http://localhost:3000/api/v1/accounts

# Test categories  
curl -H "Authorization: Bearer $API_KEY" http://localhost:3000/api/v1/categories

# Test transactions
curl -H "Authorization: Bearer $API_KEY" http://localhost:3000/api/v1/transactions
```

### Use the test script:
```bash
chmod +x test-api-integration.sh
./test-api-integration.sh
```

## Next Steps

Once basic integration is working:

1. ✅ Create some accounts via Rails console
2. ✅ Create some categories
3. ✅ Create some transactions
4. ✅ Test the UI to see real data
5. ✅ Try filtering transactions
6. ✅ Try deleting a transaction

For more details, see:
- **API_INTEGRATION.md** - Comprehensive integration guide
- **IMPLEMENTATION_SUMMARY.md** - What was implemented
- **README.md** - General project info

## Production Deployment

For production:

1. Update `BASE_URL` to your production API:
   ```javascript
   BASE_URL: 'https://api.yourapp.com/api/v1'
   ```

2. Ensure HTTPS is used

3. Implement real login endpoint (replace mock auth)

4. Use secure session management (consider JWT instead of localStorage)

5. Enable production optimizations (minification, etc.)

## Need Help?

1. Check the troubleshooting section in API_INTEGRATION.md
2. Verify backend is running and accessible
3. Check browser console for error messages
4. Verify API key is valid and not expired
5. Test API endpoints with curl to isolate issues

---

**TIP:** Keep your API key secret! Never commit it to git or share it publicly.
