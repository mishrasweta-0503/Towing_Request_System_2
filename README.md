# Towing Request System (Laravel + React + React Native)

A basic towing request MVP:
- **Customer (React Web)** submits a towing request
- **Backend (Laravel + MySQL)** stores and serves requests via REST API
- **Driver (React Native / Expo)** fetches and displays requests (pull-to-refresh)

## Tech Stack
- Backend: Laravel
- Database: MySQL
- Web App: React
- Mobile App: React Native (Expo)

## User Flow
1. Customer submits a request from the web app (`POST /api/requests`)
2. Backend saves the request in MySQL (`towing_requests` table)
3. Driver app fetches requests (`GET /api/requests`) and displays them
4. Driver can pull-to-refresh to retrieve the latest requests

## API Endpoints
- `POST /api/requests`  
  Body: `{ "customer_name": "...", "location": "...", "note": "..." }`
- `GET /api/requests`  
  Returns all towing requests (latest first)

## Database Schema
Table: `towing_requests`
- id
- customer_name (string)
- location (string)
- note (text, nullable)
- status (string, default: "pending")
- created_at, updated_at

## How to Run

### 1) Backend (Laravel API)
```bash
cd towing-api
composer install
cp .env.example .env
php artisan key:generate
```

## Update .env with your MySQL credentials:
    1) DB_DATABASE
    2) DB_USERNAME
    3) DB_PASSWORD
    Run migrations: php artisan migrate
    Start the server (important for mobile access): php artisan serve --host 0.0.0.0 --port 8000
    Test : http://127.0.0.1:8000/api/requests

## Web App (React)
    1) cd towing-web
    2) npm install
    3) npm start
    Runs at : http://localhost:3000

## Mobile App (React Native / Expo - Driver)
    1) cd towing-driver
    2) npm install
    3) npm start
    4) Set API_URL in the driver app to your laptop IP: http://<YOUR_LAPTOP_IP>:8000/api/requests
    5) Phone and laptop must be on the same Wi-Fi network.
    6) Find IP of your system.
