// Middleware de autorización por roles
import { JWTPayload } from '@/utils/jwt';

export function requireRole(user: JWTPayload, allowedRoles: string[]): void {
  if (!allowedRoles.includes(user.role)) {
    throw new Error('No tienes permisos para realizar esta acción');
  }
}

export function requireAdmin(user: JWTPayload): void {
  requireRole(user, ['ADMIN']);
}

export function requireUser(user: JWTPayload): void {
  requireRole(user, ['USER', 'ADMIN']);
}
