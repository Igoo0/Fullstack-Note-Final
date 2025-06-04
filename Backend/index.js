import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import NotesRoute from "./routes/NotesRoute.js";
import sequelize from "./config/Database.js";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(cors({ credentials:true,origin:'https://abednotes-dot-xenon-axe-450704-n3.uc.r.appspot.com/' }));
app.use(express.json());

app.use(UserRoute);
app.use(NoteRoute);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
    await sequelize.sync(); // sinkronisasi model

    // Menggunakan PORT dari environment atau default ke 5000
    const port = process.env.PORT || 3000;
    app.listen(port, '0.0.0.0',() => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

start();
