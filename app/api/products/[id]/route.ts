// GET /api/products/[id] - Obtener un producto por ID
// PUT /api/products/[id] - Actualizar un producto (requiere autenticación)
// DELETE /api/products/[id] - Eliminar un producto (requiere rol ADMIN)
import { NextRequest } from 'next/server';
import { ProductController } from '@/controllers/productController';
import { updateProductSchema } from '@/validators/productValidators';
import { authenticateToken } from '@/middlewares/authMiddleware';
import { requireUser, requireAdmin } from '@/middlewares/roleMiddleware';
import { successResponse, errorResponse } from '@/utils/apiResponse';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const product = await ProductController.getProductById(params.id);
    return successResponse(product, 200);
  } catch (error: any) {
    if (error.message.includes('no encontrado')) {
      return errorResponse(error.message, 404);
    }
    return errorResponse(error.message || 'Error al obtener producto', 500);
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    // Autenticar usuario
    const user = authenticateToken(request);
    requireUser(user);

    const body = await request.json();

    // Validar datos de entrada
    const validatedData = updateProductSchema.parse(body);

    // Actualizar producto
    const product = await ProductController.updateProduct(
      params.id,
      validatedData,
      user.userId,
      user.role
    );

    return successResponse(product, 200);
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

    if (error.message.includes('no encontrado')) {
      return errorResponse(error.message, 404);
    }

    return errorResponse(error.message || 'Error al actualizar producto', 500);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // Autenticar usuario y verificar que sea ADMIN
    const user = authenticateToken(request);
    requireAdmin(user);

    // Eliminar producto
    const result = await ProductController.deleteProduct(params.id);

    return successResponse(result, 200);
  } catch (error: any) {
    if (error.message.includes('Token') || error.message.includes('autenticación')) {
      return errorResponse(error.message, 401);
    }

    if (error.message.includes('permisos')) {
      return errorResponse(error.message, 403);
    }

    if (error.message.includes('no encontrado')) {
      return errorResponse(error.message, 404);
    }

    return errorResponse(error.message || 'Error al eliminar producto', 500);
  }
}
