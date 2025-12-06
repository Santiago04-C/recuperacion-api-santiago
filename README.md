# 🚀 API RESTful - Next.js 14 + TypeScript

**Proyecto de Recuperación - Desarrollo Web Full Stack**

API RESTful completa con autenticación JWT, autorización por roles, y bases de datos duales (PostgreSQL + MongoDB).

---

## ⚡ Inicio Rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar base de datos
npx prisma generate
npx prisma migrate dev
npx ts-node prisma/seed.ts

# 3. Iniciar servidor
npm run dev
```

**Servidor**: http://localhost:3000

---

## 📋 Endpoints de la API

### Autenticación (Públicos)
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión (retorna JWT)

### Usuario Autenticado (Requiere Token)
- `GET /api/auth/me` - Obtener información del usuario actual

### Productos
- `GET /api/products` - Listar todos (público)
- `GET /api/products/:id` - Obtener por ID (público)
- `POST /api/products` - Crear producto (requiere USER o ADMIN)
- `PUT /api/products/:id` - Actualizar producto (requiere propietario o ADMIN)
- `DELETE /api/products/:id` - Eliminar producto (requiere ADMIN)

### Logs (MongoDB)
- `POST /api/logs` - Crear log (requiere autenticación)
- `GET /api/logs` - Obtener logs (requiere autenticación)

---

## 👥 Usuarios de Prueba

Después de ejecutar el seed:

```
Admin:
  Email: admin@local.com
  Password: 123456
  Rol: ADMIN

Usuario Normal:
  Email: user@local.com
  Password: 123456
  Rol: USER
```

---

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz:

```env
# SQLite (desarrollo local)
DATABASE_URL="file:./dev.db"

# MongoDB
MONGODB_URI="mongodb://localhost:27017/nextjs_api"

# JWT Secret
JWT_SECRET="tu-clave-secreta-super-segura"

# Entorno
NODE_ENV="development"
```

### Para Producción (Vercel)

1. **PostgreSQL**: Usa [Neon](https://neon.tech) (gratis)
2. **MongoDB**: Usa [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (gratis)
3. Actualiza `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"  // Cambiar de sqlite
     url      = env("DATABASE_URL")
   }
   ```
4. Configura las variables de entorno en Vercel
5. Ejecuta migraciones:
   ```bash
   DATABASE_URL="tu-url-de-neon" npx prisma migrate deploy
   ```

---

## 🧪 Probar la API

### Con Postman

1. Importa `postman_collection.json`
2. Ejecuta "Login" con `admin@local.com` / `123456`
3. El token se guarda automáticamente
4. Prueba los demás endpoints

### Con cURL

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@local.com","password":"123456"}'

# Obtener mi información (usa el token del login)
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer TU_TOKEN_AQUI"

# Crear producto
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{"name":"Laptop","price":1299.99,"stock":10}'
```

---

## 📊 Tecnologías

- **Next.js 14+** - App Router
- **TypeScript** - Tipado estático
- **Prisma** - ORM para PostgreSQL/SQLite
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación
- **Zod** - Validación de datos
- **bcrypt** - Hash de contraseñas

---

## 📁 Estructura del Proyecto

```
├── app/
│   ├── api/
│   │   ├── auth/          # Autenticación (register, login, me)
│   │   ├── products/      # CRUD de productos
│   │   └── logs/          # Logs en MongoDB
│   ├── layout.tsx
│   └── page.tsx
├── controllers/           # Lógica de negocio
├── middlewares/           # Auth y autorización
├── validators/            # Validación con Zod
├── lib/                   # Clientes de BD (Prisma, MongoDB)
├── models/                # Modelos Mongoose
├── prisma/
│   ├── schema.prisma      # Schema de Prisma
│   └── seed.ts            # Datos de prueba
├── utils/                 # Utilidades (JWT, password, etc.)
├── middleware.ts          # Middleware global
├── .env                   # Variables de entorno
└── postman_collection.json
```

---

## 🔐 Seguridad

- ✅ Contraseñas hasheadas con bcrypt (10 rounds)
- ✅ JWT con expiración de 7 días
- ✅ Validación de datos con Zod
- ✅ Autorización por roles (USER, ADMIN)
- ✅ Middleware de autenticación en rutas protegidas

---

## 🚀 Scripts Disponibles

```bash
npm run dev              # Servidor de desarrollo
npm run build            # Build para producción
npm run start            # Servidor de producción

# Prisma
npm run prisma:generate  # Generar cliente
npm run prisma:migrate   # Ejecutar migraciones
npm run prisma:studio    # Abrir Prisma Studio (GUI)
npm run prisma:seed      # Ejecutar seed
```

---

## 📝 Modelos de Datos

### User (PostgreSQL/Prisma)
```typescript
{
  id: string (UUID)
  email: string (único)
  password: string (hasheado)
  name: string (opcional)
  role: "USER" | "ADMIN"
  products: Product[]
  createdAt: DateTime
  updatedAt: DateTime
}
```

### Product (PostgreSQL/Prisma)
```typescript
{
  id: string (UUID)
  name: string
  description: string (opcional)
  price: number
  stock: number
  userId: string
  user: User
  createdAt: DateTime
  updatedAt: DateTime
}
```

### Log (MongoDB/Mongoose)
```typescript
{
  _id: ObjectId
  action: string
  userId: string (opcional)
  details: string (opcional)
  ipAddress: string (opcional)
  timestamp: Date
}
```

---

## 🎯 Características Implementadas

- ✅ Autenticación completa (register, login, me)
- ✅ Autorización por roles (USER, ADMIN)
- ✅ CRUD completo de productos
- ✅ Logs de actividad en MongoDB
- ✅ Validación de datos con Zod
- ✅ Manejo de errores consistente
- ✅ Arquitectura MVC
- ✅ Middleware de autenticación y autorización
- ✅ Hash de contraseñas con bcrypt
- ✅ Respuestas API estandarizadas
- ✅ Listo para desplegar en Vercel

---

## 📄 Licencia

MIT

---

**Desarrollado con ❤️ para el proyecto de recuperación**
