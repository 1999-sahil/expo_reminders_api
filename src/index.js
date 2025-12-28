import express from 'express';
import remindersRoutes from './routes/remindersRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/reminders', remindersRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});