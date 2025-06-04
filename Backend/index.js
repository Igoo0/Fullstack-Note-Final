import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import NotesRoute from "./routes/NoteRoute.js";
import sequelize from "./config/Database.js";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(cors({ credentials:true,origin:
    'http://localhost:3000', // Keep for local frontend development
    'http://localhost:3001', // Keep if you use another local port
    'http://localhost:8080',
    'https://abednotes-dot-xenon-axe-450704-n3.uc.r.appspot.com' }));
app.use(express.json());

app.use(UserRoute);
app.use(NotesRoute);

const start = async () => {
  try {
    console.log("Attempting database connection...");
    
    // Test database connection with timeout
    await Promise.race([
      sequelize.authenticate(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database connection timeout')), 10000)
      )
    ]);
    console.log("Database connected successfully");
    
    // Sync database models
    await sequelize.sync();
    console.log("Database synced");

  } catch (error) {
    console.error("Database connection failed:", error);
    // Continue without database for debugging
    console.log("Starting server without database connection...");
  }

  // Always start the server even if DB fails
  const port = process.env.PORT || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
  });
};

    // Menggunakan PORT dari environment atau default ke 5000
    const port = process.env.PORT || 3000;
    app.listen(port, '0.0.0.0',() => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

start();
