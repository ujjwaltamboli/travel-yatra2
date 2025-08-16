import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.route.js";
import Package from "./models/package.model.js";
import connectDB from "./db/connectDb.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { auth, isAdmin } from "./middlewares/verify.js";
import { ObjectId } from 'mongodb'; // ESM

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // your frontend
  credentials: true
}));


app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser()); // ✅ Correct usage

// ✅ PACKAGE API ROUTE WITH PROPER FILTERING AND SORTING
app.get("/api/package", async (req, res) => {
  console.log("Hello");
  try {
    await connectDB();
    const { sort, limit, Description, offer, id } = req.query;

    if (id){
      let packageData =await Package.findOne({ _id: new ObjectId(id) });
      console.log(packageData);
      return res.json(packageData);
    }

    // Build query object dynamically
    const query = {};
    if (Description) query.packageDescription = Description;
    if (offer === "true") query.packageOffer = true;

    let packageData = Package.find(query);

    if (sort === "createdAt") {
      packageData = packageData.sort({ createdAt: -1 });
    }

    if (limit) {
      packageData = packageData.limit(parseInt(limit));
    }

    const results = await packageData;
    return res.json(results);
  } catch (error) {
    console.error("Error fetching packages:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ AUTH ROUTES
app.use("/api/auth", authRouter);

// 🔒 ADMIN ROUTE EXAMPLE (COMMENTED FOR NOW)
app.post("/admin", async (req, res) => {
  console.log("Hello World");
  await connectDB();
  const data = req.body;
  await Package.create(data);
  res.json({ success: true, message: "Package added successfully" });
});

app.get("/admin", auth, isAdmin, async (req, res) => {
  res.json({ success: true, message: "Access granted " });
});

const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port http://10.96.65.10:${PORT}`);
});
