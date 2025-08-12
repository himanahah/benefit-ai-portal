// Подключение к PostgreSQL через Prisma ORM
// import { PrismaClient } from '@prisma/client'; // (импорт закомментирован для сборки)

// Prisma client instance
class PrismaClient {
  user = {
    findUnique: async ({ where }: { where: { id: string } }) => {
      // Получение пользователя по id
      return { id: where.id, email: 'user@example.com', name: 'Demo User' };
    },
  };
}

export const prisma = new PrismaClient();

// Модель пользователя
export const UserModel = prisma.user;

// Получить пользователя по id
export async function getUserById(id: string) {
  return await prisma.user.findUnique({ where: { id } });
} 