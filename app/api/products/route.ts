// GET /api/products - Obtener todos los productos
// POST /api/products - Crear un producto (requiere autenticación)
import { NextRequest } from 'next/server';
import { ProductController } from '@/controllers/productController';
import { createProductSchema } from '@/validators/productValidators';
import { authenticateToken } from '@/middlewares/authMiddleware';
import { requireUser } from '@/middlewares/roleMiddleware';
import { successResponse, errorResponse } from '@/utils/apiResponse';

export async function GET() {
  try {
    const products = await ProductController.getAllProducts();
    return successResponse(products, 200);
  } catch (error: any) {
    return errorResponse(error.message || 'Error al obtener productos', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Autenticar usuario
    const user = authenticateToken(request);
    requireUser(user);

    const body = await request.json();

    // Validar datos de entrada
    const validatedData = createProductSchema.parse(body);

    // Crear producto
    const product = await ProductController.createProduct(validatedData, user.userId);

    return successResponse(product, 201);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Datos de entrada inválidos', 400, error.errors);
    }

    if (error.message.includes('Token') || error.message.includes('autenticación')) {
      return errorResponse(error.message, 401);
    }

    if (error.message.includes('permisos')) {
      return errorResponse(error.message, 403);
    }

    return errorResponse(error.message || 'Error al crear producto', 500);
  }
}
