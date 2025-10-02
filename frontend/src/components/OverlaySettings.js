import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SettingsForm = styled.form`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input, select, textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  
  textarea {
    min-height: 100px;
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 15px;
  
  ${FormGroup} {
    flex: 1;
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  
  button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    
    &.save {
      background-color: #4CAF50;
      color: white;
      
      &:hover {
        background-color: #45a049;
      }
    }
    
    &.cancel {
      background-color: #f1f1f1;
      
      &:hover {
        background-color: #e5e5e5;
      }
    }
  }
`;

const PreviewContainer = styled.div`
  margin-top: 30px;
  
  h3 {
    margin-bottom: 15px;
  }
`;

const PreviewBox = styled.div`
  position: relative;
  width: 640px;
  height: 360px;
  background-color: #000;
  margin-bottom: 20px;
`;

const PreviewOverlay = styled.div`
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
`;

const TextPreview = styled(PreviewOverlay)`
  color: ${props => props.color || 'white'};
  font-size: ${props => props.fontSize || '24px'};
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`;

const ImagePreview = styled(PreviewOverlay)`
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

function OverlaySettings({ overlays, onSaveOverlay }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [overlay, setOverlay] = useState(null);

  useEffect(() => {
    // Find the overlay by id
    const foundOverlay = overlays.find(o => o._id === id);
    if (foundOverlay) {
      setOverlay({ ...foundOverlay });
    } else {
      // Redirect if overlay not found
      navigate('/manage-overlays');
    }
  }, [id, overlays, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'positionX' || name === 'positionY') {
      setOverlay({
        ...overlay,
        position: {
          ...overlay.position,
          [name === 'positionX' ? 'x' : 'y']: Number(value)
        }
      });
    } else if (name === 'width' || name === 'height') {
      setOverlay({
        ...overlay,
        size: {
          ...overlay.size,
          [name]: Number(value)
        }
      });
    } else {
      setOverlay({
        ...overlay,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveOverlay(overlay);
    navigate('/manage-overlays');
  };

  if (!overlay) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Overlay: {overlay.name}</h2>
      
      {/* Settings Form */}
      <SettingsForm onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={overlay.name}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={overlay.type}
            onChange={handleInputChange}
            required
          >
            <option value="text">Text</option>
            <option value="image">Image</option>
          </select>
        </FormGroup>
        
        <FormGroup>
          <label htmlFor="content">
            {overlay.type === 'text' ? 'Text Content' : 'Image URL'}
          </label>
          {overlay.type === 'text' ? (
            <input
              id="content"
              name="content"
              type="text"
              value={overlay.content}
              onChange={handleInputChange}
              required
            />
          ) : (
            <input
              id="content"
              name="content"
              type="url"
              value={overlay.content}
              onChange={handleInputChange}
              placeholder="https://example.com/image.png"
              required
            />
          )}
        </FormGroup>
        
        <FormRow>
          <FormGroup>
            <label htmlFor="positionX">Position X (%)</label>
            <input
              id="positionX"
              name="positionX"
              type="number"
              min="0"
              max="100"
              value={overlay.position.x}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="positionY">Position Y (%)</label>
            <input
              id="positionY"
              name="positionY"
              type="number"
              min="0"
              max="100"
              value={overlay.position.y}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
        </FormRow>
        
        <FormRow>
          <FormGroup>
            <label htmlFor="width">Width (px)</label>
            <input
              id="width"
              name="width"
              type="number"
              min="10"
              value={overlay.size.width}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="height">Height (px)</label>
            <input
              id="height"
              name="height"
              type="number"
              min="10"
              value={overlay.size.height}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
        </FormRow>
        
        {overlay.type === 'text' && (
          <FormRow>
            <FormGroup>
              <label htmlFor="color">Text Color</label>
              <input
                id="color"
                name="color"
                type="color"
                value={overlay.color}
                onChange={handleInputChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="fontSize">Font Size</label>
              <input
                id="fontSize"
                name="fontSize"
                type="text"
                value={overlay.fontSize}
                onChange={handleInputChange}
                placeholder="24px"
              />
            </FormGroup>
          </FormRow>
        )}
        
        <FormActions>
          <button 
            type="button" 
            className="cancel"
            onClick={() => navigate('/manage-overlays')}
          >
            Cancel
          </button>
          <button type="submit" className="save">Save Changes</button>
        </FormActions>
      </SettingsForm>
      
      {/* Preview Section */}
      <PreviewContainer>
        <h3>Preview</h3>
        <PreviewBox>
          {overlay.type === 'text' ? (
            <TextPreview
              position={overlay.position}
              size={overlay.size}
              color={overlay.color}
              fontSize={overlay.fontSize}
            >
              {overlay.content}
            </TextPreview>
          ) : (
            <ImagePreview
              position={overlay.position}
              size={overlay.size}
            >
              <img src={overlay.content} alt="Overlay" />
            </ImagePreview>
          )}
        </PreviewBox>
        <p>Note: This is a preview on a black background. The actual appearance may vary based on the video content.</p>
      </PreviewContainer>
    </div>
  );
}

export default OverlaySettings;