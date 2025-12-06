// POST /api/auth/login - Login de usuario
import { NextRequest } from 'next/server';
import { AuthController } from '@/controllers/authController';
import { loginSchema } from '@/validators/authValidators';
import { successResponse, errorResponse } from '@/utils/apiResponse';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar datos de entrada
    const validatedData = loginSchema.parse(body);

    // Login de usuario
    const result = await AuthController.login(validatedData);

    return successResponse(result, 200);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Datos de entrada inválidos', 400, error.errors);
    }

    return errorResponse(error.message || 'Error al iniciar sesión', 401);
  }
}
