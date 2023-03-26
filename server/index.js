import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import KPI from "./models/KPI.js";
import Product from "./models/Product.js";
import Transaction from "./models/Transaction.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from "./routes/transaction.js";
import { kpis, products, transactions } from "./data/data.js";

// Config
dotenv.config();
const app = express();
// parsing body request to json
app.use(express.json());
// security against xss, csrf, clickjacking
app.use(helmet());
// Politics
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin",
    })
);
// logging requests
app.use(morgan("common"));
// parsing body request to json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Crosdom request
app.use(cors());

// Routes
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);

// Mongoose setup
const PORT = process.env.PORT || 9000;
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
        // await mongoose.connection.db.dropDatabase();
        // KPI.insertMany(kpis);
        // Product.insertMany(products);
        // Transaction.insertMany(transactions);
    })
    .catch((err) => console.log(`${err} did not connect`));
