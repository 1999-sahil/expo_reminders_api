import { RemindersService } from '../services/remindersService.js';

export const ReminderController = {
    async getAllReminders(req, res, next) {
        try {
            const reminders = await RemindersService.getAllReminders();
            res.status(200).json(reminders);
        } catch (error) {
            next(error);
        }
    },
    async getReminderById(req, res, next) {
        try {
            const reminderId = parseInt(req.params.id);
            const reminder = await RemindersService.getReminderById(reminderId);
            res.status(200).json(reminder);
        } catch (error) {
            next(error);
        }
    },
    async createReminder(req, res, next) {
        try {
            const reminder = await RemindersService.createReminder(req.body);
            res.status(201).json(reminder);
        } catch (error) {
            next(error);
        }
    },
    async updateReminder(req, res, next) {
        try {
            const reminderId = parseInt(req.params.id);
            const reminder = await RemindersService.updateReminder(reminderId, req.body);
            res.status(200).json(reminder);
        } catch (error) {
            next(error);
        }
    },
    async deleteReminder(req, res, next) {
        try {
            const reminderId = parseInt(req.params.id);
            const reminder = await RemindersService.deleteReminder(reminderId);
            res.status(200).json(reminder);
        } catch (error) {
            next(error);
        }
    }
}