# Contracts Management Dashboard

A modern React + Tailwind CSS single-page application (SPA) that simulates a SaaS contracts management dashboard. This application provides a comprehensive solution for managing contracts with features like authentication, file uploads, contract analysis, and AI-powered insights.

## 🚀 Features

### Authentication
- **Mock Authentication**: Login with any username and password `test123`
- **JWT Token Simulation**: Stores mock JWT in localStorage
- **Protected Routes**: Dashboard and contract details require authentication

### Dashboard
- **Responsive Layout**: Sidebar navigation with contracts, insights, reports, and settings
- **Contracts Table**: Display contracts with name, parties, expiry date, status, and risk score
- **Search & Filter**: Search by name/parties, filter by status (Active, Expired, Renewal Due) and risk (Low, Medium, High)
- **Pagination**: 10 contracts per page with navigation controls
- **Loading States**: Proper loading indicators and error handling

### Contract Details
- **Comprehensive View**: Contract metadata, parties, dates, status, and risk assessment
- **Clauses Analysis**: Contract clauses with confidence scores and summaries
- **AI Insights**: Risk analysis and recommendations with severity levels
- **Evidence Panel**: Retrieved document snippets with relevance scores
- **Interactive UI**: Expandable sections and detailed breakdowns

### File Upload
- **Drag & Drop**: Modern file upload interface with drag and drop support
- **Progress Tracking**: Real-time upload progress with status indicators
- **File Management**: Support for PDF, DOC, DOCX files up to 10MB
- **Upload Simulation**: Mock upload process with success/error states

## 🛠️ Tech Stack

- **Frontend**: React 19+ with TypeScript
- **Styling**: Tailwind CSS with custom components
- **Routing**: React Router DOM with protected routes
- **State Management**: React Context API for authentication
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and building
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
