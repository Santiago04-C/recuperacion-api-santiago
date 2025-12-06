// GET /api/auth/me - Obtener información del usuario autenticado
import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticateToken } from '@/middlewares/authMiddleware';
import { successResponse, errorResponse } from '@/utils/apiResponse';

export async function GET(request: NextRequest) {
  try {
    // Autenticar usuario
    const user = authenticateToken(request);

    // Buscar usuario en la base de datos
    const userData = await prisma.user.findUnique({
      where: { id: user.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!userData) {
      return errorResponse('Usuario no encontrado', 404);
    }

    return successResponse(userData, 200);
  } catch (error: any) {
    if (error.message.includes('Token') || error.message.includes('autenticación')) {
      return errorResponse(error.message, 401);
    }

    return errorResponse(error.message || 'Error al obtener información del usuario', 500);
  }
}
