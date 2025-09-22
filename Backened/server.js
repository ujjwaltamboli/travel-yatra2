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
import Booking from "./models/Booking.model.js";

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

app.get("/api/delete",async(req,res)=>{
  const {id}=req.query;
  await connectDB();
  await Package.deleteOne({_id:id});
  res.json({ success: true, message: "Package deleted successfully" });
})

app.get("/api/pay", async (req, res) => {
  console.log("Hello");
  await connectDB();
  const { id,uid } = req.query;
  let packageData = await Booking.updateOne(
    { packageId: id , // filter by id
     userId: uid},
    { $inc: { quantity: 1 } },
    {upsert: true}  // increment quantity by 1
  );
  console.log(packageData);
  return res.json(packageData);
})

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
  res.json({ success: true, message: "Access granted ", id: `${req.user.id}` });
});

// 🔒 UPDATE PACKAGE (Admin Only)
app.put("/admin", async (req, res) => {
  try {
    await connectDB();
    const { id } = req.query;   // package id from URL
    const updates = req.body;    // updated data from frontend

    const updatedPackage = await Package.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true } // returns updated doc & validates schema
    );

    if (!updatedPackage) {
      return res.status(404).json({ success: false, message: "Package not found" });
    }

    res.json({
      success: true,
      message: "Package updated successfully",
      data: updatedPackage,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error updating package" });
  }
});


app.get("/admin2",auth,async(req,res)=>{
  res.json({success:true,message:"Access Granted", id:`${req.user.id}`, role:`${req.user.role}`});
})

const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port http://10.43.233.10:${PORT}`);
});
