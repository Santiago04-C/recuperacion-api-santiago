// Middleware de Next.js para configuración global
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Agregar headers CORS si es necesario
  const response = NextResponse.next();
  
  // Permitir CORS en desarrollo
  if (process.env.NODE_ENV === 'development') {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  return response;
}

// Configurar qué rutas usan este middleware
export const config = {
  matcher: '/api/:path*',
};