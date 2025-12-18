
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Probando conexión a SQLite...');
  
  
  await prisma.$connect();
  console.log('✅ Conectado a SQLite');
  
  
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: 'hashed_password',
      name: 'Usuario Test'
    }
  });
  console.log('✅ Usuario creado:', user);
  
  
  const users = await prisma.user.findMany();
  console.log('✅ Usuarios en DB:', users);
  
  
  const count = await prisma.user.count();
  console.log('✅ Total usuarios:', count);
}

main()
  .catch(e => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });