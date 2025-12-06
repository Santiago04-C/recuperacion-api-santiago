// Script de seed para poblar la base de datos con datos de prueba
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Limpiar datos existentes
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Crear usuarios de prueba
  const hashedPassword = await bcrypt.hash('123456', 10);

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@local.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  const normalUser = await prisma.user.create({
    data: {
      email: 'user@local.com',
      password: hashedPassword,
      name: 'Normal User',
      role: 'USER',
    },
  });

  console.log('✅ Usuarios creados:', { adminUser, normalUser });

  // Crear productos de prueba
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Laptop HP',
        description: 'Laptop de alta gama con procesador Intel i7',
        price: 1299.99,
        stock: 5,
        userId: adminUser.id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Mouse Logitech',
        description: 'Mouse inalámbrico ergonómico',
        price: 29.99,
        stock: 50,
        userId: normalUser.id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Teclado Mecánico',
        description: 'Teclado mecánico RGB con switches Cherry MX',
        price: 149.99,
        stock: 20,
        userId: normalUser.id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Monitor 27"',
        description: 'Monitor 4K UHD de 27 pulgadas',
        price: 399.99,
        stock: 10,
        userId: adminUser.id,
      },
    }),
  ]);

  console.log('✅ Productos creados:', products.length);

  console.log('🎉 Seed completado exitosamente!');
  console.log('\n📝 Credenciales de prueba:');
  console.log('Admin: admin@local.com / 123456');
  console.log('User: user@local.com / 123456');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
