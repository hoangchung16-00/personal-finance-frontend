# API Integration Guide

## Overview

This frontend application has been integrated with the Personal Finance Backend API. The integration includes support for:

- **Authentication**: Bearer token (API key) authentication
- **Accounts**: Create, read, update, and delete financial accounts
- **Categories**: Manage transaction categories
- **Transactions**: Full CRUD operations with filtering support

## Configuration

### API Base URL

The API base URL is configured in `app/services/api.service.js`:

```javascript
var BASE_URL = '/api/v1'; // Backend API base URL
```

**For development**, you may need to update this to point to your backend server:

```javascript
var BASE_URL = 'http://localhost:3000/api/v1'; // For local Rails backend
```

### CORS Configuration

If your frontend and backend are on different domains/ports, ensure your backend has CORS properly configured. The Rails backend should already have this configured in `config/initializers/cors.rb`.

## Authentication

### API Key Setup

The application uses API key authentication as documented in the backend API.

#### How to Get an API Key

1. **Via Rails Console** (for development):
   ```ruby
   # In your backend Rails console (rails c)
   user = User.find_by(email: "your_email@example.com")
   api_key = user.generate_api_key
   puts "Your API key: #{api_key}"
   ```

2. **Store in Frontend**:
   The API key is stored in localStorage under the key `pfm_api_key`.

#### Setting Up a Demo Session

For testing purposes, you can manually set an API key:

1. Open browser console
2. Run:
   ```javascript
   localStorage.setItem('pfm_api_key', 'your_api_key_here');
   localStorage.setItem('pfm_user', JSON.stringify({
     id: 1,
     email: 'demo@example.com',
     name: 'Demo User'
   }));
   ```
3. Refresh the page

### Login Flow

The current implementation has a mock login flow. To integrate with a real authentication endpoint:

1. Update `app/services/auth.service.js`
2. Replace the mock `login()` method with a real API call
3. The backend should return both user data and an API key

Example:
```javascript
service.login = function(email, password) {
  return $http.post('/api/auth/login', { email: email, password: password })
    .then(function(response) {
      var user = response.data.user;
      var apiKey = response.data.api_key;
      service.setSession(apiKey, user);
      return { success: true, user: user };
    });
};
```

## API Endpoints

### Accounts

```javascript
// List all accounts
ApiService.getAccounts()
  .then(function(response) {
    var accounts = response.data;
  });

// Get single account
ApiService.getAccount(accountId)
  .then(function(response) {
    var account = response.data;
  });

// Create account
ApiService.createAccount({
  name: 'Savings Account',
  account_type: 'savings',
  balance: 10000.00,
  currency: 'USD'
})
  .then(function(response) {
    var newAccount = response.data;
  });

// Update account
ApiService.updateAccount(accountId, {
  name: 'Updated Account Name'
})
  .then(function(response) {
    var updatedAccount = response.data;
  });

// Delete account
ApiService.deleteAccount(accountId)
  .then(function() {
    // Account deleted successfully
  });
```

### Categories

```javascript
// List all categories
ApiService.getCategories()
  .then(function(response) {
    var categories = response.data;
  });

// Create category
ApiService.createCategory({
  name: 'Utilities'
})
  .then(function(response) {
    var newCategory = response.data;
  });

// Update category
ApiService.updateCategory(categoryId, {
  name: 'Food & Groceries'
})
  .then(function(response) {
    var updatedCategory = response.data;
  });

// Delete category
ApiService.deleteCategory(categoryId)
  .then(function() {
    // Category deleted successfully
  });
```

### Transactions

```javascript
// List all transactions (with optional filters)
ApiService.getTransactions({
  start_date: '2026-01-01',
  end_date: '2026-01-31',
  transaction_type: 'expense',
  category_id: 1
})
  .then(function(response) {
    var transactions = response.data;
  });

// List transactions for a specific account
ApiService.getAccountTransactions(accountId, {
  transaction_type: 'income'
})
  .then(function(response) {
    var transactions = response.data;
  });

// Get single transaction
ApiService.getTransaction(transactionId)
  .then(function(response) {
    var transaction = response.data;
  });

// Create transaction
ApiService.createTransaction(accountId, {
  amount: 50.00,
  transaction_type: 'expense',
  date: '2026-02-01',
  description: 'Grocery shopping',
  category_id: 1,
  notes: 'Weekly groceries',
  tags: ['food', 'weekly']
})
  .then(function(response) {
    var newTransaction = response.data;
  });

// Update transaction
ApiService.updateTransaction(transactionId, {
  amount: 75.00,
  description: 'Updated description'
})
  .then(function(response) {
    var updatedTransaction = response.data;
  });

// Delete transaction
ApiService.deleteTransaction(transactionId)
  .then(function() {
    // Transaction deleted successfully
  });
```

