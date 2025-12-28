import express from 'express';
import remindersRoutes from './routes/remindersRoutes.js';
import usersRoutes from './routes/usersRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use('/reminders', remindersRoutes);
app.use('/users', usersRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});