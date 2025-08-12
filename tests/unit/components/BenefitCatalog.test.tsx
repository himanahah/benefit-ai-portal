import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BenefitCatalog } from '@/components/employee/BenefitCatalog';

// Mock dependencies
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn()
  })
}));

jest.mock('@/data/mockData', () => ({
  benefitCategories: [
    {
      id: 'transport',
      name: 'Транспорт',
      icon: '🚗',
      totalLimit: 50000,
      usedPoints: 15000
    },
    {
      id: 'food',
      name: 'Питание',
      icon: '🍕',
      totalLimit: 30000,
      usedPoints: 8000
    }
  ]
}));

describe('BenefitCatalog Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders benefit categories', () => {
    render(<BenefitCatalog />);
    
    expect(screen.getByText('Каталог льгот')).toBeInTheDocument();
    expect(screen.getByText('🚗 Транспорт')).toBeInTheDocument();
    expect(screen.getByText('🍕 Питание')).toBeInTheDocument();
  });

  test('displays category information correctly', () => {
    render(<BenefitCatalog />);
    
    expect(screen.getByText('35 000 ₽')).toBeInTheDocument(); // remaining points
    expect(screen.getByText('15 000 ₽')).toBeInTheDocument(); // used points
  });

  test('shows allocation limits from localStorage', () => {
    // Mock localStorage data
    const mockAllocations = {
      transport: 20000,
      food: 10000
    };
    localStorage.setItem('benefit-allocations', JSON.stringify(mockAllocations));
    
    render(<BenefitCatalog />);
    
    expect(screen.getByText('20 000 ₽')).toBeInTheDocument();
    expect(screen.getByText('10 000 ₽')).toBeInTheDocument();
  });

  test('handles category selection', () => {
    render(<BenefitCatalog />);
    
    const transportCard = screen.getByText('🚗 Транспорт').closest('.cursor-pointer');
    fireEvent.click(transportCard);
    
    // Verify selection state
    expect(transportCard).toHaveClass('ring-2');
  });

  test('displays progress bars correctly', () => {
    render(<BenefitCatalog />);
    
    const progressBars = document.querySelectorAll('[role="progressbar"]');
    expect(progressBars.length).toBeGreaterThan(0);
  });

  test('shows recommended benefits section', () => {
    render(<BenefitCatalog />);
    
    expect(screen.getByText('💡 Рекомендуемые для вас')).toBeInTheDocument();
    expect(screen.getByText('На основе вашей истории покупок')).toBeInTheDocument();
  });

  test('handles empty allocations gracefully', () => {
    render(<BenefitCatalog />);
    
    // Component should render without errors even with empty allocations
    expect(screen.getByText('Каталог льгот')).toBeInTheDocument();
  });

  test('displays category icons correctly', () => {
    render(<BenefitCatalog />);
    
    expect(screen.getByText('🚗')).toBeInTheDocument();
    expect(screen.getByText('🍕')).toBeInTheDocument();
  });

  test('shows remaining points calculation', () => {
    render(<BenefitCatalog />);
    
    // Should show remaining points (totalLimit - usedPoints)
    expect(screen.getByText('35 000 ₽')).toBeInTheDocument(); // 50000 - 15000
  });

  test('handles localStorage errors gracefully', () => {
    // Mock localStorage to throw error
    const originalGetItem = localStorage.getItem;
    localStorage.getItem = jest.fn(() => {
      throw new Error('Storage error');
    });
    
    render(<BenefitCatalog />);
    
    // Component should still render
    expect(screen.getByText('Каталог льгот')).toBeInTheDocument();
    
    // Restore original function
    localStorage.getItem = originalGetItem;
  });
}); 