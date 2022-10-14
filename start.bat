echo "Starting Development Server... (Windows)"
echo "Installing Backend & Frontend Dependencies."
cd backend/
npm install
cd ../frontend
npm install
echo "Starting up Backend Server"
echo "Please start frontend by running 'cd frontend && npm start' or if windows 'cd frontend & npm run dev'."
cd ../
cd backend & npm start