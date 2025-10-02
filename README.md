# RTSP Livestream Overlay Application

A full-stack web application that allows users to play RTSP livestreams and add custom overlays (text and images) to the video. Built with Flask, MongoDB, and React.

## Features

- Play livestream videos from RTSP URLs
- Basic video controls (play, pause, volume)
- Add custom text and image overlays to the video
- Position and resize overlays as needed
- Full CRUD operations for overlay management
- Real-time preview of overlay changes

## Technology Stack

- **Backend**:
  - Flask (Python web framework)
  - MongoDB (NoSQL database)
  - PyMongo (MongoDB driver for Python)
  - Flask-CORS (Cross-Origin Resource Sharing)

- **Frontend**:
  - React (JavaScript library for UI)
  - React Router (Navigation)
  - React Player (Video playback)
  - Styled Components (CSS-in-JS styling)
  - Axios (HTTP client)

## Project Structure

```
/
├── backend/               # Flask server
│   ├── app.py             # Main server file
│   └── requirements.txt   # Python dependencies
│
├── frontend/              # React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── LivestreamPlayer.js
│   │   │   ├── OverlayManager.js
│   │   │   └── OverlaySettings.js
│   │   ├── App.js         # Main React component
│   │   └── index.js       # React entry point
│   ├── package.json       # Node.js dependencies
│   └── README.md          # Frontend documentation
│
├── API_DOCUMENTATION.md   # API documentation
└── USER_GUIDE.md          # User documentation
```

## Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- Python (v3.6 or higher)
- MongoDB (v4.4 or higher)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Make sure MongoDB is running on your system
   - Default connection is to `mongodb://localhost:27017/`

4. Start the Flask server:
   ```
   python app.py
   ```
   - The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install Node.js dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```
   - The application will be available at `http://localhost:3000`

## Using the Application

1. Open `http://localhost:3000` in your web browser
2. Enter an RTSP URL in the input field on the homepage
   - Example URL: `rtsp://demo:demo@ipvmdemo.dyndns.org:5541/onvif-media/media.amp?profile=profile_1_h264&sessiontimeout=60&streamtype=unicast`
3. Click "Load Stream" to start the video
4. Use the "Manage Overlays" page to create, edit and delete overlays

For more detailed usage instructions, see the [User Guide](USER_GUIDE.md).

## API Documentation

The application provides a RESTful API for managing overlays. For detailed endpoint documentation, see the [API Documentation](API_DOCUMENTATION.md).

## Future Improvements

- User authentication
- Save and load different stream configurations
- More overlay types (shapes, animations)
- Recording capability
- Mobile responsiveness improvements
- Multiple simultaneous stream support

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [ReactPlayer](https://github.com/cookpete/react-player) for video playback
- [Flask](https://flask.palletsprojects.com/) for the backend framework
- [MongoDB](https://www.mongodb.com/) for the database
- [React](https://reactjs.org/) for the frontend framework