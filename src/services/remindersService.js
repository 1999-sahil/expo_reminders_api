import { RemindersModel } from "../models/remindersModel.js";

export const RemindersService = {
    async getAllReminders() {
        return await RemindersModel.getAll();
    },
    async getReminderById(id) {
        const reminder = await RemindersModel.findById(id);

        if (!reminder) {
            throw new Error('Reminder not found');
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
        console.log(values.length - 1);

        const query = `
          UPDATE reminders
          SET ${setClause.join(", ")}
          WHERE id = $${values.length}
          RETURNING *;
        `;

        // Update reminder
        const updatedReminder = await RemindersModel.update(query, values);
        if (!updatedReminder) {
            throw new Error('Reminder not found');
        }

        return updatedReminder;
    },
    async deleteReminder(reminderId) {
        const authenticatedUserId = 1;
        const reminder = await RemindersModel.findById(reminderId);

        if (!reminder) {
            throw new Error('Reminder not found');
        }

        if (reminder.user_id !== authenticatedUserId) {
            throw new Error('You are not authorized');
        }

        const rowCount = await RemindersModel.delete(reminderId);

        if (rowCount === 0) {
            throw new Error('Failed to delete a reminder');
        }
        return { message: 'Reminder deleted successfully'};
    }
}