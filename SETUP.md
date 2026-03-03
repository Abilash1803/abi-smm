# Quick Setup Guide

## First Time Setup

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Configure Environment

**Backend** - Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/socialboost
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

**Frontend** - Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Application

**Option A: Manual Start**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

**Option B: Windows Batch File**
```bash
start.bat
```

### 4. Access Application

- Frontend: http://localhost:3001
- Backend API: http://localhost:5000/api

## Requirements

- Node.js v14+
- MongoDB (local or Atlas)
- Modern web browser

## Troubleshooting

**Port already in use:**
- Change PORT in backend/.env
- Frontend auto-switches from 3000 to 3001 if needed

**MongoDB connection error:**
- Ensure MongoDB is running
- Check MONGODB_URI in .env

**Frontend blank page:**
- Hard refresh: Ctrl+Shift+R
- Check browser console (F12)

## Project Structure

```
socialboost/
├── backend/          # Node.js API
├── frontend/         # React App
├── README.md         # Full documentation
├── SETUP.md          # This file
├── start.bat         # Windows startup script
└── .gitignore        # Git ignore rules
```

## Next Steps

1. Register a new account
2. Browse services by platform
3. Search for social media accounts
4. Select services and packages
5. Complete orders

For detailed documentation, see README.md
