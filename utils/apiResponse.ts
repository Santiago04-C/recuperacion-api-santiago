// Utilidades para respuestas API consistentes
import { NextResponse } from 'next/server';

export function successResponse(data: any, status: number = 200) {
  return NextResponse.json({
    success: true,
    data,
  }, { status });
}

export function errorResponse(message: string, status: number = 400, errors?: any) {
  return NextResponse.json({
    success: false,
    message,
    errors,
  }, { status });
}