## Error Handling

### HTTP Interceptor

The application includes a global HTTP interceptor that handles common API errors:

- **401 Unauthorized**: Redirects to login page
- **404 Not Found**: Shows "Resource not found" notification
- **422 Validation Error**: Displays validation error messages
- **400 Bad Request**: Shows "Invalid request" notification
- **500+ Server Errors**: Shows "Server error" notification
- **Network Errors (-1)**: Shows "Cannot connect to server" notification

### Custom Error Handling

You can also handle errors in individual components:

```javascript
ApiService.getTransactions()
  .then(function(response) {
    ctrl.transactions = response.data;
  })
  .catch(function(error) {
    console.error('Failed to load transactions:', error);
    if (error.status === 422) {
      // Handle validation error
      UiService.error(error.data.error);
    } else {
      // Handle other errors
      UiService.error('Failed to load transactions');
    }
  });
```

## Data Structure Mapping

### Transactions

The backend returns transactions with these fields:
- `transaction_type` (income|expense|transfer)
- `category` (object with `id` and `name`)
- `account` (object with account details)

The frontend transforms this to:
- `type` (mapped from `transaction_type`)
- `category` (extracted name from category object)
- `amount` (parsed as float)

### Categories

The backend returns minimal category data:
- `id`
- `name`
- `user_id`
- `created_at`
- `updated_at`

The frontend adds:
- `icon` (emoji based on category name)
- `color` (default color based on category name)
- `type` (income|expense, guessed from name)

## Testing

### Quick Test Setup

1. **Start the backend server**:
   ```bash
   cd personal-finance-backend
   rails server
   ```

2. **Start the frontend server**:
   ```bash
   cd personal-finance-frontend
   npm start
   ```

3. **Generate API key** (in Rails console):
   ```ruby
   user = User.create!(
     email: "test@example.com",
     first_name: "Test",
     last_name: "User"
   )
   api_key = user.generate_api_key
   puts "API Key: #{api_key}"
   ```

4. **Set API key in browser console**:
   ```javascript
   localStorage.setItem('pfm_api_key', 'your_api_key_here');
   localStorage.setItem('pfm_user', JSON.stringify({
     id: 1,
     email: 'test@example.com',
     name: 'Test User'
   }));
   location.reload();
   ```

### Test Checklist

- [ ] Create an account via the UI (when modal is implemented)
- [ ] View accounts list
- [ ] Create a category via the UI (when modal is implemented)
- [ ] View categories list
- [ ] Create a transaction via the UI (when modal is implemented)
- [ ] View transactions list
- [ ] Filter transactions by category
- [ ] Filter transactions by type
- [ ] Delete a transaction
- [ ] Check dashboard stats update correctly
- [ ] Test error handling (try with invalid API key)

## Production Deployment

### Environment Configuration

For production deployment:

1. **Update BASE_URL** in `api.service.js`:
   ```javascript
   var BASE_URL = 'https://your-backend-api.com/api/v1';
   ```

2. **Consider using environment variables**:
   - Use a build tool like webpack to inject environment-specific URLs
   - Or use Angular constants configured at build time

3. **Security Checklist**:
   - [ ] API keys are never committed to version control
   - [ ] HTTPS is used for all API communication
   - [ ] Backend has proper CORS configuration
   - [ ] Rate limiting is configured on backend
   - [ ] API keys can be revoked if compromised

## Troubleshooting

### "Cannot connect to server"

- Check that the backend is running
- Verify the BASE_URL is correct
- Check browser console for CORS errors
- Ensure backend CORS is properly configured

### "Invalid or missing API key"

- Check that API key is stored: `localStorage.getItem('pfm_api_key')`
- Verify the API key is valid (not revoked)
- Check that Authorization header is being sent (Network tab)

### Data Not Showing Up

- Check browser console for errors
- Verify API is returning data (Network tab)
- Check data transformation logic in components
- Ensure response.data is being accessed correctly

### Empty Categories/Transactions

- Backend may not have seed data
- Create categories and transactions via Rails console or API
- Check that user_id associations are correct

## Next Steps

1. Implement modals for creating/editing accounts, categories, and transactions
2. Add proper authentication endpoint integration
3. Implement account management UI
4. Add date range picker for transaction filters
5. Implement export functionality
6. Add budget management features
7. Implement savings goals tracking
8. Add analytics and reports
