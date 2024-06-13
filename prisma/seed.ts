const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Cleanup existing data
  await prisma.tournament.deleteMany({});
  await prisma.user.deleteMany({});

  // Define the users to be seeded
  const users = [
    { name: 'Admin User', email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { name: 'User One', email: 'user1@example.com', password: 'user123', role: 'user' },
    { name: 'User Two', email: 'user2@example.com', password: 'user123', role: 'user' },
    { name: 'User Three', email: 'user3@example.com', password: 'user123', role: 'user' },
    { name: 'User Four', email: 'user4@example.com', password: 'user123', role: 'user' },
    { name: 'User Five', email: 'user5@example.com', password: 'user123', role: 'user' },
    { name: 'User Six', email: 'user6@example.com', password: 'user123', role: 'user' },
  ];

  // Hash passwords and create users
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: user.role,
      },
    });
  }

  // Fetch the admin user's ID to use as createdBy for tournaments
  const adminUser = await prisma.user.findUnique({
    where: { email: 'admin@example.com' }
  });

  if (!adminUser) {
    throw new Error('Admin user not found.');
  }

  const tournaments = [
    { title: 'Tournament One', createdBy: adminUser.id },
    { title: 'Tournament Two', createdBy: adminUser.id },
    { title: 'Tournament Three', createdBy: adminUser.id },
    { title: 'Tournament Four', createdBy: adminUser.id },
    { title: 'Tournament Five', createdBy: adminUser.id },
    { title: 'Tournament Six', createdBy: adminUser.id },
  ];

  // Create tournaments
  for (const tournament of tournaments) {
    await prisma.tournament.create({
      data: {
        title: tournament.title,
        createdBy: tournament.createdBy,
      },
    });
  }

  console.log('Database has been seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
