# Personal Finance Management - Frontend

AngularJS 1.x frontend application for the Personal Finance Management System.

## Overview

This is a componentized AngularJS 1.x single-page application (SPA) that provides a user interface for managing personal finances. The application is structured with reusable components and services, following best practices for maintainability and scalability.

## Technology Stack

- **AngularJS 1.8.x** - Main framework
- **UI Router** - Client-side routing
- **Material Symbols** - Icon library
- **CSS3** - Custom styling with BEM-like naming (`pfm-` prefix)
- **lite-server** - Development server

## Project Structure

```
personal-finance-frontend/
├── app/
│   ├── app.js                           # Main module definition
│   ├── app.config.js                    # Routing configuration
│   ├── services/                        # Shared services
│   │   ├── api.service.js              # API wrapper with mock data
│   │   ├── auth.service.js             # Authentication state management
│   │   └── ui.service.js               # UI utilities (modals, notifications)
│   └── components/                      # Reusable UI components
│       ├── auth/                        # Authentication components
│       │   ├── login.component.js
│       │   ├── login.template.html
│       │   └── signup.component.js
│       ├── common/                      # Common/shared components
│       │   ├── modal.component.js
│       │   └── loading-spinner.component.js
│       ├── header/                      # Header navigation
│       │   ├── header.component.js
│       │   └── header.template.html
│       ├── sidebar/                     # Sidebar navigation
│       │   ├── sidebar.component.js
│       │   └── sidebar.template.html
│       ├── dashboard/                   # Dashboard view
│       │   ├── dashboard.component.js
│       │   ├── dashboard.template.html
│       │   ├── summary-cards.component.js
│       │   └── recent-transactions.component.js
│       ├── transactions/                # Transactions management
│       │   ├── transactions.component.js
│       │   ├── transactions.template.html
│       │   └── transaction-item.component.js
│       └── categories/                  # Categories management
│           ├── categories.component.js
│           └── category-item.component.js
├── assets/
│   └── styles.css                       # Main stylesheet
├── template/                            # Original UI templates (reference)
├── index.html                           # Main HTML file
├── package.json                         # Dependencies and scripts
└── README.md                            # This file
```

## Component Architecture

### Services

1. **ApiService** (`app/services/api.service.js`)
   - Wrapper for $http with base URL configuration
   - Currently returns mock data for all endpoints
   - TODO: Replace with real API calls when backend is ready
   - Methods: `getTransactions()`, `getCategories()`, `getDashboardStats()`, etc.

2. **AuthService** (`app/services/auth.service.js`)
   - Manages authentication state (login, logout, signup)
   - Stores user session in localStorage
   - Provides `isAuthenticated()` and `requireAuth()` for route protection
   - TODO: Integrate with backend authentication API

3. **UiService** (`app/services/ui.service.js`)
   - Utilities for modals, notifications, and confirmations
   - Event-based communication for UI components

### Components

#### Layout Components
- **Header** - Top navigation with branding and user info
- **Sidebar** - Side navigation with route links

#### Page Components
- **Dashboard** - Overview with summary cards and recent transactions
- **Transactions** - Full transactions list with filtering
- **Categories** - Category management interface

#### Reusable Components
- **Summary Cards** - Financial summary display
- **Recent Transactions** - Transaction list widget
- **Transaction Item** - Individual transaction display
- **Category Item** - Individual category card
- **Modal** - Reusable modal/dialog
- **Loading Spinner** - Loading indicator

#### Auth Components
- **Login** - User login form
- **Signup** - User registration form

## Setup & Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/hoangchung16-00/personal-finance-frontend.git
   cd personal-finance-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Running the Application

### Development Mode (Without Backend)

The application is configured to run standalone with mock data. All services return simulated responses, allowing you to develop and test the UI independently.

To test the application:

1. Start the dev server: `npm run start`
2. Navigate to `http://localhost:3000`
3. You'll be redirected to the login page
4. Enter any email/password to "login" (mock authentication)
5. After login, you'll have access to:
   - **Dashboard** - View financial summary and recent transactions
   - **Transactions** - Browse and manage transactions
   - **Categories** - Manage transaction categories

