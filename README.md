# personal-finance-frontend

AngularJS 1.8 frontend for the Personal Finance Management System.

## Overview

This is a UI-only feature branch that componentizes the existing template markup into a reusable AngularJS 1.8 component architecture with mocked services, allowing frontend development and testing without a backend.

## Features

- **Component-based architecture** using AngularJS 1.8 `.component()` API
- **UI Router** for client-side routing with route protection
- **Tailwind CSS** for styling utilities (via CDN)
- **Mocked services** for API calls (ApiService, AuthService, UiService)
- **Responsive design** with dark mode support
- **Material Symbols** icons for consistent UI

## Component Structure

```
app/
├── app.js                          # Main module bootstrap
├── app.config.js                   # UI Router configuration
├── services/
│   ├── api.service.js              # Mocked API calls
│   ├── auth.service.js             # Authentication & localStorage
│   └── ui.service.js               # UI helpers (modals, notifications)
├── components/
│   ├── auth/
│   │   ├── login.component.js      # Login page
│   │   └── login.template.html
│   ├── dashboard/
│   │   ├── dashboard.component.js  # Main dashboard
│   │   ├── dashboard.template.html
│   │   ├── summary-cards.component.js
│   │   └── recent-transactions.component.js
│   ├── transactions/
│   │   ├── transactions.component.js
│   │   ├── transactions.template.html
│   │   └── transaction-item.component.js
│   ├── categories/
│   │   ├── categories.component.js
│   │   └── categories.template.html
│   ├── header/
│   │   ├── header.component.js
│   │   └── header.template.html
│   ├── sidebar/
│   │   ├── sidebar.component.js
│   │   └── sidebar.template.html
│   └── common/
│       └── modal.component.js      # Reusable modal
assets/
└── styles.css                      # Custom styles with pfm- prefix
```

## Run Locally

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation & Startup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

### Mock Login Credentials

The application uses mocked authentication - **any email and password combination will work**. 

Example:
- Email: `demo@example.com`
- Password: `password`

The mock AuthService will accept any credentials and create a demo user session.

## Available Routes

- `/login` - Login page (public)
- `/dashboard` - Dashboard with summary and recent transactions (protected)
- `/transactions` - Full transaction list with filters (protected)
- `/categories` - Category management (protected)

## Mocked Data

### ApiService Returns:

**User:**
```json
{ "id": 1, "name": "Demo User", "email": "demo@example.com" }
```

**Categories:**
```json
[
  { "id": 1, "name": "Groceries", "type": "expense", "icon": "shopping_cart", "color": "#FF9800" },
  { "id": 2, "name": "Rent", "type": "expense", "icon": "home", "color": "#FF5252" },
  { "id": 3, "name": "Salary", "type": "income", "icon": "payments", "color": "#13ec6d" }
]
```

**Transactions:**
```json
[
  { "id": 1, "amount": 45.50, "date": "2026-01-15", "category": "Groceries", "description": "Supermarket", "type": "expense" },
  { "id": 2, "amount": 5200.00, "date": "2026-01-20", "category": "Salary", "description": "Tech Corp Salary", "type": "income" }
]
```

**Summary:**
```json
{
  "income": 5000,
  "expenses": 1234.56,
  "balance": 3765.44,
  "totalBalance": 24560.00,
  "monthlyIncome": 5200.00,
  "monthlyExpenses": 3120.00
}
```

## Next Steps for API Integration

When the backend API is ready:

1. **Update ApiService** (`app/services/api.service.js`):
   - Replace `$q.resolve()` mock calls with real `$http` calls
   - Update endpoints to match backend API
   - Add error handling and request/response transformations

2. **Update AuthService** (`app/services/auth.service.js`):
   - Implement real JWT token handling
   - Add token refresh logic
   - Update login/logout to use real API endpoints

3. **Add HTTP Interceptor**:
   - Inject auth token in request headers
   - Handle 401 errors and redirect to login
   - Add loading indicators for requests

4. **Environment Configuration**:
   - Add API base URL configuration
   - Support multiple environments (dev, staging, prod)

## Technology Stack

- **AngularJS**: 1.8.x
- **UI Router**: 1.0.30
- **Tailwind CSS**: 3.x (via CDN)
- **Material Symbols**: Google Material Icons
- **Lite Server**: Development server

## Development Notes

- No build pipeline required - all scripts loaded directly
- Tailwind CSS via CDN (no build step needed)
- Components use `templateUrl` for separation of concerns
- All mocked data defined in `api.service.js` for easy updates
- Authentication state persisted in `localStorage` for demo purposes

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

ISC