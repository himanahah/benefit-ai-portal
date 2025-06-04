
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Recommendation {
  id: string;
  type: 'optimization' | 'alert' | 'suggestion';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  actionable: boolean;
}

const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    type: 'optimization',
    title: 'Увеличить лимит на транспорт для отдела продаж',
    description: 'Анализ показывает, что сотрудники отдела продаж исчерпывают лимит на транспорт на 23% раньше других отделов. Рекомендуется увеличить лимит на 15%.',
    impact: 'high',
    confidence: 87,
    actionable: true
  },
  {
    id: '2',
    type: 'alert',
    title: 'Аномальная активность пользователя',
    description: 'Пользователь ivan.petrov@company.com потратил 150% от обычной суммы за последние 7 дней. Рекомендуется проверить транзакции.',
    impact: 'high',
    confidence: 94,
    actionable: true
  },
  {
    id: '3',
    type: 'suggestion',
    title: 'Низкая популярность категории "Здоровье"',
    description: 'Только 23% сотрудников используют льготы категории "Здоровье". Возможно, стоит добавить больше партнёров или пересмотреть условия.',
    impact: 'medium',
    confidence: 76,
    actionable: false
  }
];

const AiInsights = () => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'optimization': return 'bg-blue-100 text-blue-800';
      case 'alert': return 'bg-red-100 text-red-800';
      case 'suggestion': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'optimization': return 'Оптимизация';
      case 'alert': return 'Предупреждение';
      case 'suggestion': return 'Предложение';
      default: return type;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactText = (impact: string) => {
    switch (impact) {
      case 'high': return 'Высокий';
      case 'medium': return 'Средний';
      case 'low': return 'Низкий';
      default: return impact;
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">ИИ-рекомендации</h1>
          <p className="text-gray-600">Персонализированные советы на основе анализа данных</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="secondary">Beta</Badge>
          <Button variant="outline">
            Обновить анализ
          </Button>
        </div>
      </div>

      {/* Beta Notice */}
      <Alert>
        <AlertDescription>
          🤖 Функция находится в бета-тестировании. Рекомендации генерируются с помощью машинного обучения и требуют проверки специалистом.
        </AlertDescription>
      </Alert>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Всего рекомендаций</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-gray-600">+3 новых</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Высокий приоритет</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <div className="text-sm text-gray-600">Требуют внимания</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Применено</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">8</div>
            <div className="text-sm text-gray-600">За последний месяц</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Эффективность</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <div className="text-sm text-gray-600">Точность предсказаний</div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Активные рекомендации</CardTitle>
          <CardDescription>
            Персонализированные советы для оптимизации системы льгот
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockRecommendations.map((rec) => (
              <div key={rec.id} className="border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <Badge className={getTypeColor(rec.type)}>
                      {getTypeText(rec.type)}
                    </Badge>
                    <Badge className={getImpactColor(rec.impact)}>
                      Влияние: {getImpactText(rec.impact)}
                    </Badge>
                    <Badge variant="outline">
                      Уверенность: {rec.confidence}%
                    </Badge>
                  </div>
                  {rec.actionable && (
                    <Button size="sm">
                      Применить
                    </Button>
                  )}
                </div>

                <h3 className="font-semibold text-lg mb-2">{rec.title}</h3>
                <p className="text-gray-600 mb-4">{rec.description}</p>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Подробнее
                    </Button>
                    <Button variant="outline" size="sm">
                      Отклонить
                    </Button>
                  </div>
                  <div className="text-sm text-gray-500">
                    ID: {rec.id}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ML Model Info */}
      <Card>
        <CardHeader>
          <CardTitle>Информация о модели</CardTitle>
          <CardDescription>
            Технические детали алгоритма машинного обучения
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2">Алгоритм</h4>
              <p className="text-sm text-gray-600">Random Forest + LSTM</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Последнее обучение</h4>
              <p className="text-sm text-gray-600">15.01.2024 03:00</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Точность</h4>
              <p className="text-sm text-gray-600">89.3% на тестовых данных</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AiInsights;