### Mock Authentication

The AuthService currently uses mock authentication:
- Any email/password combination will successfully "log in"
- User session is stored in localStorage
- Logout clears the session

To test protected routes:
1. Try accessing `/dashboard` without logging in → redirected to login
2. Log in with any credentials
3. Navigate through protected routes (dashboard, transactions, categories)
4. Click logout to clear session

## Routing

The application uses UI Router for client-side routing:

- `/login` - Login page (public)
- `/signup` - Signup page (public)
- `/dashboard` - Dashboard overview (protected)
- `/transactions` - Transactions list (protected)
- `/categories` - Categories management (protected)

Protected routes require authentication and will redirect to `/login` if the user is not authenticated.

## Styling & CSS

### CSS Architecture

- All CSS classes use the `pfm-` prefix to avoid naming collisions
- Component-based styling approach
- Responsive design using flexbox and CSS grid
- Mobile-friendly breakpoints at 768px and 480px

### Color Scheme

- **Primary**: `#13ec6d` (bright green)
- **Background Light**: `#f6f8f7`
- **Background Dark**: `#102218`
- **Text Dark**: `#0d1b13`
- **Text Muted**: `#4c9a6c`
- **Border**: `#cfe7d9`

### Icons

Material Symbols Outlined icons are used throughout the application. Icons are referenced by name in templates:
```html
<span class="material-symbols-outlined">dashboard</span>
```

## Development Workflow

### Adding a New Component

1. Create component file in `app/components/[category]/`
2. Define component using AngularJS `.component()` API:
   ```javascript
   angular.module('pfmApp')
     .component('pfMyComponent', {
       templateUrl: 'app/components/[category]/template.html',
       controller: MyComponentController,
       controllerAs: 'vm',
       bindings: {
         // Input bindings
       }
     });
   ```
3. Add component script to `index.html`
4. Add corresponding styles to `assets/styles.css` with `pfm-` prefix

### Adding a New Route

1. Open `app/app.config.js`
2. Add state definition in `routeConfig` function:
   ```javascript
   .state('app.myroute', {
     url: '/myroute',
     template: '<pf-my-component></pf-my-component>'
   })
   ```
3. For protected routes, they inherit from `app` abstract state (already protected)

### Mock Data

All mock data is defined in `app/services/api.service.js`. When the backend is ready:

1. Update the `baseUrl` in ApiService
2. Replace `$q.resolve()` mock responses with `$http` calls
3. Add proper error handling

## API Integration (Future)

When integrating with the backend:

1. **Update ApiService** (`app/services/api.service.js`):
   - Set correct `baseUrl`
   - Replace mock methods with real HTTP calls
   - Add request/response interceptors for authentication tokens

2. **Update AuthService** (`app/services/auth.service.js`):
   - Integrate with real authentication endpoints
   - Handle JWT tokens properly
   - Implement token refresh logic

3. **Error Handling**:
   - Add proper error handling in all API calls
   - Display user-friendly error messages
   - Handle network failures gracefully

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Known Limitations

- Mock authentication only (no real security)
- No actual data persistence (localStorage only)
- Limited mobile menu (sidebar hidden on mobile)
- No offline support
- No internationalization (i18n)

## Future Enhancements

- [ ] Integrate with real backend API
- [ ] Add form validation throughout
- [ ] Implement mobile responsive sidebar/menu
- [ ] Add data visualization (charts for cash flow)
- [ ] Implement budget tracking features
- [ ] Add savings goals tracker
- [ ] Add export functionality (CSV, PDF)
- [ ] Implement search and advanced filtering
- [ ] Add user profile management
- [ ] Implement settings page
- [ ] Add dark mode support
- [ ] Add unit tests (Jasmine/Karma)
- [ ] Add e2e tests (Protractor)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC

## Contact

For questions or issues, please open an issue on GitHub.