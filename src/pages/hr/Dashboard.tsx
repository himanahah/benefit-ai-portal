
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const HrOverview = () => {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">HR Дашборд</h1>
        <p className="text-gray-600">Обзор использования корпоративных льгот</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Использование бюджета</CardTitle>
            <span className="text-2xl">💰</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67%</div>
            <Progress value={67} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              2.4M из 3.6M рублей
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активных сотрудников</CardTitle>
            <span className="text-2xl">👥</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +12% за месяц
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Популярная льгота</CardTitle>
            <span className="text-2xl">🏆</span>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Топливо</div>
            <p className="text-xs text-muted-foreground">
              34% от всех трат
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Аномалии</CardTitle>
            <span className="text-2xl">⚠️</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-muted-foreground">
              Требуют внимания
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Top Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Топ-5 популярных льгот</CardTitle>
          <CardDescription>За последний месяц</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Топливо', usage: 85, amount: '1.2M ₽' },
              { name: 'Питание', usage: 72, amount: '890K ₽' },
              { name: 'Такси', usage: 45, amount: '650K ₽' },
              { name: 'ДМС', usage: 38, amount: '420K ₽' },
              { name: 'Путешествия', usage: 25, amount: '320K ₽' }
            ].map((benefit, index) => (
              <div key={benefit.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Badge variant="outline">{index + 1}</Badge>
                  <span className="font-medium">{benefit.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Progress value={benefit.usage} className="w-24" />
                  <span className="text-sm text-gray-600 min-w-[60px]">{benefit.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Быстрые действия</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-4">
              <div className="text-center">
                <div className="text-2xl mb-2">📊</div>
                <div>Экспорт отчёта</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-4">
              <div className="text-center">
                <div className="text-2xl mb-2">⚙️</div>
                <div>Настройка лимитов</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-4">
              <div className="text-center">
                <div className="text-2xl mb-2">📥</div>
                <div>Импорт данных</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HrOverview;
