const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Administrador',
      role: 'ADMIN'
    }
  });
  console.log('✅ Admin creado:', admin.email);

  
  const userPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.create({
    data: {
      email: 'usuario@example.com',
      password: userPassword,
      name: 'Usuario Normal',
      role: 'USER'
    }
  });
  console.log('✅ Usuario creado:', user.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
