// Controlador de productos
import prisma from '@/lib/prisma';
import { CreateProductInput, UpdateProductInput } from '@/validators/productValidators';

export class ProductController {
  // Obtener todos los productos
  static async getAllProducts() {
    const products = await prisma.product.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return products;
  }

  // Obtener un producto por ID
  static async getProductById(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    return product;
  }

  // Crear un producto
  static async createProduct(data: CreateProductInput, userId: string) {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    return product;
  }

  // Actualizar un producto
  static async updateProduct(id: string, data: UpdateProductInput, userId: string, userRole: string) {
    // Verificar que el producto existe
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      throw new Error('Producto no encontrado');
    }

    // Verificar permisos: solo el propietario o admin puede actualizar
    if (existingProduct.userId !== userId && userRole !== 'ADMIN') {
      throw new Error('No tienes permisos para actualizar este producto');
    }

    const product = await prisma.product.update({
      where: { id },
      data,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    return product;
  }

  // Eliminar un producto
  static async deleteProduct(id: string) {
    // Verificar que el producto existe
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      throw new Error('Producto no encontrado');
    }

    await prisma.product.delete({
      where: { id },
    });

    return { message: 'Producto eliminado exitosamente' };
  }
}
