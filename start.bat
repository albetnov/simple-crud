@echo off
echo "Starting Development Server... (Windows)"
echo "Installing Backend & Frontend Dependencies."
cd backend/
yarn
cd ../frontend
yarn
echo "Starting up Backend Server"
echo "Please start frontend by running 'cd frontend && npm start' or if windows 'cd frontend & npm run dev'."
cd ../
cd backend & yarn start
