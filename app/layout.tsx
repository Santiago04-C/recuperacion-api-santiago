// Layout raíz de Next.js
export const metadata = {
  title: 'API RESTful - Next.js',
  description: 'API RESTful con Next.js, TypeScript, Prisma y MongoDB',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
