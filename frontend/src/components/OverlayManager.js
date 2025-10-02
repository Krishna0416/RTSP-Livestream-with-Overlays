import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const OverlayList = styled.div`
  margin-bottom: 30px;
`;

const OverlayItem = styled.div`
  background-color: #f5f5f5;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:hover {
    background-color: #e9e9e9;
  }
`;

const OverlayInfo = styled.div`
  flex: 1;
  
  h3 {
    margin: 0 0 10px;
  }
  
  p {
    margin: 5px 0;
    color: #555;
  }
`;

const OverlayActions = styled.div`
  display: flex;
  gap: 10px;
  
  button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    
    &.edit {
      background-color: #4285F4;
      color: white;
      
      &:hover {
        background-color: #3367D6;
      }
    }
    
    &.delete {
      background-color: #EA4335;
      color: white;
      
      &:hover {
        background-color: #D32F2F;
      }
    }
  }
`;

const NewOverlayForm = styled.form`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  
  h3 {
    margin-top: 0;
  }
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

function OverlayManager({ overlays, onSaveOverlay, onDeleteOverlay }) {
  const [showForm, setShowForm] = useState(false);
  const [newOverlay, setNewOverlay] = useState({
    name: '',
    type: 'text',
    content: '',
    position: { x: 10, y: 10 },
    size: { width: 200, height: 50 },
    color: '#ffffff',
    fontSize: '24px'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'positionX' || name === 'positionY') {
      setNewOverlay({
        ...newOverlay,
        position: {
          ...newOverlay.position,
          [name === 'positionX' ? 'x' : 'y']: Number(value)
        }
      });
    } else if (name === 'width' || name === 'height') {
      setNewOverlay({
        ...newOverlay,
        size: {
          ...newOverlay.size,
          [name]: Number(value)
        }
      });
    } else {
      setNewOverlay({
        ...newOverlay,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveOverlay(newOverlay);
    resetForm();
  };

  const resetForm = () => {
    setNewOverlay({
      name: '',
      type: 'text',
      content: '',
      position: { x: 10, y: 10 },
      size: { width: 200, height: 50 },
      color: '#ffffff',
      fontSize: '24px'
    });
    setShowForm(false);
  };

  return (
    <div>
      <h2>Manage Overlays</h2>
      
      {/* Overlay List */}
      <OverlayList>
        <h3>Existing Overlays</h3>
        {overlays.length === 0 ? (
          <p>No overlays created yet.</p>
        ) : (
          overlays.map((overlay) => (
            <OverlayItem key={overlay._id}>
              <OverlayInfo>
                <h3>{overlay.name}</h3>
                <p>Type: {overlay.type}</p>
                <p>
                  Position: X: {overlay.position.x}%, Y: {overlay.position.y}%
                </p>
                <p>
                  Size: {overlay.size.width}px × {overlay.size.height}px
                </p>
              </OverlayInfo>
              <OverlayActions>
                <Link to={`/overlay-settings/${overlay._id}`}>
                  <button className="edit">Edit</button>
                </Link>
                <button 
                  className="delete" 
                  onClick={() => onDeleteOverlay(overlay._id)}
                >
                  Delete
                </button>
              </OverlayActions>
            </OverlayItem>
          ))
        )}
      </OverlayList>
      
      {/* Toggle Button */}
      {showForm ? (
        <button onClick={() => setShowForm(false)}>Cancel New Overlay</button>
      ) : (
        <button onClick={() => setShowForm(true)}>Create New Overlay</button>
      )}
      
      {/* New Overlay Form */}
      {showForm && (
        <NewOverlayForm onSubmit={handleSubmit}>
          <h3>Create New Overlay</h3>
          
          <FormGroup>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={newOverlay.name}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="type">Type</label>
            <select
              id="type"
              name="type"
              value={newOverlay.type}
              onChange={handleInputChange}
              required
            >
              <option value="text">Text</option>
              <option value="image">Image</option>
            </select>
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="content">
              {newOverlay.type === 'text' ? 'Text Content' : 'Image URL'}
            </label>
            {newOverlay.type === 'text' ? (
              <input
                id="content"
                name="content"
                type="text"
                value={newOverlay.content}
                onChange={handleInputChange}
                required
              />
            ) : (
              <input
                id="content"
                name="content"
                type="url"
                value={newOverlay.content}
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
                value={newOverlay.position.x}
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
                value={newOverlay.position.y}
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
                value={newOverlay.size.width}
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
                value={newOverlay.size.height}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </FormRow>
          
          {newOverlay.type === 'text' && (
            <FormRow>
              <FormGroup>
                <label htmlFor="color">Text Color</label>
                <input
                  id="color"
                  name="color"
                  type="color"
                  value={newOverlay.color}
                  onChange={handleInputChange}
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="fontSize">Font Size</label>
                <input
                  id="fontSize"
                  name="fontSize"
                  type="text"
                  value={newOverlay.fontSize}
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
              onClick={resetForm}
            >
              Cancel
            </button>
            <button type="submit" className="save">Save Overlay</button>
          </FormActions>
        </NewOverlayForm>
      )}
    </div>
  );
}

export default OverlayManager;