import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/AuthRoutes'
import propertyRouter from './routes/propertiesRoutes'

dotenv.config()

const app = express()
app.use(cookieParser());
// Middleware

const allowedOrigins = ['http://localhost:3000', 'http://20.248.224.164'];

app.use(
  cors({
    origin: function(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
)

app.use(express.json())

// Routes
app.use(authRoutes)
app.use("/api/properties", propertyRouter)

export default app
