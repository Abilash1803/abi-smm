# SocialBoost - Social Media Growth Platform

A full-stack MERN application for social media growth services.

## Features

- 🚀 Multi-platform support (Instagram, TikTok, Facebook, YouTube)
- 👤 User authentication with JWT
- 📦 Package selection with dynamic pricing
- 💳 Payment processing
- 📊 Order tracking and management
- 🎁 Free trial system with coins
- 📱 Responsive design with Tailwind CSS

## Tech Stack

### Frontend
- React 18
- React Router v6
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd socialboost
```

2. **Setup Backend**
```bash
cd backend
npm install
```

Create `.env` file in backend folder:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/socialboost
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

3. **Setup Frontend**
```bash
cd frontend
npm install
```

Create `.env` file in frontend folder:
```env
VITE_API_URL=http://localhost:5000/api
```

### Running the Application

1. **Start Backend** (from backend folder)
```bash
npm run dev
```
Backend runs on: http://localhost:5000

2. **Start Frontend** (from frontend folder)
```bash
npm run dev
```
Frontend runs on: http://localhost:3001

3. **Open Browser**
Navigate to: http://localhost:3001

## Project Structure

```
socialboost/
├── backend/
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── .env             # Environment variables
│   ├── server.js        # Entry point
│   └── package.json
│
├── frontend/
│   ├── public/          # Static files
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── routes/      # Route configuration
│   │   ├── utils/       # Utility functions
│   │   ├── config/      # Frontend config
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # Entry point
│   ├── .env             # Environment variables
│   └── package.json
│
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders/user/:email` - Get user orders
- `PUT /api/orders/:id/status` - Update order status

### Social Media
- `POST /api/social/verify` - Verify social media account
- `GET /api/social/posts/:platform/:username` - Fetch account posts

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:platform/:service` - Get specific service

### Users
- `GET /api/users/:email` - Get user by email
- `PUT /api/users/:email` - Update user profile
- `PUT /api/users/:email/password` - Change password

## Features Walkthrough

### 1. User Registration & Login
- Secure authentication with JWT
- Password hashing with bcryptjs
- Persistent login sessions

### 2. Platform Selection
- Choose from Instagram, TikTok, Facebook, or YouTube
- Search for social media accounts
- Real-time account verification

### 3. Service Selection
- Multiple services per platform (followers, likes, views, comments)
- Dynamic pricing based on quantity
- Package selection with slider

### 4. Order Processing
- Secure payment processing
- Real-time order tracking
- Order history and management

### 5. Free Trial
- 100 coins for new users
- Try services before purchasing
- Multiple service options

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm run dev  # Uses Vite HMR
```

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
npm start
```

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/socialboost
JWT_SECRET=your-secret-key
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## IDE Compatibility

- VS Code
- WebStorm
- Sublime Text
- Atom
- Any modern code editor

## Troubleshooting

### Frontend not loading
1. Clear browser cache (Ctrl+Shift+R)
2. Check console for errors (F12)
3. Verify both servers are running

### Backend connection issues
1. Check MongoDB is running
2. Verify .env file exists with correct values
3. Check port 5000 is not in use

### Port conflicts
- Frontend default: 3001 (auto-switches if 3000 is busy)
- Backend default: 5000
- Change ports in .env files if needed

## License

MIT

## Support

For issues and questions, please open an issue in the repository.
