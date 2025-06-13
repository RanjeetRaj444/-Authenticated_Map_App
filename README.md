# 🗺️ Authenticated Route Planner

A React-based web application that allows authenticated users to plan routes between two points with an interactive map interface.

### Deployed Link :- https://maprouteplanner.netlify.app/

# Login Page

![alt text](<project/src/assets/Screenshot (16).png>)

# Map View

![alt text](<project/src/assets/Screenshot (15).png>)

```

```

## ✨ Features

- **🔐 User Authentication**: Secure email/password authentication using Firebase Auth
- **🗺️ Interactive Map**: Click-to-select points or search for locations
- **🔍 Location Search**: Search functionality for "From" and "To" locations
- **📍 Current Location**: Use your current location as starting point
- **🛣️ Route Calculation**: Automatic route calculation with distance and time
- **📱 Responsive Design**: Works on desktop, tablet, and mobile devices
- **🏷️ Location Names**: Display location names on map markers

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Authentication**: Firebase Auth
- **Maps**: React Leaflet + OpenStreetMap
- **Routing**: Leaflet Routing Machine
- **Geocoding**: Nominatim API (OpenStreetMap)
- **Styling**: Plain CSS with modern design principles

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account (free tier available)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd route-planner-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Firebase**

   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create a new project or select an existing one
   - Go to Project Settings > General > Your apps
   - Click "Add app" and select Web (</>)
   - Register your app and copy the configuration object
   - Go to Authentication > Sign-in method
   - Enable "Email/Password" provider

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

VITE_API_KEY = ; //This will be your opencagedata api key which you can generate from opencagedata website.

````
5. **Run the development server**
   ```bash
   npm run dev
````

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 📖 How to Use

1. **Sign Up/Sign In**: Create an account or sign in with existing credentials
2. **Set Starting Point**:
   - Click the `Use Current Location` button to use your current location, or
   - Search for a location in the "From" field, or
   - Click anywhere on the map
3. **Set Destination**:
   - Search for a location in the "To" field, or
   - Click on the map for your second point
4. **View Route**: The app will automatically calculate and display the route with distance and time
5. **Start Over**: Click `Clear Location` to reset and plan a new route

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Header.jsx            # App header with user info
│   ├── Loading.jsx           # Loading spinner
│   ├── SearchBox.jsx         # Location search component
│   └── FlyToLocation.jsx     # Map movement controller component.
├── context/
│   ├── AuthContext.jsx       # Authentication context
│   └── map.js                # Search functionality and routing functionality
├── config/
│   └── firebase.js           # Firebase configuration
├── pages/
│   ├── Login.jsx             # Login component
│   ├── SignUp.jsx            # Sign up component
│   └── MapView.jsx           # Main map component
├── styles/
│    ├── MapView.css          # Map styles
│    ├── SearchBox.css        # Search box styles
│    ├── Header.css           # Header styles
│    ├── Auth.css             # Authentication styles
│    └── Loading.css          # Loading styles
├── App.jsx                   # Main app component
├── App.css                   # Global app styles
├── index.css                 # Base styles
└── main.jsx                  # App entry point
```

## 🔧 Configuration

### Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication and configure Email/Password sign-in method
3. Get your web app configuration from Project Settings
4. Add the configuration to your `.env` file
