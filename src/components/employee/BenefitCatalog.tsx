
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { benefitCategories } from '@/data/mockData';
import { formatNumber } from '@/lib/utils';

export function BenefitCatalog() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Каталог льгот</h1>
          <p className="text-gray-600">Обзор доступных категорий льгот</p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefitCategories.map((category) => {
          const usagePercent = (category.usedPoints / category.totalLimit) * 100;
          
          return (
            <Card key={category.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                    {category.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Использовано</span>
                      <span>{Math.round(usagePercent)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${usagePercent}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{formatNumber(category.usedPoints)}</span>
                      <span>{formatNumber(category.totalLimit)}</span>
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <p><strong>Партнеры:</strong> {category.providers.length}</p>
                    <p><strong>Доступно:</strong> {formatNumber(category.totalLimit - category.usedPoints)} баллов</p>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Подробнее
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
