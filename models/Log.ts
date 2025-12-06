// Modelo Mongoose para MongoDB - Logs de actividad
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILog extends Document {
  action: string;
  userId?: string;
  details?: string;
  ipAddress?: string;
  timestamp: Date;
}

const LogSchema: Schema = new Schema({
  action: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: false,
  },
  details: {
    type: String,
    required: false,
  },
  ipAddress: {
    type: String,
    required: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Prevenir la recreación del modelo en hot-reload
const Log: Model<ILog> = mongoose.models.Log || mongoose.model<ILog>('Log', LogSchema);

export default Log;
