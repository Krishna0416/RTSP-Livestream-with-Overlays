from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import uuid

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# In-memory data store
overlays = []


@app.route('/api/overlays', methods=['GET'])
def get_overlays():
    return jsonify(overlays)


@app.route('/api/overlays/<id>', methods=['GET'])
def get_overlay(id):
    try:
        for overlay in overlays:
            if overlay.get('_id') == id:
                return jsonify(overlay)
        return jsonify({"error": "Overlay not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route('/api/overlays', methods=['POST'])
def create_overlay():
    try:
        overlay_data = request.json
        
        # Validate required fields
        required_fields = ["name", "type", "content", "position", "size"]
        if not all(key in overlay_data for key in required_fields):
            return jsonify({"error": "Missing required fields"}), 400
        
        # Add a unique ID
        overlay_data['_id'] = str(uuid.uuid4())
        
        # Add to in-memory store
        overlays.append(overlay_data)
        
        return jsonify(overlay_data), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route('/api/overlays/<id>', methods=['PUT'])
def update_overlay(id):
    try:
        overlay_data = request.json
        
        for i, overlay in enumerate(overlays):
            if overlay.get('_id') == id:
                # Update the overlay while preserving the ID
                overlay_data['_id'] = id
                overlays[i] = overlay_data
                return jsonify(overlays[i])
        
        return jsonify({"error": "Overlay not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route('/api/overlays/<id>', methods=['DELETE'])
def delete_overlay(id):
    try:
        global overlays
        initial_length = len(overlays)
        
        # Filter out the overlay with the given ID
        overlays = [o for o in overlays if o.get('_id') != id]
        
        if len(overlays) < initial_length:
            return jsonify({"message": "Overlay deleted successfully"})
        else:
            return jsonify({"error": "Overlay not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == '__main__':
    # Add some sample data for testing
    sample_overlay = {
        "_id": "sample-id-1",
        "name": "Sample Logo",
        "type": "image",
        "content": "https://example.com/logo.png",
        "position": {
            "x": 10,
            "y": 10
        },
        "size": {
            "width": 100,
            "height": 50
        }
    }
    overlays.append(sample_overlay)
    
    # Run the Flask app
    app.run(debug=True, host='localhost', port=5000)