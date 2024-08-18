import requests

def test_create_trip_plan():
    url = "http://localhost:8000/create-trip-plan/"
    payload = {
        "place": "Paris"  # Example place; adjust as needed
    }
    
    try:
        response = requests.post(url, json=payload)

        # Print response status and content for debugging
        print(f"Status Code: {response.status_code}")
        print(f"Response Headers: {response.headers}")
        print(f"Response Content: {response.content}")

        # Check that the response status code is 200 (OK)
        assert response.status_code == 200
        
        # Check that the response content type is image/png
        assert response.headers['Content-Type'] == 'image/png'

        # Save the image to a file to verify its content manually
        with open('trip_plan.png', 'wb') as f:
            f.write(response.content)

        print("Test passed successfully.")

    except AssertionError as e:
        print(f"Assertion Error: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    test_create_trip_plan()
