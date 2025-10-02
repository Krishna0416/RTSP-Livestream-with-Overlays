import requests
import json

# API base URL
BASE_URL = "http://localhost:5000/api"  # Use localhost for testing


def test_create_overlay():
    """Test creating a new overlay"""
    print("\n=== Testing Create Overlay ===")
    
    # Sample overlay data
    overlay_data = {
        "name": "Test Logo",
        "type": "image",
        "content": "https://example.com/test-logo.png",
        "position": {
            "x": 15,
            "y": 15
        },
        "size": {
            "width": 120,
            "height": 60
        }
    }
    
    # Send POST request to create overlay
    response = requests.post(f"{BASE_URL}/overlays", json=overlay_data, timeout=10)
    
    # Print response
    print(f"Status Code: {response.status_code}")
    
    if response.status_code == 201:
        overlay = response.json()
        print(f"Created Overlay: {json.dumps(overlay, indent=2)}")
        return overlay.get("_id")
    else:
        print(f"Error: {response.text}")
        return None



def test_get_all_overlays():
    """Test retrieving all overlays"""
    print("\n=== Testing Get All Overlays ===")
    
    # Send GET request to retrieve all overlays
    response = requests.get(f"{BASE_URL}/overlays", timeout=10)
    
    # Print response
    print(f"Status Code: {response.status_code}")
    
    if response.status_code == 200:
        overlays = response.json()
        print(f"Number of Overlays: {len(overlays)}")
        for overlay in overlays:
            print(f"- {overlay['name']} ({overlay['type']})")
    else:
        print(f"Error: {response.text}")



def test_get_overlay(overlay_id):
    """Test retrieving a specific overlay"""
    print(f"\n=== Testing Get Overlay {overlay_id} ===")
    
    # Send GET request to retrieve the overlay
    response = requests.get(f"{BASE_URL}/overlays/{overlay_id}", timeout=10)
    
    # Print response
    print(f"Status Code: {response.status_code}")
    
    if response.status_code == 200:
        overlay = response.json()
        print(f"Retrieved Overlay: {json.dumps(overlay, indent=2)}")
    else:
        print(f"Error: {response.text}")



def test_update_overlay(overlay_id):
    """Test updating an overlay"""
    print(f"\n=== Testing Update Overlay {overlay_id} ===")
    
    # Updated data
    update_data = {
        "name": "Updated Test Logo",
        "position": {
            "x": 25,
            "y": 25
        }
    }
    
    # Send PUT request to update the overlay
    response = requests.put(f"{BASE_URL}/overlays/{overlay_id}", json=update_data, timeout=10)
    
    # Print response
    print(f"Status Code: {response.status_code}")
    
    if response.status_code == 200:
        overlay = response.json()
        print(f"Updated Overlay: {json.dumps(overlay, indent=2)}")
    else:
        print(f"Error: {response.text}")



def test_delete_overlay(overlay_id):
    """Test deleting an overlay"""
    print(f"\n=== Testing Delete Overlay {overlay_id} ===")
    
    # Send DELETE request to delete the overlay
    response = requests.delete(f"{BASE_URL}/overlays/{overlay_id}", timeout=10)
    
    # Print response
    print(f"Status Code: {response.status_code}")
    
    if response.status_code == 200:
        result = response.json()
        print(f"Result: {result}")
    else:
        print(f"Error: {response.text}")



def run_tests():
    """Run all API tests in sequence"""
    # First, get all existing overlays
    test_get_all_overlays()
    
    # Create a new overlay
    overlay_id = test_create_overlay()
    
    if overlay_id:
        # Get the created overlay
        test_get_overlay(overlay_id)
        
        # Update the overlay
        test_update_overlay(overlay_id)
        
        # Get the updated overlay
        test_get_overlay(overlay_id)
        
        # Delete the overlay
        test_delete_overlay(overlay_id)
        
        # Verify it was deleted by trying to get it again
        test_get_overlay(overlay_id)
    
    # Get all overlays again after tests
    test_get_all_overlays()

if __name__ == "__main__":
    print("Starting API tests...")
    try:
        run_tests()
        print("\nTests completed!")
    except requests.RequestException as e:
        print(f"\nNetwork error during tests: {e}")
    except KeyError as e:
        print(f"\nData structure error during tests: {e}")
    except ValueError as e:
        print(f"\nValue error during tests: {e}")
    except Exception as e:  # Still keep a general exception handler as fallback
        print(f"\nUnexpected error during tests: {e}")