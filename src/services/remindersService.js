import { RemindersModel } from "../models/remindersModel.js";
import ERROR_MESSAGES from "../constants/errorMessages.js";
import CustomError from "../utils/customError.js";

export const RemindersService = {
    async getAllReminders() {
        return await RemindersModel.getAll();
    },
    async getReminderById(id) {
        const reminder = await RemindersModel.findById(id);

        if (!reminder) {
            throw new CustomError(ERROR_MESSAGES.REMINDER_NOT_FOUND, 404);
        }

        return reminder;
    },
    async createReminder(newReminder) {
        const { reminder, notes, userId } = newReminder;

        // Sanitize the data first before storing it in Db
        const sanitizedReminder = {
            reminder: reminder?.trim(),
            notes: notes?.trim(),
            userId,
        };

        const createReminder = await RemindersModel.create(sanitizedReminder);
        return createReminder;
    },
    async updateReminder(reminderId, newValues) {
        const fields = Object.keys(newValues);
        const setClause = fields.map((key, index) => `${key} = $${index + 1}`);
        const values = Object.values(newValues);
        values.push(reminderId);

        const query = `
          UPDATE reminders
          SET ${setClause.join(", ")}
          WHERE id = $${values.length}
          RETURNING *;
        `;

        // Update reminder
        const updatedReminder = await RemindersModel.update(query, values);
        if (!updatedReminder) {
            throw new CustomError(ERROR_MESSAGES.REMINDER_NOT_FOUND, 404);
        }

        return updatedReminder;
    },
    async deleteReminder(reminderId) {
        const authenticatedUserId = 1;
        const reminder = await RemindersModel.findById(reminderId);

        if (!reminder) {
            throw new CustomError(ERROR_MESSAGES.REMINDER_NOT_FOUND, 404);
        }

        if (reminder.user_id !== authenticatedUserId) {
            throw new CustomError(ERROR_MESSAGES.FORBIDDEN, 403);
        }

        const rowCount = await RemindersModel.delete(reminderId);

        if (rowCount === 0) {
            throw new CustomError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);
        }
        return { message: 'Reminder deleted successfully'};
    }
}