@echo off
echo Starting Social Media Marketing Platform...
echo.

cd frontend
echo Installing dependencies...
call npm install

echo.
echo Starting development server...
call npm run dev

pause
