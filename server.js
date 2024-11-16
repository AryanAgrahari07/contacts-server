const express = require("express");
const app = express();
const contactRoutes = require("./routes/ContactRoutes");  // Correct import
const cors = require("cors");
const connectDB = require("./config/db");



app.use(
  cors({
      origin: '*',
      methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
      credentials: true,
      optionsSuccessStatus: 204,
  })
);
app.use(cors({
  origin: 'https://contacts-management7.netlify.app'
}));
app.use(express.json());  // Middleware for JSON parsing

// Use the contact routes under /api/contacts path
app.use("/api/contacts", contactRoutes);  // Correct use of routes

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

connectDB();
