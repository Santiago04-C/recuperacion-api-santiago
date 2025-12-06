// Página principal
export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>API RESTful - Next.js 14+</h1>
      <p>API funcionando correctamente. Consulta la documentación en el README.md</p>
      
      <h2>Endpoints Disponibles:</h2>
      <ul>
        <li><strong>POST</strong> /api/auth/register - Registro de usuario</li>
        <li><strong>POST</strong> /api/auth/login - Login de usuario</li>
        <li><strong>GET</strong> /api/auth/me - Obtener usuario autenticado</li>
        <li><strong>GET</strong> /api/products - Obtener todos los productos</li>
        <li><strong>POST</strong> /api/products - Crear producto (requiere auth)</li>
        <li><strong>GET</strong> /api/products/[id] - Obtener producto por ID</li>
        <li><strong>PUT</strong> /api/products/[id] - Actualizar producto (requiere auth)</li>
        <li><strong>DELETE</strong> /api/products/[id] - Eliminar producto (requiere admin)</li>
        <li><strong>POST</strong> /api/logs - Crear log</li>
        <li><strong>GET</strong> /api/logs - Obtener logs</li>
      </ul>
    </main>
  )
}
