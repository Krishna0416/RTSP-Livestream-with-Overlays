# User Documentation: RTSP Livestream Overlay App

This document provides guidance on how to set up and use the RTSP Livestream Overlay Application.

## Table of Contents
1. [System Requirements](#system-requirements)
2. [Installation](#installation)
3. [Running the Application](#running-the-application)
4. [Using the Application](#using-the-application)
   - [Viewing Livestreams](#viewing-livestreams)
   - [Managing Overlays](#managing-overlays)
   - [Customizing Overlays](#customizing-overlays)
5. [Troubleshooting](#troubleshooting)
6. [FAQ](#faq)

## System Requirements

- Node.js (v14 or higher)
- Python (v3.6 or higher)
- MongoDB (v4.4 or higher)
- Modern web browser (Chrome, Firefox, Edge recommended)

## Installation

### Backend Setup

1. Clone the repository to your local machine
2. Navigate to the backend directory:
   ```
   cd backend
   ```
3. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```
4. Make sure MongoDB is installed and running on your system
   - If not installed, follow the [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/)

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install Node.js dependencies:
   ```
   npm install
   ```

## Running the Application

### Start the Backend Server

1. From the backend directory, run:
   ```
   python app.py
   ```
2. The server will start on `http://localhost:5000`

### Start the Frontend Development Server

1. From the frontend directory, run:
   ```
   npm start
   ```
2. The frontend will be available at `http://localhost:3000`

## Using the Application

### Viewing Livestreams

1. Open the application in your web browser at `http://localhost:3000`
2. The default page shows the livestream player
3. Enter your RTSP URL in the input field:
   - Default demonstration URL: `rtsp://demo:demo@ipvmdemo.dyndns.org:5541/onvif-media/media.amp?profile=profile_1_h264&sessiontimeout=60&streamtype=unicast`
   - Or use your own RTSP stream URL (see [Creating a Test RTSP Stream](#creating-a-test-rtsp-stream))
4. Click "Load Stream" to apply the URL
5. Use the player controls to play, pause, and adjust volume

### Managing Overlays

1. Click on "Manage Overlays" in the navigation menu
2. You will see a list of all created overlays
3. For each overlay, you can:
   - View its details (name, type, position, size)
   - Edit the overlay settings
   - Delete the overlay
4. To create a new overlay, click "Create New Overlay"

### Customizing Overlays

#### Creating a New Overlay

1. In the "Manage Overlays" page, click "Create New Overlay"
2. Fill in the overlay details:
   - **Name**: A descriptive name for your overlay
   - **Type**: Choose between "Text" or "Image"
   - **Content**: 
     - For text overlays: Enter the text you want to display
     - For image overlays: Enter a valid URL to the image
   - **Position**: Set X and Y coordinates (as percentages of the video size)
   - **Size**: Set width and height in pixels
   - **Additional Text Options**: For text overlays, you can also set:
     - Text Color (using the color picker)
     - Font Size (e.g., "24px")
3. Click "Save Overlay" to create the overlay

#### Editing an Existing Overlay

1. In the "Manage Overlays" page, click "Edit" on the overlay you want to modify
2. Update any of the overlay properties
3. The preview section at the bottom shows how your overlay will appear
4. Click "Save Changes" when done

## Creating a Test RTSP Stream

You can create a test RTSP stream using RTSPme or similar services:

### Using RTSP.me

1. Go to [RTSP.me](https://www.rtsp.me/)
2. Sign up for an account
3. Create a new stream and obtain your RTSP URL
4. Enter this URL in the app's RTSP URL field

### Using FFmpeg (Advanced)

If you have FFmpeg installed, you can create a local RTSP stream:

1. Install FFmpeg from [ffmpeg.org](https://ffmpeg.org/download.html)
2. Use a command like:
   ```
   ffmpeg -re -i sample-video.mp4 -c copy -f rtsp rtsp://localhost:8554/live
   ```
3. Enter `rtsp://localhost:8554/live` as your RTSP URL

## Troubleshooting

### Stream Won't Load
- Make sure the RTSP URL is correctly formatted
- Verify the RTSP server is running and accessible
- Check that your network allows RTSP traffic
- Try using a known working RTSP URL as a test

### Overlays Not Displaying
- Ensure the overlay has been properly saved
- Check that the position values are within range (0-100%)
- For image overlays, verify that the image URL is accessible
- Refresh the page after making changes

### Backend Connection Issues
- Verify that the MongoDB service is running
- Check that the backend Flask server is running on port 5000
- Look for any error messages in the backend terminal

## FAQ

**Q: What RTSP URLs can I use with this application?**
A: You can use any valid RTSP URL. For testing, you can use public demo streams or create your own using services like RTSP.me.

**Q: What types of overlays can I create?**
A: Currently, the application supports text overlays and image overlays (from URLs).

**Q: Can I use local image files for overlays?**
A: The current version only supports images hosted online with accessible URLs. For local images, you would need to host them on a web server first.

**Q: How many overlays can I add to a single stream?**
A: There is no hard limit on the number of overlays, but too many complex overlays might affect performance.

**Q: Does this application record the livestream?**
A: No, this application only displays livestreams and does not include recording functionality.

**Q: Can I use this application on mobile devices?**
A: The web interface should work on modern mobile browsers, but RTSP streaming support may vary depending on the device and browser.