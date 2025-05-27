import { getTimeReport, getTaskCompletionReport } from '../services/report.service.js';

export const reportTime = async (req, res, next) => {
  try {
    const report = await getTimeReport(req.user);
    res.json(report);
  } catch (error) {
    next(error);
  }
};

export const reportCompletion = async (req, res, next) => {
  try {
    const report = await getTaskCompletionReport(req.user);
    res.json(report);
  } catch (error) {
    next(error);
  }
};
