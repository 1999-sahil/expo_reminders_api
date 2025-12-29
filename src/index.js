import express from 'express';
import remindersRoutes from './routes/remindersRoutes.js';
import errorHandler from './middlewares/errorHandlerMiddleware.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/reminders', remindersRoutes);

// Should be last
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});