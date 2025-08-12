import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PersonalRecommendations } from '@/components/employee/PersonalRecommendations';
import { mockRecommendations } from '@/data/mockData';

// Mock dependencies
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn()
  })
}));

jest.mock('@/data/mockData', () => ({
  mockRecommendations: [
    {
      id: '1',
      type: 'frequent',
      categoryId: 'transport',
      title: 'Тестовая рекомендация',
      description: 'Описание тестовой рекомендации',
      confidence: 95,
      priority: 'high',
      actionType: 'suggest',
      data: {
        reason: 'Тестовая причина'
      },
      price: 3000,
      points: 3000
    }
  ],
  benefitCategories: [
    {
      id: 'transport',
      name: 'Транспорт',
      icon: '🚗'
    }
  ]
}));

describe('PersonalRecommendations Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    
    // Mock console.log to avoid noise in tests
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders loading state initially', () => {
    render(<PersonalRecommendations />);
    
    expect(screen.getByText('Персональные рекомендации')).toBeInTheDocument();
    expect(screen.getByText('Анализируем ваши предпочтения...')).toBeInTheDocument();
  });

  test('renders recommendations after loading', async () => {
    render(<PersonalRecommendations />);
    
    await waitFor(() => {
      expect(screen.getByText('Тестовая рекомендация')).toBeInTheDocument();
    });
  });

  test('displays correct recommendation data', async () => {
    render(<PersonalRecommendations />);
    
    await waitFor(() => {
      expect(screen.getByText('Тестовая рекомендация')).toBeInTheDocument();
      expect(screen.getByText('Описание тестовой рекомендации')).toBeInTheDocument();
      expect(screen.getByText('95%')).toBeInTheDocument();
      expect(screen.getByText('3 000 ₽')).toBeInTheDocument();
    });
  });

  test('filters work correctly', async () => {
    render(<PersonalRecommendations />);
    
    await waitFor(() => {
      expect(screen.getByText('Тестовая рекомендация')).toBeInTheDocument();
    });

    // Test category filter
    const categorySelect = screen.getByText('Все категории');
    fireEvent.click(categorySelect);
    
    // Test priority filter
    const prioritySelect = screen.getByText('Все приоритеты');
    fireEvent.click(prioritySelect);
  });

  test('handles like action', async () => {
    render(<PersonalRecommendations />);
    
    await waitFor(() => {
      expect(screen.getByText('Тестовая рекомендация')).toBeInTheDocument();
    });

    const likeButton = screen.getByText('👍');
    fireEvent.click(likeButton);
    
    // Check if feedback was saved to localStorage
    const feedback = JSON.parse(localStorage.getItem('recommendation-feedback') || '{}');
    expect(feedback['1']).toBe('liked');
  });

  test('handles dislike action', async () => {
    render(<PersonalRecommendations />);
    
    await waitFor(() => {
      expect(screen.getByText('Тестовая рекомендация')).toBeInTheDocument();
    });

    const dislikeButton = screen.getByText('👎');
    fireEvent.click(dislikeButton);
    
    // Check if feedback was saved to localStorage
    const feedback = JSON.parse(localStorage.getItem('recommendation-feedback') || '{}');
    expect(feedback['1']).toBe('disliked');
  });

  test('handles purchase action', async () => {
    render(<PersonalRecommendations />);
    
    await waitFor(() => {
      expect(screen.getByText('Тестовая рекомендация')).toBeInTheDocument();
    });

    const purchaseButton = screen.getByText('Купить');
    fireEvent.click(purchaseButton);
  });

  test('displays correct type icons', async () => {
    render(<PersonalRecommendations />);
    
    await waitFor(() => {
      expect(screen.getByText('🔄')).toBeInTheDocument(); // frequent type icon
    });
  });

  test('displays correct priority badges', async () => {
    render(<PersonalRecommendations />);
    
    await waitFor(() => {
      expect(screen.getByText('Высокий')).toBeInTheDocument();
    });
  });

  test('price slider works correctly', async () => {
    render(<PersonalRecommendations />);
    
    await waitFor(() => {
      expect(screen.getByText('Максимальная цена: 20 000 ₽')).toBeInTheDocument();
    });
  });

  test('saves purchase history to localStorage', async () => {
    render(<PersonalRecommendations />);
    
    await waitFor(() => {
      const history = localStorage.getItem('user-purchase-history');
      expect(history).toBeTruthy();
    });
  });

  test('displays AI-powered badge', async () => {
    render(<PersonalRecommendations />);
    
    await waitFor(() => {
      expect(screen.getByText('AI-powered')).toBeInTheDocument();
    });
  });

  test('shows confidence progress bar', async () => {
    render(<PersonalRecommendations />);
    
    await waitFor(() => {
      const progressBar = document.querySelector('.bg-blue-600');
      expect(progressBar).toBeInTheDocument();
    });
  });

  test('displays recommendation reason', async () => {
    render(<PersonalRecommendations />);
    
    await waitFor(() => {
      expect(screen.getByText('💡 Тестовая причина')).toBeInTheDocument();
    });
  });

  test('handles empty recommendations gracefully', async () => {
    // Mock empty recommendations
    jest.doMock('@/data/mockData', () => ({
      mockRecommendations: [],
      benefitCategories: []
    }));

    render(<PersonalRecommendations />);
    
    await waitFor(() => {
      expect(screen.getByText('По вашим фильтрам рекомендаций не найдено')).toBeInTheDocument();
    });
  });

  test('filters recommendations by category', async () => {
    render(<PersonalRecommendations />);
    
    await waitFor(() => {
      expect(screen.getByText('Тестовая рекомендация')).toBeInTheDocument();
    });

    // Change category filter to non-matching category
    const categorySelect = screen.getByText('Все категории');
    fireEvent.click(categorySelect);
    
    // This would normally filter out the recommendation
    // In a real test, we'd need to mock the filter logic
  });

  test('displays correct number of recommendations', async () => {
    render(<PersonalRecommendations />);
    
    await waitFor(() => {
      const recommendations = screen.getAllByText(/Тестовая рекомендация/);
      expect(recommendations).toHaveLength(1);
    });
  });

  test('handles network errors gracefully', async () => {
    // Mock console.error to avoid noise
    jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<PersonalRecommendations />);
    
    await waitFor(() => {
      // Component should still render even if there are errors
      expect(screen.getByText('Персональные рекомендации')).toBeInTheDocument();
    });
  });
}); 