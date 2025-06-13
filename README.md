# Authenticated Map App

A simple React app to log in and draw a route between two points using Leaflet.

## 🔧 Tech Stack

- React + Vite
- Firebase Authentication
- React Leaflet + Leaflet Routing Machine

## 🔑 Features

- Email & Password Login (User will be able to create account.)
- Protected Map Route View
- Route Drawing from A to B
- Click on map to select points

## 🚀 Run it

- Clone the repository

```bash
git clone https://github.com/your-username/authenticated-map-app.git

```

- Navigate to the project directory

```bash
cd authenticated-map-app
```

- Install dependencies and run project

```bash
npm install
npm run dev
```

- NOTE :- Make sure you have Firebase account and have created a project in Firebase console. You need to replace :-

  ```bash
  VITE_FIREBASE_API_KEY=""
  VITE_FIREBASE_AUTH_DOMAIN=""
  VITE_FIREBASE_PROJECT_ID=""
  VITE_FIREBASE_STORAGE_BUCKET=""
  VITE_FIREBASE_MESSAGING_SENDER_ID=""
  VITE_FIREBASE_APP_ID=""

  VITE_API_KEY = ; //This will be your opencagedata api key which you can generate from opencagedata website.

  ```

# Login Page

![alt text](<project/src/assets/Screenshot (16).png>)

# Map View

![alt text](<project/src/assets/Screenshot (15).png>)


