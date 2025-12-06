// Middleware de autenticación
import { NextRequest } from 'next/server';
import { verifyToken, JWTPayload } from '@/utils/jwt';

export interface AuthenticatedRequest extends NextRequest {
  user?: JWTPayload;
}

export function authenticateToken(request: NextRequest): JWTPayload {
  const authHeader = request.headers.get('authorization');
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    throw new Error('Token de autenticación no proporcionado');
  }

  try {
    const user = verifyToken(token);
    return user;
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
}
