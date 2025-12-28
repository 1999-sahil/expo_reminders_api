import { RemindersService } from '../services/remindersService.js';

export const ReminderController = {
    async getAllReminders(req, res) {
        try {
            const reminders = await RemindersService.getAllReminders();
            res.status(200).json(reminders);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    },
    async getReminderById(req, res) {
        try {
            const reminderId = parseInt(req.params.id);
            const reminder = await RemindersService.getReminderById(reminderId);
            res.status(200).json(reminder);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    },
    async createReminder(req, res) {
        try {
            const reminder = await RemindersService.createReminder(req.body);
            res.status(201).json(reminder);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    },
    async updateReminder(req, res) {
        try {
            const reminderId = parseInt(req.params.id);
            const reminder = await RemindersService.updateReminder(reminderId, req.body);
            res.status(200).json(reminder);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    },
    async deleteReminder(req, res) {
        try {
            const reminderId = parseInt(req.params.id);
            const reminder = await RemindersService.deleteReminder(reminderId);
            res.status(200).json(reminder);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}