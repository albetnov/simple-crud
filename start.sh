#/bin/bash
echo "Starting Development Server (Linux)"
echo "Installing dependencies (Backend & Frontend)"
cd backend/
yarn
cd ../frontend
yarn
echo "Starting up Backend Development Server. (http://localhost:3000)"
echo "Please start frontend by running 'cd frontend && npm start' or if windows 'cd frontend & npm run dev'."
cd ../
cd backend && yarn start