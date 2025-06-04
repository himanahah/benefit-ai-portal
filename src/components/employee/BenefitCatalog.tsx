
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { benefitCategories, userAllocations } from '@/data/mockData';
import { formatNumber } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export function BenefitCatalog() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [allocations, setAllocations] = useState(
    userAllocations.reduce((acc, allocation) => {
      acc[allocation.categoryId] = allocation.allocatedPoints;
      return acc;
    }, {} as Record<string, number>)
  );

  const totalAllocated = Object.values(allocations).reduce((sum, value) => sum + value, 0);
  const remainingPoints = (user?.pointsBalance || 0) - totalAllocated;

  const handleAllocationChange = (categoryId: string, value: number) => {
    setAllocations(prev => ({
      ...prev,
      [categoryId]: value
    }));
  };

  const handleSaveAllocations = () => {
    toast({
      title: "Распределение сохранено",
      description: `Баллы успешно распределены по категориям.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Каталог льгот</h1>
          <p className="text-gray-600">Распределите баллы по категориям</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Доступно баллов</p>
          <p className={`text-2xl font-bold ${remainingPoints < 0 ? 'text-red-600' : 'text-green-600'}`}>
            {formatNumber(remainingPoints)}
          </p>
        </div>
      </div>

      <Tabs defaultValue="allocate" className="space-y-6">
        <TabsList>
          <TabsTrigger value="allocate">Распределить баллы</TabsTrigger>
          <TabsTrigger value="browse">Обзор льгот</TabsTrigger>
        </TabsList>

        <TabsContent value="allocate" className="space-y-6">
          {/* Allocation Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Распределение баллов</CardTitle>
              <CardDescription>
                Настройте, сколько баллов хотите потратить на каждую категорию
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {benefitCategories.map((category) => {
                const currentAllocation = allocations[category.id] || 0;
                const maxAllocation = Math.min(category.totalLimit, remainingPoints + currentAllocation);
                
                return (
                  <div key={category.id} className="space-y-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                          {category.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold">{category.name}</h3>
                          <p className="text-sm text-gray-600">{category.description}</p>
                        </div>
                      </div>
                      <Badge variant="outline">
                        Лимит: {formatNumber(category.totalLimit)}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Распределить баллов</Label>
                        <span className="text-sm font-medium">
                          {formatNumber(currentAllocation)}
                        </span>
                      </div>
                      <Slider
                        value={[currentAllocation]}
                        onValueChange={([value]) => handleAllocationChange(category.id, value)}
                        max={maxAllocation}
                        step={100}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>0</span>
                        <span>{formatNumber(maxAllocation)}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        value={currentAllocation}
                        onChange={(e) => handleAllocationChange(category.id, Number(e.target.value))}
                        max={maxAllocation}
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        onClick={() => handleAllocationChange(category.id, maxAllocation)}
                        disabled={maxAllocation === 0}
                      >
                        Максимум
                      </Button>
                    </div>
                  </div>
                );
              })}

              <div className="flex justify-between items-center pt-4 border-t">
                <div>
                  <p className="text-sm text-gray-600">Итого распределено</p>
                  <p className="font-semibold">{formatNumber(totalAllocated)} баллов</p>
                </div>
                <Button 
                  onClick={handleSaveAllocations}
                  disabled={remainingPoints < 0}
                  className="min-w-[140px]"
                >
                  Сохранить
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="browse" className="space-y-6">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
