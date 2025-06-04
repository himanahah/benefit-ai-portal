
import { BenefitCategory, Transaction, UserBenefitAllocation } from '@/types';

export const benefitCategories: BenefitCategory[] = [
  {
    id: 'transport',
    name: 'Транспорт',
    icon: '🚗',
    description: 'Каршеринг, такси, топливо',
    color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    totalLimit: 15000,
    usedPoints: 8500,
    providers: [
      {
        id: 'yandex-taxi',
        name: 'Яндекс.Такси',
        category: 'transport',
        description: 'Поездки по городу',
        logo: '/placeholder.svg',
        pointsRate: 2,
        minPoints: 100,
        maxPoints: 5000
      }
    ]
  },
  {
    id: 'food',
    name: 'Питание',
    icon: '🍽️',
    description: 'Рестораны, доставка еды',
    color: 'bg-gradient-to-br from-green-500 to-green-600',
    totalLimit: 20000,
    usedPoints: 12000,
    providers: [
      {
        id: 'delivery-club',
        name: 'Delivery Club',
        category: 'food',
        description: 'Доставка еды',
        logo: '/placeholder.svg',
        pointsRate: 1.5,
        minPoints: 200,
        maxPoints: 3000
      }
    ]
  },
  {
    id: 'health',
    name: 'Здоровье',
    icon: '🏥',
    description: 'ДМС, фитнес, wellness',
    color: 'bg-gradient-to-br from-red-500 to-red-600',
    totalLimit: 30000,
    usedPoints: 5000,
    providers: []
  },
  {
    id: 'education',
    name: 'Образование',
    icon: '📚',
    description: 'Курсы, тренинги, книги',
    color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    totalLimit: 25000,
    usedPoints: 3000,
    providers: []
  },
  {
    id: 'entertainment',
    name: 'Развлечения',
    icon: '🎭',
    description: 'Кино, театры, концерты',
    color: 'bg-gradient-to-br from-orange-500 to-orange-600',
    totalLimit: 10000,
    usedPoints: 2500,
    providers: []
  }
];

export const userAllocations: UserBenefitAllocation[] = [
  {
    categoryId: 'transport',
    allocatedPoints: 8000,
    usedPoints: 5500,
    lastUpdated: new Date()
  },
  {
    categoryId: 'food',
    allocatedPoints: 12000,
    usedPoints: 9000,
    lastUpdated: new Date()
  },
  {
    categoryId: 'health',
    allocatedPoints: 5000,
    usedPoints: 1000,
    lastUpdated: new Date()
  }
];

export const recentTransactions: Transaction[] = [
  {
    id: '1',
    userId: '1',
    categoryId: 'transport',
    providerId: 'yandex-taxi',
    points: 500,
    amount: 250,
    description: 'Поездка до офиса',
    date: new Date(Date.now() - 86400000),
    status: 'completed'
  },
  {
    id: '2',
    userId: '1',
    categoryId: 'food',
    providerId: 'delivery-club',
    points: 800,
    amount: 533,
    description: 'Заказ обеда',
    date: new Date(Date.now() - 172800000),
    status: 'completed'
  }
];
