import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import Review from "./models/Review.js";
import User from "./models/User.js";
import Payment from "./models/paymentpage_model.js";
import Contact from "./models/ContactUs.js";
import Reservation from "./models/Reservation.js";
import Admin from "./models/Admin.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// DB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connected");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

connectDB();

// Health check
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is Running",
    data: null,
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Review page",
    data: null,
  });
});


// =================== APIs ===================

// Review APIs
app.post("/review", async (req, res) => {
  const { name, message, userPhoto } = req.body;
  if (!name || !message) {
    return res.json({
      success: false,
      message: name ? "Review is required" : "Login is required",
      data: null,
    });
  }
  const newReview = await Review.create({ name, message, userPhoto });
  res.json({
    success: true,
    message: "Review added successfully",
    data: newReview,
  });
});

app.get("/review", async (req, res) => {
  const review = await Review.find();
  res.json({
    success: true,
    message: "Review fetched successfully",
    data: review,
  });
});

app.delete("/review/:id", async (req, res) => {
  const { id } = req.params;
  await Review.deleteOne({ _id: id });
  res.json({
    success: true,
    message: "Review deleted successfully",
    data: null,
  });
});

// User login
app.post("/user", async (req, res) => {
  const { email, userName, userPhoto } = req.body;
  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      existingUser.isLoggedIn = true;
      await existingUser.save();
      res.json({
        success: true,
        message: "User logged in successfully",
        data: existingUser,
      });
    } else {
      const newUser = await User.create({
        email,
        userName,
        userPhoto,
        isLoggedIn: true,
      });
      res.json({
        success: true,
        message: "New user created and logged in successfully",
        data: newUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
});

app.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
});

app.post("/user/logout", async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      user.isLoggedIn = false;
      await user.save();
      res.json({
        success: true,
        message: "User logged out successfully",
        data: user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
});

// Signup
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
      data: null,
    });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
        data: null,
      });
    }

    const bcrypt = await import("bcrypt");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
});

// Payment
app.post("/payment", async (req, res) => {
  const {
    First_Name,
    Last_Name,
    Date_of_Birth,
    Phone_Number,
    Email,
    City,
    Zip
  } = req.body;

  try {
    const newPayment = await Payment.create({
      First_Name,
      Last_Name,
      Date_of_Birth,
      Phone_Number,
      Email,
      City,
      Zip,
    });
    res.status(201).json({
      message: "Payment created successfully",
      data: newPayment,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Reservation
app.post("/reservation", async (req, res) => {
  const { name, phone, gender, seat, email } = req.body;

  try {
    const book = await Reservation.create({ name, phone, email, gender, seat });
    res.json({
      success: true,
      message: "Details added Successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding reservation",
      error: error.message,
    });
  }
});

app.get("/reservation", async (req, res) => {
  try {
    const book = await Reservation.find();
    res.json({
      success: true,
      message: "Reservation Details fetched successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching Reservation",
      error: error.message,
    });
  }
});

// Contact Us
app.post("/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;
  const contact = await Contact.create({ name, email, phone, message });
  res.json({
    success: true,
    message: "Your Message has been sent to the admin",
    data: contact,
  });
});

app.get("/contact", async (req, res) => {
  const contacts = await Contact.find();
  res.json({
    success: true,
    message: "Contact Requests fetched successfully",
    data: contacts,
  });
});

import Info from "./models/Info.js";

// Admin
app.post("/admin", async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.create({ email, password });
  res.json({
    success: true,
    message: "Admin created successfully",
    data: admin,
  });
});

app.get("/admin", async (req, res) => {
  try {
    const admin = await Admin.findOne();
    if (admin) {
      res.json({
        success: true,
        message: "Admin details fetched successfully",
        data: admin,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Admin details not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin details",
    });
  }
});

// Info routes
app.post("/info", async (req, res) => {
  try {
    const newInfo = await Info.create(req.body);
    res.status(201).json({
      success: true,
      message: "Info created successfully",
      data: newInfo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create info",
      error: error.message,
    });
  }
});

app.get("/info", async (req, res) => {
  try {
    const infos = await Info.find();
    res.json({
      success: true,
      message: "Info fetched successfully",
      data: infos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch info",
      error: error.message,
    });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
