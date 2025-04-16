VibeCheck
VibeCheck is a social mood-tracking application that allows users to log their emotional states, share vibes with friends, and visualize their happiness trends over time. Users can register, log in, send friend requests, and view shared vibes from their network.
![VibeCheck Screenshot](/image.png)
![VibeCheck Screenshot](/dash.png)

Tech Stack
Backend

Node.js: JavaScript runtime for building the server-side application.
Express.js: Web framework for creating RESTful APIs and handling HTTP requests.
MongoDB: NoSQL database for storing user data, vibe entries, and friend relationships.
Mongoose: ODM (Object Data Modeling) library for MongoDB to define schemas and interact with the database.
bcryptjs: Library for hashing passwords to ensure secure user authentication.
express-session: Middleware for managing user sessions to maintain authentication state.

Frontend

React: JavaScript library for building interactive user interfaces.
React Router: Library for client-side routing to navigate between pages (e.g., login, register, dashboard).
Chart.js: Charting library for visualizing happiness trends with line charts.
react-chartjs-2: React wrapper for Chart.js to integrate charts into React components.
CSS: Custom styles for responsive and visually appealing UI components.

Key Features

User Authentication: Secure registration and login with password hashing.
Mood Tracking: Users can log their mood (0-10 scale), additional emotions (e.g., anger, anxiety), and notes.
Social Features: Send/receive friend requests, accept/reject requests, and remove friends.
Vibe Sharing: Share mood entries with friends and view friends' shared vibes.
Data Visualization: Line chart displaying happiness trends over time using Chart.js.
Search Functionality: Search for users by email or username to send friend requests.

Installation

Clone the repository:git clone <repository-url>


Install backend dependencies:cd backend
npm install


Install frontend dependencies:cd frontend
npm install


Set up environment variables:
Create a .env file in the backend directory.
Add MongoDB URI and session secret:MONGODB_URI=<your-mongodb-uri>
SESSION_SECRET=<your-session-secret>




Run the backend:cd backend
npm start


Run the frontend:cd frontend
npm start



Usage

Access the application at http://localhost:3000.
Register a new account or log in with existing credentials.
Log your vibes, manage friend requests, and view shared vibes from friends.
Check the happiness chart on the dashboard to track mood trends.

Future Improvements

Add real-time notifications for friend requests and vibe updates.
Implement password recovery and email verification.
Enhance the UI with animations and improved mobile responsiveness.
Add support for custom vibe categories and richer data visualizations.

