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
    categoryId: 'dms',
    providerId: 'sogaz',
    description: 'Оплата ДМС',
    date: new Date('2024-06-01'),
    points: 5000,
    amount: 5000,
    status: 'completed',
  },
  {
    id: '2',
    userId: '1',
    categoryId: 'shopping',
    providerId: 'ozon',
    description: 'Покупка на Ozon',
    date: new Date('2024-05-28'),
    points: 2000,
    amount: 3000,
    status: 'completed',
  },
  {
    id: '3',
    userId: '1',
    categoryId: 'carsharing',
    providerId: 'yandex-drive',
    description: 'Аренда авто Яндекс.Драйв',
    date: new Date('2024-05-25'),
    points: 1200,
    amount: 1500,
    status: 'completed',
  },
  {
    id: '4',
    userId: '1',
    categoryId: 'taxi',
    providerId: 'yandex-taxi',
    description: 'Поездка на такси',
    date: new Date('2024-05-22'),
    points: 800,
    amount: 900,
    status: 'completed',
  },
  {
    id: '5',
    userId: '1',
    categoryId: 'travel',
    providerId: 'rzd',
    description: 'Покупка ЖД билета',
    date: new Date('2024-05-18'),
    points: 3000,
    amount: 3500,
    status: 'completed',
  },
  {
    id: '6',
    userId: '1',
    categoryId: 'hotels',
    providerId: 'booking',
    description: 'Бронирование отеля',
    date: new Date('2024-05-15'),
    points: 2500,
    amount: 4000,
    status: 'completed',
  },
  {
    id: '7',
    userId: '1',
    categoryId: 'gas-station-goods',
    providerId: 'lukoil-shop',
    description: 'Покупка автохимии',
    date: new Date('2024-05-12'),
    points: 600,
    amount: 700,
    status: 'completed',
  },
  {
    id: '8',
    userId: '1',
    categoryId: 'tire-service',
    providerId: 'tire-master',
    description: 'Шиномонтаж',
    date: new Date('2024-05-10'),
    points: 1000,
    amount: 1200,
    status: 'completed',
  },
  {
    id: '9',
    userId: '1',
    categoryId: 'car-wash',
    providerId: 'clean-car',
    description: 'Мойка авто',
    date: new Date('2024-05-07'),
    points: 400,
    amount: 500,
    status: 'completed',
  },
  {
    id: '10',
    userId: '1',
    categoryId: 'fuel',
    providerId: 'lukoil-shop',
    description: 'Заправка топливом',
    date: new Date('2024-05-04'),
    points: 1500,
    amount: 1800,
    status: 'completed',
  },
  {
    id: '21',
    userId: '1',
    categoryId: 'shopping',
    providerId: 'ozon',
    description: 'Покупка на Ozon (ожидание)',
    date: new Date('2024-06-02'),
    points: 1500,
    amount: 2200,
    status: 'pending',
  },
  {
    id: '22',
    userId: '1',
    categoryId: 'taxi',
    providerId: 'yandex-taxi',
    description: 'Поездка на такси (отклонено)',
    date: new Date('2024-05-30'),
    points: 700,
    amount: 800,
    status: 'failed',
  },
  {
    id: '23',
    userId: '1',
    categoryId: 'carsharing',
    providerId: 'yandex-drive',
    description: 'Аренда авто (ожидание)',
    date: new Date('2024-05-29'),
    points: 1000,
    amount: 1200,
    status: 'pending',
  },
  {
    id: '24',
    userId: '1',
    categoryId: 'dms',
    providerId: 'sogaz',
    description: 'Оплата ДМС (отклонено)',
    date: new Date('2024-05-27'),
    points: 5000,
    amount: 5000,
    status: 'failed',
  },
  {
    id: '25',
    userId: '1',
    categoryId: 'hotels',
    providerId: 'booking',
    description: 'Бронирование отеля (ожидание)',
    date: new Date('2024-05-26'),
    points: 2500,
    amount: 4000,
    status: 'pending',
  },
  {
    id: '26',
    userId: '1',
    categoryId: 'fuel',
    providerId: 'lukoil-shop',
    description: 'Заправка топливом (отклонено)',
    date: new Date('2024-05-24'),
    points: 1200,
    amount: 1500,
    status: 'failed',
  },
  {
    id: '27',
    userId: '1',
    categoryId: 'travel',
    providerId: 'rzd',
    description: 'Покупка билета (ожидание)',
    date: new Date('2024-05-21'),
    points: 3500,
    amount: 4000,
    status: 'pending',
  },
  {
    id: '28',
    userId: '1',
    categoryId: 'car-wash',
    providerId: 'clean-car',
    description: 'Мойка авто (отклонено)',
    date: new Date('2024-05-19'),
    points: 400,
    amount: 500,
    status: 'failed',
  },
  {
    id: '29',
    userId: '1',
    categoryId: 'gas-station-goods',
    providerId: 'lukoil-shop',
    description: 'Покупка автохимии (ожидание)',
    date: new Date('2024-05-16'),
    points: 600,
    amount: 700,
    status: 'pending',
  },
  {
    id: '30',
    userId: '1',
    categoryId: 'tire-service',
    providerId: 'tire-master',
    description: 'Шиномонтаж (отклонено)',
    date: new Date('2024-05-13'),
    points: 1000,
    amount: 1200,
    status: 'failed',
  },
];
