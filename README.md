# FinanceAI

A personal finance management application with AI-powered financial advice.

## Features

- **Expense Tracking**: Add, view, and delete expenses by category
- **Budget Management**: Set budgets per category and track spending
- **Dashboard**: View spending statistics and recent transactions
- **AI Assistant**: Get financial advice using Groq's Llama 3.3 70B model
- **Authentication**: JWT-based user authentication
- **Dark Mode**: Toggle between light and dark themes

## Tech Stack

### Backend
- Node.js + Express
- TypeScript
- MongoDB (Mongoose)
- JWT authentication
- Groq API (Llama 3.3 70B)

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router

## Project Structure

```
├── Backend/          # Express API server
├── Frontend/         # React application
└── FigmaDesign/      # UI component library
```

## Setup

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- Groq API key

### Backend Setup

1. Navigate to Backend folder:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (use `.env.example` as template):
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
GROQ_API_KEY=your_groq_api_key
```

4. Start development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to Frontend folder:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (use `.env.example` as template):
```env
VITE_BACKEND_URL=http://localhost:8000
```

4. Start development server:
```bash
npm run dev
```

5. Open http://localhost:5173

## API Endpoints

### Authentication
- `POST /auth/register` - Create account
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user

### Expenses
- `GET /expenses` - Get all expenses
- `POST /expenses` - Create expense
- `DELETE /expenses/:id` - Delete expense

### Budgets
- `GET /budgets` - Get all budgets
- `POST /budgets` - Create budget
- `DELETE /budgets/:category` - Delete budget

### Dashboard
- `GET /dashboard/summary` - Get statistics

### AI
- `POST /ai/chat` - Chat with AI assistant

## Deployment

Both Frontend and Backend are configured for Vercel deployment with `vercel.json` files.

### Backend Deployment
1. Deploy to Vercel
2. Add environment variables in Vercel dashboard
3. Copy the deployment URL

### Frontend Deployment
1. Update `VITE_BACKEND_URL` in Vercel environment variables
2. Deploy to Vercel

## License

MIT
