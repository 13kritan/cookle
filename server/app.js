const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const favoriteRoutes = require("./routes/favorites");
const cors = require("cors");
const mongoose = require("mongoose")

dotenv.config();


const app = express();


const allowedOrigins = [
  "http://localhost:3000", // local dev
  "https://cookle-f.vercel.app"
  "https://cookle.netlify.app",       // live frontend URL (Netlify or Vercel)
  "https://cookle-har5.onrender.com" //  on Render
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman or curl
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error("CORS policy does not allow access from this origin"), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}))

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  family: 4
})
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// Test route
app.get('/', (req, res) => {
  res.send('Sajilo Budget Backend is running!')
});


// App Routes
app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoriteRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
