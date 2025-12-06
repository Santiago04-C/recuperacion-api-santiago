// Controlador de logs
import connectMongoDB from '@/lib/mongodb';
import Log from '@/models/Log';
import { CreateLogInput } from '@/validators/logValidators';

export class LogController {
  // Crear un log
  static async createLog(data: CreateLogInput) {
    await connectMongoDB();

    const log = await Log.create({
      action: data.action,
      userId: data.userId,
      details: data.details,
      ipAddress: data.ipAddress,
      timestamp: new Date(),
    });

    return log;
  }

  // Obtener todos los logs
  static async getAllLogs() {
    await connectMongoDB();

    const logs = await Log.find().sort({ timestamp: -1 }).limit(100);
    return logs;
  }
}
