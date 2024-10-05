import app from "./app.js";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();



// Set the port from the environment or use 5000 as a fallback
const PORT = process.env.PORT || 8000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}/health`);
});