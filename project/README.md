# 🗺️ Authenticated Route Planner

A React-based web application that allows authenticated users to plan routes between two points with an interactive map interface.

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

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 📖 How to Use

1. **Sign Up/Sign In**: Create an account or sign in with existing credentials
2. **Set Starting Point**: 
   - Click the 📍 button to use your current location, or
   - Search for a location in the "From" field, or
   - Click anywhere on the map
3. **Set Destination**:
   - Search for a location in the "To" field, or
   - Click on the map for your second point
4. **View Route**: The app will automatically calculate and display the route with distance and time
5. **Start Over**: Click "Clear" to reset and plan a new route

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   ├── Login.jsx          # Login component
│   │   ├── SignUp.jsx         # Sign up component
│   │   └── Auth.css          # Authentication styles
│   ├── Layout/
│   │   ├── Header.jsx        # App header with user info
│   │   ├── Loading.jsx       # Loading spinner
│   │   ├── Header.css        # Header styles
│   │   └── Loading.css       # Loading styles
│   └── Map/
│       ├── MapView.jsx       # Main map component
│       ├── SearchBox.jsx     # Location search component
│       ├── MapView.css       # Map styles
│       └── SearchBox.css     # Search box styles
├── context/
│   └── AuthContext.jsx       # Authentication context
├── config/
│   └── firebase.js          # Firebase configuration
├── App.jsx                  # Main app component
├── App.css                  # Global app styles
├── index.css               # Base styles
└── main.jsx                # App entry point
```

## 🔧 Configuration

### Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication and configure Email/Password sign-in method
3. Get your web app configuration from Project Settings
4. Add the configuration to your `.env` file

### Map Configuration

The app uses OpenStreetMap tiles and Nominatim for geocoding. No API keys are required for basic usage, but consider the following for production:

- **Rate Limits**: Nominatim has usage limits for geocoding
- **Custom Tile Server**: Consider using your own tile server for production
- **Caching**: Implement caching for search results

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard
4. Configure redirects for SPA routing

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Deploy to Firebase Hosting

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Initialize hosting: `firebase init hosting`
4. Build the project: `npm run build`
5. Deploy: `firebase deploy`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to your branch: `git push origin feature-name`
5. Submit a pull request

## 📝 Notes

- **Authentication**: Uses Firebase Auth with email/password
- **Geocoding Service**: Uses Nominatim (OpenStreetMap) for free geocoding
- **Map Tiles**: Uses OpenStreetMap tiles (free and open source)
- **Routing**: Uses OSRM (Open Source Routing Machine) via Leaflet Routing Machine

## 🔍 Troubleshooting

### Common Issues

1. **Map not loading**: Check browser console for errors, ensure internet connection
2. **Authentication errors**: Verify Firebase configuration in `.env` file
3. **Search not working**: Check network connectivity, Nominatim API might be rate-limited
4. **Routing not displaying**: Ensure both start and end points are set

### Development Tips

- Use browser dev tools to debug network requests
- Check Firebase Console for authentication logs
- Monitor browser console for JavaScript errors
- Ensure Firebase Auth is properly configured with Email/Password provider

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Firebase for authentication services
- OpenStreetMap contributors for map data
- Leaflet.js for the mapping library
- Nominatim for geocoding services