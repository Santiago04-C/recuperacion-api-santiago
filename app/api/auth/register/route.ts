// POST /api/auth/register - Registro de usuario
import { NextRequest } from 'next/server';
import { AuthController } from '@/controllers/authController';
import { registerSchema } from '@/validators/authValidators';
import { successResponse, errorResponse } from '@/utils/apiResponse';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar datos de entrada
    const validatedData = registerSchema.parse(body);

    // Registrar usuario
    const result = await AuthController.register(validatedData);

    return successResponse(result, 201);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Datos de entrada inválidos', 400, error.errors);
    }

    return errorResponse(error.message || 'Error al registrar usuario', 400);
  }
}
