import express from 'express'
import connectDb from './config/db.js'
import dotenv from 'dotenv'
import path from 'path';
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import { fileURLToPath } from 'url'; // Import fileURLToPath

const __filename = fileURLToPath(import.meta.url); // Get filename
const __dirname = path.dirname(__filename);

const app=express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

dotenv.config();

connectDb();
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  }
  // app.use(cors(corsOptions));
  app.use(cors(corsOptions))

const port = process.env.PORT || 4500

app.listen(port, () => {
  console.log(`server started on port ${port}`)
})