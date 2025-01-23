<img src="frontend/src/assets/eat-around-logo-light.svg" alt="Eat Around Logo" width="100" />

# Eat Around - Gluten-Free Restaurant Finder

Eat Around is a web application designed to help users discover and track dining establishments that cater to vegetarian, vegan, gluten-free, lactose-free, halal, and kosher cuisines, including restaurants, bakeries, and cafes nearby. The application leverages the Google Maps API and Places services to provide accurate location-based recommendations.

## Technical Architecture

The application follows a modern containerized architecture with two main components:

1. **Frontend Service**

-   Built using Vite
-   Features a user interface that integrates with Google Maps
-   Runs in a Docker container with limited resources
-   Communicates with the backend API through Axios
-   Environment variables handle Google Maps API authentication

2. **Backend API Service**

-   Runs on Node.js
-   Implements user authentication through Clerk
-   Utilizes a database ( PostgreSQL )
-   Handles email functionality through AWS SMTP services
-   Configured with higher resource limits
-   Includes webhook support through ngrok for development

## Key Features

1. **Location-Based Search**

-   Users can search for dining establishments near their current location or by entering an address in the provided form.
-   Integration with Google Maps provides accurate geographical data
-   Places API enables detailed information about each establishment

2. **Filtering System**

-   Users can apply filters to refine their search results
-   Specifically tailored for dietary preferences

3. **Favorites System**

-   Users can save their preferred establishments to a favorites list
-   Requires authentication to add favorites and manage filters

## Development Setup

The project uses a comprehensive development environment:

-   Docker Compose for container orchestration
-   Automated installation scripts for both frontend and backend
-   Includes testing capabilities
