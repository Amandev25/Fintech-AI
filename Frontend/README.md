# FinanceAI - Frontend

A modern, professional finance management application built with React, TypeScript, and Tailwind CSS.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
Frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── Layout.tsx          # Main layout with sidebar
│   │   │   └── ui/                  # Shadcn UI components
│   │   ├── pages/                   # All page components
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── ExpensesPage.tsx
│   │   │   ├── BudgetPage.tsx
│   │   │   ├── ChatbotPage.tsx
│   │   │   ├── ProfilePage.tsx
│   │   │   └── NotFoundPage.tsx
│   │   ├── data/
│   │   │   └── mockData.ts          # Mock data store
│   │   └── App.tsx                  # Router configuration
│   ├── styles/                       # Global styles
│   │   ├── fonts.css
│   │   ├── theme.css
│   │   ├── tailwind.css
│   │   └── index.css
│   └── main.tsx                     # Entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **Shadcn/UI** - Component library
- **React Router DOM** - Routing
- **Lucide React** - Icons
- **Recharts** - Data visualization
- **next-themes** - Dark mode support
- **Sonner** - Toast notifications

## 📄 Pages

1. **Login** (`/`) - Authentication page
2. **Register** (`/register`) - Registration page
3. **Dashboard** (`/dashboard`) - Main overview with charts and stats
4. **Expenses** (`/expenses`) - Track and manage expenses
5. **Budget** (`/budget`) - Budget tracking and management
6. **AI Chat** (`/chat`) - AI finance assistant
7. **Profile** (`/profile`) - User settings and preferences
8. **404** (`/404`) - Not found page

## 🎨 Features

- ✅ Responsive design (mobile-first)
- ✅ Dark mode support
- ✅ Data visualization with charts
- ✅ Mock data integration
- ✅ Clean, beginner-friendly code structure
- ✅ Form handling with validation
- ✅ Modern UI with gradient elements

## 📝 Notes

- Currently uses mock data (no backend integration)
- Ready for backend API integration later
- All pages are functional and ready to use
- Code follows beginner to mid-level standards

## 🔧 Development

The project uses Vite for fast development. Hot module replacement (HMR) is enabled by default.

## 📦 Build

The build command creates an optimized production build in the `dist` folder.

```bash
npm run build
```

## 🎯 Next Steps

- Connect to backend APIs
- Add authentication logic
- Implement real-time updates
- Add more features as needed

---

Built with ❤️ for managing personal finances

