import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import projectRoutes from './routes/project.js';
import cors from 'cors';
import { sendEmail } from "./util/emailSender.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'https://web-portfolio-client.vercel.app'],
    methods: ['*'],
}));

app.use('/projects', projectRoutes);
app.post("/api/send-email", sendEmail);

mongoose.connect('mongodb+srv://admin:admin1234@lagmandb.c5k81.mongodb.net/WebDev-Portfolio?retryWrites=true&w=majority&appName=LagmanDB')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB:', err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
