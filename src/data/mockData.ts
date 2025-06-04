
import { BenefitCategory, Transaction, UserBenefitAllocation } from '@/types';

export const benefitCategories: BenefitCategory[] = [
  {
    id: 'dms',
    name: 'ДМС',
    icon: '🏥',
    description: 'Добровольное медицинское страхование',
    color: 'bg-gradient-to-br from-red-500 to-red-600',
    totalLimit: 50000,
    usedPoints: 15000,
    providers: [
      {
        id: 'sogaz',
        name: 'СОГАЗ-Мед',
        category: 'dms',
        description: 'Полис ДМС с широкой сетью клиник',
        logo: '/placeholder.svg',
        pointsRate: 1,
        minPoints: 5000,
        maxPoints: 50000
      }
    ]
  },
  {
    id: 'shopping',
    name: 'Покупка товаров',
    icon: '🛒',
    description: 'Покупка и доставка товаров из магазинов',
    color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    totalLimit: 25000,
    usedPoints: 8000,
    providers: [
      {
        id: 'ozon',
        name: 'Ozon',
        category: 'shopping',
        description: 'Интернет-магазин товаров',
        logo: '/placeholder.svg',
        pointsRate: 1.5,
        minPoints: 500,
        maxPoints: 10000
      }
    ]
  },
  {
    id: 'carsharing',
    name: 'Каршеринг',
    icon: '🚗',
    description: 'Аренда автомобилей',
    color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    totalLimit: 20000,
    usedPoints: 12000,
    providers: [
      {
        id: 'yandex-drive',
        name: 'Яндекс.Драйв',
        category: 'carsharing',
        description: 'Каршеринг в городе',
        logo: '/placeholder.svg',
        pointsRate: 2,
        minPoints: 200,
        maxPoints: 5000
      }
    ]
  },
  {
    id: 'taxi',
    name: 'Такси',
    icon: '🚕',
    description: 'Поездки на такси',
    color: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
    totalLimit: 15000,
    usedPoints: 8500,
    providers: [
      {
        id: 'yandex-taxi',
        name: 'Яндекс.Такси',
        category: 'taxi',
        description: 'Поездки по городу',
        logo: '/placeholder.svg',
        pointsRate: 2,
        minPoints: 100,
        maxPoints: 3000
      }
    ]
  },
  {
    id: 'travel',
    name: 'Авиа и ЖД билеты',
    icon: '✈️',
    description: 'Покупка авиа- и ж/д билетов',
    color: 'bg-gradient-to-br from-sky-500 to-sky-600',
    totalLimit: 40000,
    usedPoints: 5000,
    providers: [
      {
        id: 'rzd',
        name: 'РЖД',
        category: 'travel',
        description: 'Железнодорожные билеты',
        logo: '/placeholder.svg',
        pointsRate: 1,
        minPoints: 1000,
        maxPoints: 20000
      }
    ]
  },
  {
    id: 'hotels',
    name: 'Бронирование гостиниц',
    icon: '🏨',
    description: 'Бронирование отелей и гостиниц',
    color: 'bg-gradient-to-br from-pink-500 to-pink-600',
    totalLimit: 35000,
    usedPoints: 2000,
    providers: [
      {
        id: 'booking',
        name: 'Booking.com',
        category: 'hotels',
        description: 'Бронирование отелей',
        logo: '/placeholder.svg',
        pointsRate: 1,
        minPoints: 2000,
        maxPoints: 15000
      }
    ]
  },
  {
    id: 'gas-station-goods',
    name: 'Товары на АЗС',
    icon: '🛢️',
    description: 'Автомасла, автохимия, незамерзайка',
    color: 'bg-gradient-to-br from-gray-500 to-gray-600',
    totalLimit: 12000,
    usedPoints: 3500,
    providers: [
      {
        id: 'lukoil-shop',
        name: 'ЛУКОЙЛ Магазин',
        category: 'gas-station-goods',
        description: 'Товары на АЗС ЛУКОЙЛ',
        logo: '/placeholder.svg',
        pointsRate: 1.5,
        minPoints: 300,
        maxPoints: 5000
      }
    ]
  },
  {
    id: 'tire-service',
    name: 'Шиномонтаж',
    icon: '🔧',
    description: 'Услуги шиномонтажа',
    color: 'bg-gradient-to-br from-orange-500 to-orange-600',
    totalLimit: 8000,
    usedPoints: 1500,
    providers: [
      {
        id: 'tire-master',
        name: 'ШиноМастер',
        category: 'tire-service',
        description: 'Профессиональный шиномонтаж',
        logo: '/placeholder.svg',
        pointsRate: 1,
        minPoints: 500,
        maxPoints: 3000
      }
    ]
  },
  {
    id: 'car-wash',
    name: 'Мойка',
    icon: '🚿',
    description: 'Автомойка',
    color: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
    totalLimit: 6000,
    usedPoints: 2200,
    providers: [
      {
        id: 'clean-car',
        name: 'CleanCar',
        category: 'car-wash',
        description: 'Автомойка премиум класса',
        logo: '/placeholder.svg',
        pointsRate: 2,
        minPoints: 200,
        maxPoints: 1500
      }
    ]
  },
  {
    id: 'fuel',
    name: 'Топливо',
    icon: '⛽',
    description: 'Заправка топливом на АЗС',
    color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    totalLimit: 30000,
    usedPoints: 18000,
    providers: [
      {
        id: 'rosneft',
        name: 'Роснефть',
        category: 'fuel',
        description: 'Сеть АЗС Роснефть',
        logo: '/placeholder.svg',
        pointsRate: 1,
        minPoints: 500,
        maxPoints: 10000
      }
    ]
  },
  {
    id: 'food',
    name: 'Питание',
    icon: '🍽️',
    description: 'Доставка продуктов и готовой еды',
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
      },
      {
        id: 'perekrestok',
        name: 'Перекрёсток',
        category: 'food',
        description: 'Доставка продуктов',
        logo: '/placeholder.svg',
        pointsRate: 1,
        minPoints: 500,
        maxPoints: 5000
      }
    ]
  }
];

export const userAllocations: UserBenefitAllocation[] = [
  {
    categoryId: 'fuel',
    allocatedPoints: 15000,
    usedPoints: 8000,
    lastUpdated: new Date()
  },
  {
    categoryId: 'food',
    allocatedPoints: 12000,
    usedPoints: 9000,
    lastUpdated: new Date()
  },
  {
    categoryId: 'taxi',
    allocatedPoints: 8000,
    usedPoints: 5500,
    lastUpdated: new Date()
  },
  {
    categoryId: 'dms',
    allocatedPoints: 15000,
    usedPoints: 5000,
    lastUpdated: new Date()
  }
];

export const recentTransactions: Transaction[] = [
  {
    id: '1',
    userId: '1',
    categoryId: 'taxi',
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
  },
  {
    id: '3',
    userId: '1',
    categoryId: 'fuel',
    providerId: 'rosneft',
    points: 1500,
    amount: 1500,
    description: 'Заправка топливом',
    date: new Date(Date.now() - 259200000),
    status: 'completed'
  }
];
