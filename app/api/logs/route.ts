// POST /api/logs - Crear un log en MongoDB
// GET /api/logs - Obtener todos los logs
import { NextRequest } from 'next/server';
import { LogController } from '@/controllers/logController';
import { createLogSchema } from '@/validators/logValidators';
import { successResponse, errorResponse } from '@/utils/apiResponse';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar datos de entrada
    const validatedData = createLogSchema.parse(body);

    // Obtener IP del cliente
    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown';

    // Crear log
    const log = await LogController.createLog({
      ...validatedData,
      ipAddress,
    });

    return successResponse(log, 201);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Datos de entrada inválidos', 400, error.errors);
    }

    return errorResponse(error.message || 'Error al crear log', 500);
  }
}

export async function GET() {
  try {
    const logs = await LogController.getAllLogs();
    return successResponse(logs, 200);
  } catch (error: any) {
    return errorResponse(error.message || 'Error al obtener logs', 500);
  }
}
