import { Router } from 'express';
import { ReminderController } from '../controllers/remindersController.js';
import { validateData } from '../middlewares/validationMiddleware.js';
import { createRemindersSchema, updateRemindersSchema } from '../schemas/remindersSchema.js';

const router = Router();

router.get('/', ReminderController.getAllReminders);

router.get('/:id', ReminderController.getReminderById);

router.post('/', validateData(createRemindersSchema), ReminderController.createReminder);

router.patch('/:id', validateData(updateRemindersSchema), ReminderController.updateReminder);

router.delete('/:id', ReminderController.deleteReminder);

export default router;