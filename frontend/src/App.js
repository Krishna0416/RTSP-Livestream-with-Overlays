import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import LivestreamPlayer from './components/LivestreamPlayer';
import OverlayManager from './components/OverlayManager';
import OverlaySettings from './components/OverlaySettings';
import axios from 'axios';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  background-color: #282c34;
  color: white;
  padding: 15px 20px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const Navigation = styled.nav`
  margin-top: 15px;
  
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    
    li {
      margin-right: 20px;
      
      a {
        color: white;
        text-decoration: none;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

function App() {
  const [overlays, setOverlays] = useState([]);
  const [rtspUrl, setRtspUrl] = useState('rtsp://demo:demo@ipvmdemo.dyndns.org:5541/onvif-media/media.amp?profile=profile_1_h264&sessiontimeout=60&streamtype=unicast'); // Default RTSP URL
  
  useEffect(() => {
    // Fetch overlays from the backend
    const fetchOverlays = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/overlays');
        setOverlays(response.data);
      } catch (error) {
        console.error('Error fetching overlays:', error);
      }
    };
    
    fetchOverlays();
  }, []);

  const handleSaveOverlay = async (overlay) => {
    try {
      if (overlay._id) {
        // Update existing overlay
        await axios.put(`http://localhost:5000/api/overlays/${overlay._id}`, overlay);
      } else {
        // Create new overlay
        await axios.post('http://localhost:5000/api/overlays', overlay);
      }
      
      // Refresh overlays
      const response = await axios.get('http://localhost:5000/api/overlays');
      setOverlays(response.data);
    } catch (error) {
      console.error('Error saving overlay:', error);
    }
  };

  const handleDeleteOverlay = async (overlayId) => {
    try {
      await axios.delete(`http://localhost:5000/api/overlays/${overlayId}`);
      
      // Refresh overlays
      const response = await axios.get('http://localhost:5000/api/overlays');
      setOverlays(response.data);
    } catch (error) {
      console.error('Error deleting overlay:', error);
    }
  };

  const handleRtspUrlChange = (url) => {
    setRtspUrl(url);
  };

  return (
    <Router>
      <AppContainer>
        <Header>
          <h1>RTSP Livestream with Overlays</h1>
          <Navigation>
            <ul>
              <li><Link to="/">Livestream</Link></li>
              <li><Link to="/manage-overlays">Manage Overlays</Link></li>
            </ul>
          </Navigation>
        </Header>
        
        <Routes>
          <Route path="/" element={
            <LivestreamPlayer 
              rtspUrl={rtspUrl} 
              overlays={overlays}
              onRtspUrlChange={handleRtspUrlChange}
            />
          } />
          <Route path="/manage-overlays" element={
            <OverlayManager 
              overlays={overlays}
              onSaveOverlay={handleSaveOverlay}
              onDeleteOverlay={handleDeleteOverlay}
            />
          } />
          <Route path="/overlay-settings/:id" element={
            <OverlaySettings 
              overlays={overlays}
              onSaveOverlay={handleSaveOverlay}
            />
          } />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
