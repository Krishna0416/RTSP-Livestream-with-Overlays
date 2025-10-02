import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';

const PlayerContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 30px;
`;

const VideoWrapper = styled.div`
  position: relative;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
`;

const StyledReactPlayer = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
`;

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Allow clicks to pass through to the video player */
`;

const Overlay = styled.div`
  position: absolute;
  ${props => props.position && `
    top: ${props.position.y}%;
    left: ${props.position.x}%;
  `}
  ${props => props.size && `
    width: ${props.size.width}px;
    height: ${props.size.height}px;
  `}
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto; /* Make this element clickable */
`;

const TextOverlay = styled(Overlay)`
  color: ${props => props.color || 'white'};
  font-size: ${props => props.fontSize || '24px'};
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`;

const ImageOverlay = styled(Overlay)`
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ControlPanel = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 5px;
`;

const UrlInput = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  
  label {
    margin-right: 10px;
    font-weight: bold;
  }
  
  input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  
  button {
    margin-left: 10px;
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
      background-color: #45a049;
    }
  }
`;

function LivestreamPlayer({ rtspUrl, overlays, onRtspUrlChange }) {
  const [url, setUrl] = useState(rtspUrl);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const playerRef = useRef(null);

  // Update local URL state when prop changes
  useEffect(() => {
    setUrl(rtspUrl);
  }, [rtspUrl]);

  const handlePlay = () => {
    setPlaying(true);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    onRtspUrlChange(url);
  };

  return (
    <div>
      <h2>Livestream</h2>
      <ControlPanel>
        <form onSubmit={handleUrlSubmit}>
          <UrlInput>
            <label htmlFor="rtsp-url">RTSP URL:</label>
            <input
              id="rtsp-url"
              type="text"
              value={url}
              onChange={handleUrlChange}
              placeholder="Enter RTSP URL..."
            />
            <button type="submit">Load Stream</button>
          </UrlInput>
        </form>
        <div>
          <button onClick={handlePlay} disabled={playing}>Play</button>
          <button onClick={handlePause} disabled={!playing}>Pause</button>
          <div>
            <label>Volume: </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
            />
            <span>{Math.round(volume * 100)}%</span>
          </div>
        </div>
      </ControlPanel>

      <PlayerContainer>
        <VideoWrapper>
          <StyledReactPlayer
            ref={playerRef}
            url={rtspUrl}
            playing={playing}
            volume={volume}
            controls={true}
            width="100%"
            height="100%"
            config={{
              file: {
                forceVideo: true,
              }
            }}
          />
          
          {/* Overlay Container */}
          <OverlayContainer>
            {overlays && overlays.map((overlay) => {
              if (overlay.type === 'text') {
                return (
                  <TextOverlay
                    key={overlay._id}
                    position={overlay.position}
                    size={overlay.size}
                    color={overlay.color}
                    fontSize={overlay.fontSize}
                  >
                    {overlay.content}
                  </TextOverlay>
                );
              } else if (overlay.type === 'image') {
                return (
                  <ImageOverlay
                    key={overlay._id}
                    position={overlay.position}
                    size={overlay.size}
                  >
                    <img src={overlay.content} alt="Overlay" />
                  </ImageOverlay>
                );
              }
              return null;
            })}
          </OverlayContainer>
        </VideoWrapper>
      </PlayerContainer>
    </div>
  );
}

export default LivestreamPlayer;