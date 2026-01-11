# 💰 FinanceAI - AI-Powered Personal Finance Dashboard

A modern, professional finance management application built for college students and young professionals. Features intelligent budgeting, expense tracking, and an AI chatbot assistant.

![Tech Stack](https://img.shields.io/badge/React-18.3.1-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 📊 **Smart Dashboard**
- Real-time expense tracking with trend analysis
- Visual charts (Line & Pie charts) powered by Recharts
- Monthly spending overview with percentage changes
- AI-generated financial insights

### 💳 **Expense Management**
- Quick add expense with modal form
- Category-based organization (Food, Transport, Entertainment, etc.)
- Filter and search functionality
- Beautiful card-based UI with color-coded badges

### 📈 **Budget Tracking**
- Category-wise budget allocation
- Visual progress bars with status indicators
- Over-budget warnings
- AI budget recommendations (50/30/20 rule)

### 🤖 **AI Chatbot Assistant**
- Interactive chat interface
- Natural language financial queries
- Quick prompt suggestions
- Personalized savings and budgeting advice

### 👤 **Profile Management**
- User information settings
- Monthly income tracking
- Savings goal configuration
- Notification preferences

### 🌓 **Theme Support**
- Light/Dark mode toggle
- Smooth theme transitions
- Optimized color schemes

## 🛠️ Tech Stack

### **Core**
- **React 18.3.1** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router DOM** - Navigation

### **Styling**
- **Tailwind CSS 4.1** - Utility-first CSS
- **Shadcn/UI** - Component library
- **Lucide React** - Icon system
- **Custom CSS Variables** - Theming

### **Data Visualization**
- **Recharts** - Charts library
- Line charts for trends
- Pie charts for breakdowns

### **State & Forms**
- React Hooks (useState, useEffect)
- React Hook Form - Form validation
- next-themes - Theme management

### **Animations**
- Motion (Framer Motion) - Smooth transitions
- CSS animations

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── Layout.tsx          # Main layout with sidebar
│   │   └── ui/                 # Shadcn UI components
│   ├── pages/
│   │   ├── LoginPage.tsx       # Authentication
│   │   ├── DashboardPage.tsx   # Main dashboard
│   │   ├── ExpensesPage.tsx    # Expense tracking
│   │   ├── BudgetPage.tsx      # Budget management
│   │   ├── ChatbotPage.tsx     # AI assistant
│   │   └── ProfilePage.tsx     # User settings
│   ├── data/
│   │   └── mockData.ts         # Mock data store
│   └── App.tsx                 # Router config
└── styles/
    ├── fonts.css               # Typography
    ├── tailwind.css            # Tailwind config
    └── theme.css               # CSS variables
```

## 🎨 Design System

### **Colors**
- **Primary**: Emerald Green (#10b981) - Growth, finance
- **Secondary**: Blue (#3b82f6) - Trust, stability
- **Accent**: Purple (#8b5cf6) - Premium
- **Gradients**: Emerald to Blue for CTAs

### **Typography**
- **Font**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700
- Clean, modern hierarchy

### **Components**
- Rounded cards (10px radius)
- Soft shadows
- Smooth hover effects
- Color-coded status indicators

## 🚦 Pages

1. **Login/Register** - Authentication with gradient background
2. **Dashboard** - Overview with charts and stats
3. **Expenses** - Add, filter, and view expenses
4. **Budget** - Track budgets with progress bars
5. **AI Chat** - Conversational finance assistant
6. **Profile** - Settings and preferences
7. **404** - Friendly error page

## 📊 Mock Data

Currently uses in-memory mock data for demonstration:
- 6 sample expenses
- 6 budget categories
- 6 months of expense trends
- AI response patterns

**Ready for backend integration** with REST APIs or GraphQL.

## 🎯 Use Cases

### **College Students**
- Track part-time income
- Manage limited budget
- Learn financial basics
- Save for goals

### **Young Professionals**
- Budget first salary
- Optimize spending
- Build emergency fund
- Plan major purchases

## 🔐 Security Notes

⚠️ **This is a demo application**
- No real authentication
- Client-side only
- Mock data in memory
- Not for production PII/sensitive data

### **For Production**
- Implement JWT authentication
- Use HTTPS encryption
- Add input sanitization
- Backend API integration
- Database storage

## 🚀 Future Enhancements

- [ ] Backend integration (Node.js/Python)
- [ ] Real bank account sync (Plaid)
- [ ] Advanced AI with GPT-4
- [ ] Recurring expense tracking
- [ ] Multi-currency support
- [ ] Export reports (PDF/CSV)
- [ ] Mobile app (React Native)
- [ ] Investment tracking
- [ ] Bill reminders
- [ ] Goal progress tracking

## 💡 Key Highlights

✅ **Production-ready code structure**  
✅ **Modern React patterns with Hooks**  
✅ **TypeScript for type safety**  
✅ **Responsive design (mobile-first)**  
✅ **Dark mode support**  
✅ **Accessible UI components**  
✅ **Data visualization with charts**  
✅ **Clean, maintainable architecture**  
✅ **Resume/Portfolio ready**  

## 🎓 Learning Outcomes

This project demonstrates:
- Modern React development
- Component-based architecture
- State management
- Routing and navigation
- Form handling
- Data visualization
- Theme implementation
- UI/UX best practices
- TypeScript usage
- Responsive design

## 📚 Documentation

See [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md) for detailed technical documentation including:
- Complete tech stack breakdown
- API integration guidelines
- Component architecture
- Design system details
- Security considerations

## 🎨 Screenshots

### Dashboard
- Summary cards with trends
- Line chart for expense tracking
- Pie chart for category breakdown
- AI financial insights

### Expenses
- Add expense modal
- Filterable list view
- Category badges
- Real-time totals

### Budget
- Progress tracking
- Color-coded warnings
- AI recommendations
- Category breakdowns

### AI Chat
- Modern chat interface
- Quick prompts
- Smart responses
- Typing indicators

## 🏆 Perfect For

- 📝 **Portfolio Projects** - Showcase modern React skills
- 🎓 **Resume Building** - Full-stack ready architecture
- 💼 **Learning** - Real-world application patterns
- 🚀 **Startups** - MVP foundation for fintech apps

## 📄 License

This is a demo/educational project. Feel free to use as reference for learning purposes.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

*A professional finance dashboard demonstrating modern web development practices*
