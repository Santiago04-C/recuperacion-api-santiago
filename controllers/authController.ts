// Controlador de autenticación
import prisma from '@/lib/prisma';
import { hashPassword, comparePassword } from '@/utils/password';
import { signToken } from '@/utils/jwt';
import { RegisterInput, LoginInput } from '@/validators/authValidators';

export class AuthController {
  // Registro de usuario
  static async register(data: RegisterInput) {
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    // Hash de la contraseña
    const hashedPassword = await hashPassword(data.password);

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: data.role || 'USER',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    // Generar token
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return { user, token };
  }

  // Login de usuario
  static async login(data: LoginInput) {
    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // Verificar contraseña
    const isPasswordValid = await comparePassword(data.password, user.password);

    if (!isPasswordValid) {
      throw new Error('Credenciales inválidas');
    }

    // Generar token
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    };
  }
}
