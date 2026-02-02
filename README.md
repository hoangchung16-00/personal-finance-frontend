# personal-finance-frontend

AngularJS 1.x frontend for the Personal Finance Management System.

## Overview

This is a componentized AngularJS 1.8 application that provides a user interface for managing personal finances. The UI is designed to work independently of the backend using mocked data, making it easy to develop and test UI features before API integration.

## Features

- 🔐 **Authentication**: Login and signup pages (UI-only, mocked)
- 📊 **Dashboard**: Financial overview with summary cards, charts, and recent transactions
- 💰 **Transactions**: List, filter, and manage income/expense transactions
- 🏷️ **Categories**: Customize transaction categories with icons and colors
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Clean UI**: Modern design with consistent `pfm-` prefixed CSS classes

## Project Structure

```
├── app/
│   ├── app.js                    # Main app module with ui-router
│   ├── app.config.js             # Route configuration with protected routes
│   ├── components/
│   │   ├── auth/                 # Login and signup components
│   │   ├── common/               # Reusable components (modal, spinner)
│   │   ├── dashboard/            # Dashboard and sub-components
│   │   ├── header/               # App header component
│   │   ├── sidebar/              # Navigation sidebar component
│   │   ├── transactions/         # Transaction list and management
│   │   └── categories/           # Category management UI
│   └── services/
│       ├── api.service.js        # API wrapper with mocked methods
│       ├── auth.service.js       # UI-level authentication state
│       └── ui.service.js         # UI utilities (modals, notifications)
├── assets/
│   └── styles.css                # Global styles with pfm- prefix
├── template/                     # Original HTML templates (reference)
├── index.html                    # Main HTML file
└── package.json                  # NPM dependencies
```

## Component Map

### Core Components

- **pfmLogin** - Login page with form validation
- **pfmSignup** - User registration page
- **pfmHeader** - Top navigation bar with user menu
- **pfmSidebar** - Side navigation with app links

### Feature Components

- **pfmDashboard** - Main dashboard view
  - **pfmSummaryCards** - Financial summary stats
  - **pfmRecentTransactions** - Recent transaction list
- **pfmTransactions** - Transaction management page
  - **pfmTransactionItem** - Individual transaction row
- **pfmCategories** - Category customization page
  - **pfmCategoryItem** - Individual category card

### Common Components

- **pfmModal** - Reusable modal dialog
- **pfmLoadingSpinner** - Loading indicator

## Installation & Setup

### Prerequisites

- Node.js (v12 or higher)
- npm

### Steps

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Using the Application

### Login

The app starts at the login page. Use these demo credentials:

- **Email**: demo@example.com
- **Password**: demo123

Or create a new account using the signup page (data is stored in localStorage).

### Navigation

After logging in, you'll see:

- **Dashboard** - Overview of your finances with charts and recent transactions
- **Transactions** - Full list of transactions with filtering options
- **Categories** - Manage transaction categories
- **Other features** - Coming soon (Budgets, Savings, Reports)

### Key Features

- All data is mocked - no backend required
- Navigation uses ui-router for client-side routing
- Protected routes require authentication
- Logout clears the session

## Development Notes

### Mocked Data

**Note:** The application is now integrated with the backend API. The mock data has been replaced with real API calls.

For development without a backend, you can temporarily use the mocked data by:
1. Keeping an older version of `api.service.js`
2. Or running the frontend standalone (it will show API connection errors)

For proper API integration, see [API_INTEGRATION.md](API_INTEGRATION.md).

### Styling

- All custom CSS classes use the `pfm-` prefix
- Responsive design with flexbox and CSS grid
- CSS variables for theming (see `:root` in `assets/styles.css`)

### Adding New Components

1. Create component file in appropriate directory
2. Define component using AngularJS 1.8 `.component()` API
3. Add script tag to `index.html`
4. Add route in `app/app.config.js` if needed

Example:
```javascript
angular.module('pfmApp')
  .component('myComponent', {
    templateUrl: 'path/to/template.html',
    controller: ['$scope', function($scope) {
      // Controller logic
    }]
  });
```

## API Integration

The application is now integrated with the backend API! See [API_INTEGRATION.md](API_INTEGRATION.md) for detailed documentation.

**Key Changes:**
- All API endpoints are now connected to the backend
- Bearer token authentication using API keys
- Full CRUD operations for accounts, categories, and transactions
- Global error handling via HTTP interceptor

**To use the API:**
1. Start the backend server (Rails API)
2. Generate an API key via Rails console
3. Set the API key in localStorage (see API_INTEGRATION.md)
4. Start the frontend and navigate to the dashboard

**Important:** The BASE_URL in `app/services/api.service.js` may need to be updated for development:
```javascript
var BASE_URL = 'http://localhost:3000/api/v1'; // For local development
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

**Issue**: "Module 'ui.router' not found"
- **Solution**: Run `npm install` to install ui-router dependency

**Issue**: Scripts not loading
- **Solution**: Ensure all script paths in `index.html` are correct

**Issue**: Login not working
- **Solution**: Check browser console for errors. Use demo credentials: demo@example.com / demo123

## Next Steps

1. ✅ Component structure created
2. ✅ Routing configured with protected routes
3. ✅ Mocked data services implemented
4. ✅ Integrated with backend API
5. 🔲 Add transaction modals (create/edit)
6. 🔲 Add category modals (create/edit)
7. 🔲 Add account management UI
8. 🔲 Implement budget management
9. 🔲 Add savings goals tracker
10. 🔲 Create analytics and reports
11. 🔲 Add unit tests

## License

ISC