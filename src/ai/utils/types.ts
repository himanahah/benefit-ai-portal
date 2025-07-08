/**
 * Типы данных для AI/ML подсистемы
 * Используются во всех моделях и алгоритмах
 */

// Матрица взаимодействий пользователь-товар
export type UserItemMatrix = Record<string, Record<string, number>>; // { userId: { itemId: rating } }

// Рекомендация для пользователя
export interface Recommendation {
  itemId: string;
  score: number;
}

// Данные о льготе (benefit)
export interface BenefitData {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  popularity: number;
  [key: string]: any;
}

// TODO: Добавить типы для истории покупок, профиля пользователя и др. 