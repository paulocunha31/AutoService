import express from "express";
import cors from "cors";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/health",(reg, res) =>{
    res.status(200).json({
        status: "ok",
        message: "AutoService API esta Funciomando 🚀",
    });
});

export default app;