import db from '../models/index.js';

// Dummy implementation for MVP: returns a random value for time spent
export async function getTimeReport(user) {
  // In a real app, you would sum up time logs for each task
  // For MVP, return a random value per task
  const tasks = await db.Task.findAll({ where: { userId: user.id } });
  const report = tasks.map(task => ({
    taskId: task.id,
    title: task.title,
    hoursSpent: Math.floor(Math.random() * 10) + 1 // Random value between 1 and 10
  }));
  return report;
}

export async function getTaskCompletionReport(user) {
  const tasks = await db.Task.findAll({ where: { userId: user.id } });
  const counts = { pending: 0, 'in-progress': 0, completed: 0 };
  tasks.forEach(task => {
    if (counts[task.status] !== undefined) counts[task.status]++;
  });
  const total = tasks.length;
  const percentages = {
    pending: total ? (counts.pending / total) * 100 : 0,
    'in-progress': total ? (counts['in-progress'] / total) * 100 : 0,
    completed: total ? (counts.completed / total) * 100 : 0
  };
  return { counts, percentages, total };
}
