# 🤖 AI/ML Модели Benefit AI Portal

## Обзор системы рекомендаций

Система персональных рекомендаций Benefit AI Portal использует комбинацию классических алгоритмов машинного обучения и современных нейронных сетей для анализа поведения пользователей и генерации персонализированных предложений.

## Архитектура AI системы

```
┌─────────────────────────────────────────────────────────────┐
│                    AI Recommendation Engine                 │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Data      │  │  Feature    │  │   Model     │         │
│  │ Collection  │  │ Engineering │  │  Training   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ Collaborative│  │ Content-    │  │  Hybrid     │         │
│  │ Filtering   │  │ Based       │  │  Approach   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Real-time │  │  Batch      │  │  A/B        │         │
│  │  Inference  │  │  Processing │  │  Testing    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

## Алгоритмы рекомендаций

### 1. Collaborative Filtering (Коллаборативная фильтрация)

**Принцип работы:**
- Анализ поведения похожих пользователей
- Поиск паттернов в покупках
- Рекомендации на основе коллективного опыта

**Реализация:**
```python
# User-based Collaborative Filtering
class UserBasedCF:
    def __init__(self):
        self.user_item_matrix = None
        self.similarity_matrix = None
    
    def fit(self, user_item_data):
        # Создание матрицы пользователь-товар
        self.user_item_matrix = self._create_matrix(user_item_data)
        # Вычисление сходства пользователей
        self.similarity_matrix = cosine_similarity(self.user_item_matrix)
    
    def predict(self, user_id, item_id):
        # Нахождение похожих пользователей
        similar_users = self._find_similar_users(user_id)
        # Предсказание рейтинга
        return self._predict_rating(user_id, item_id, similar_users)
```

**Применение:**
- Рекомендации "Популярно в вашем отделе"
- Поиск похожих пользователей
- Группировка по интересам

### 2. Content-Based Filtering (Контентная фильтрация)

**Принцип работы:**
- Анализ характеристик льгот
- Сопоставление с предпочтениями пользователя
- Рекомендации похожих товаров

**Реализация:**
```python
# Content-Based Recommendation
class ContentBasedFilter:
    def __init__(self):
        self.item_features = None
        self.user_profiles = None
    
    def extract_features(self, benefits_data):
        # Извлечение признаков из описаний льгот
        tfidf = TfidfVectorizer(max_features=1000)
        self.item_features = tfidf.fit_transform(benefits_data['descriptions'])
    
    def build_user_profile(self, user_history):
        # Построение профиля пользователя
        user_items = self._get_user_items(user_history)
        self.user_profiles = self.item_features[user_items].mean(axis=0)
    
    def recommend(self, user_id, n_recommendations=5):
        # Вычисление сходства с профилем пользователя
        similarities = cosine_similarity(self.user_profiles[user_id], self.item_features)
        return self._get_top_items(similarities, n_recommendations)
```

**Применение:**
- Рекомендации "Похожие льготы"
- Персонализация по категориям
- Анализ предпочтений

### 3. Hybrid Approach (Гибридный подход)

**Принцип работы:**
- Комбинация collaborative и content-based методов
- Взвешенное усреднение результатов
- Повышение точности рекомендаций

**Реализация:**
```python
# Hybrid Recommendation System
class HybridRecommender:
    def __init__(self, collaborative_weight=0.6, content_weight=0.4):
        self.cf_model = UserBasedCF()
        self.cb_model = ContentBasedFilter()
        self.cf_weight = collaborative_weight
        self.cb_weight = content_weight
    
    def fit(self, user_item_data, benefits_data):
        # Обучение обеих моделей
        self.cf_model.fit(user_item_data)
        self.cb_model.extract_features(benefits_data)
    
    def predict(self, user_id, item_id):
        # Получение предсказаний от обеих моделей
        cf_score = self.cf_model.predict(user_id, item_id)
        cb_score = self.cb_model.predict(user_id, item_id)
        
        # Взвешенное усреднение
        hybrid_score = (self.cf_weight * cf_score + 
                       self.cb_weight * cb_score)
        return hybrid_score
```

**Применение:**
- Основной алгоритм рекомендаций
- Балансировка точности и разнообразия
- Адаптация к изменениям предпочтений

## Обработка данных

### Feature Engineering

**Временные признаки:**
- День недели покупки
- Месяц/сезон
- Частота покупок
- Время с последней покупки

**Категориальные признаки:**
- Отдел пользователя
- Категория льготы
- Тип льготы (разовая/подписка)

**Числовые признаки:**
- Стоимость льготы
- Количество баллов
- Оценка удовлетворенности
- Частота использования

### Нормализация данных

```python
# Стандартизация числовых признаков
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
numerical_features = scaler.fit_transform(numerical_data)

# One-hot encoding категориальных признаков
from sklearn.preprocessing import OneHotEncoder

encoder = OneHotEncoder(sparse=False)
categorical_features = encoder.fit_transform(categorical_data)
```

## Модели машинного обучения

### 1. Random Forest для классификации

**Назначение:** Определение вероятности покупки льготы

```python
from sklearn.ensemble import RandomForestClassifier

rf_model = RandomForestClassifier(
    n_estimators=100,
    max_depth=10,
    random_state=42
)

# Обучение модели
rf_model.fit(X_train, y_train)

# Предсказание вероятности
probabilities = rf_model.predict_proba(X_test)
```

### 2. Gradient Boosting для регрессии

**Назначение:** Предсказание рейтинга удовлетворенности

```python
from sklearn.ensemble import GradientBoostingRegressor

gb_model = GradientBoostingRegressor(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=6
)

# Обучение модели
gb_model.fit(X_train, y_train)

# Предсказание рейтинга
ratings = gb_model.predict(X_test)
```

### 3. Neural Network для персонализации

**Назначение:** Глубокое обучение паттернов пользователей

```python
import tensorflow as tf
from tensorflow.keras import layers, models

def create_recommendation_model(input_dim, output_dim):
    model = models.Sequential([
        layers.Dense(128, activation='relu', input_shape=(input_dim,)),
        layers.Dropout(0.3),
        layers.Dense(64, activation='relu'),
        layers.Dropout(0.2),
        layers.Dense(32, activation='relu'),
        layers.Dense(output_dim, activation='softmax')
    ])
    
    model.compile(
        optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
    return model

# Создание и обучение модели
model = create_recommendation_model(input_dim=50, output_dim=10)
model.fit(X_train, y_train, epochs=50, batch_size=32)
```

## Система обратной связи

### Online Learning

**Принцип работы:**
- Обновление моделей в реальном времени
- Адаптация к изменениям предпочтений
- Учет новых данных

```python
class OnlineLearningRecommender:
    def __init__(self):
        self.model = None
        self.feedback_buffer = []
    
    def update_model(self, user_feedback):
        # Добавление обратной связи в буфер
        self.feedback_buffer.append(user_feedback)
        
        # Обновление модели при накоплении данных
        if len(self.feedback_buffer) >= 100:
            self._retrain_model()
            self.feedback_buffer = []
    
    def _retrain_model(self):
        # Переобучение модели на новых данных
        new_data = self._prepare_training_data(self.feedback_buffer)
        self.model.partial_fit(new_data['X'], new_data['y'])
```

### A/B Testing Framework

**Структура тестирования:**
- Сравнение алгоритмов рекомендаций
- Измерение метрик эффективности
- Статистическая значимость результатов

```python
class ABTestingFramework:
    def __init__(self):
        self.variants = {}
        self.metrics = {}
    
    def add_variant(self, name, algorithm):
        self.variants[name] = algorithm
    
    def run_experiment(self, user_group, duration_days):
        # Распределение пользователей по вариантам
        user_assignments = self._assign_users_to_variants(user_group)
        
        # Сбор метрик в течение эксперимента
        for day in range(duration_days):
            daily_metrics = self._collect_daily_metrics(user_assignments)
            self._update_metrics(daily_metrics)
        
        # Анализ результатов
        return self._analyze_results()
```

## Оптимизация производительности

### Кэширование рекомендаций

```python
import redis
import pickle

class CachedRecommender:
    def __init__(self, redis_client):
        self.redis = redis_client
        self.cache_ttl = 3600  # 1 час
    
    def get_recommendations(self, user_id):
        cache_key = f"recommendations:{user_id}"
        
        # Попытка получить из кэша
        cached = self.redis.get(cache_key)
        if cached:
            return pickle.loads(cached)
        
        # Генерация новых рекомендаций
        recommendations = self._generate_recommendations(user_id)
        
        # Сохранение в кэш
        self.redis.setex(
            cache_key, 
            self.cache_ttl, 
            pickle.dumps(recommendations)
        )
        
        return recommendations
```

### Batch Processing

```python
class BatchRecommendationProcessor:
    def __init__(self, batch_size=1000):
        self.batch_size = batch_size
    
    def process_recommendations(self, user_ids):
        # Обработка пользователей батчами
        for i in range(0, len(user_ids), self.batch_size):
            batch = user_ids[i:i + self.batch_size]
            self._process_batch(batch)
    
    def _process_batch(self, user_batch):
        # Параллельная обработка батча
        with ThreadPoolExecutor(max_workers=4) as executor:
            futures = [
                executor.submit(self._generate_user_recommendations, user_id)
                for user_id in user_batch
            ]
            
            for future in as_completed(futures):
                recommendations = future.result()
                self._save_recommendations(recommendations)
```

## Мониторинг и логирование

### Метрики качества

**Точность рекомендаций:**
- Precision@K
- Recall@K
- F1-Score
- NDCG (Normalized Discounted Cumulative Gain)

**Пользовательские метрики:**
- Click-through rate (CTR)
- Conversion rate
- User satisfaction score
- Time spent on recommendations

### Система логирования

```python
import logging
import json
from datetime import datetime

class RecommendationLogger:
    def __init__(self):
        self.logger = logging.getLogger('recommendations')
        self.logger.setLevel(logging.INFO)
    
    def log_recommendation(self, user_id, recommendations, context):
        log_entry = {
            'timestamp': datetime.now().isoformat(),
            'user_id': user_id,
            'recommendations': recommendations,
            'context': context,
            'model_version': 'v1.2.0'
        }
        
        self.logger.info(json.dumps(log_entry))
    
    def log_feedback(self, user_id, recommendation_id, feedback_type):
        log_entry = {
            'timestamp': datetime.now().isoformat(),
            'user_id': user_id,
            'recommendation_id': recommendation_id,
            'feedback_type': feedback_type
        }
        
        self.logger.info(json.dumps(log_entry))
```

## Безопасность и приватность

### Анонимизация данных

```python
import hashlib

class DataAnonymizer:
    def __init__(self, salt):
        self.salt = salt
    
    def anonymize_user_id(self, user_id):
        # Хеширование ID пользователя
        return hashlib.sha256(
            f"{user_id}{self.salt}".encode()
        ).hexdigest()[:16]
    
    def anonymize_purchase_data(self, purchase_data):
        # Удаление персональной информации
        anonymized = purchase_data.copy()
        anonymized['user_id'] = self.anonymize_user_id(purchase_data['user_id'])
        anonymized.pop('email', None)
        anonymized.pop('phone', None)
        return anonymized
```

### Дифференциальная приватность

```python
import numpy as np

class DifferentialPrivacy:
    def __init__(self, epsilon=1.0):
        self.epsilon = epsilon
    
    def add_noise(self, data, sensitivity=1.0):
        # Добавление шума для защиты приватности
        noise = np.random.laplace(0, sensitivity / self.epsilon)
        return data + noise
    
    def aggregate_with_privacy(self, user_data):
        # Агрегация данных с защитой приватности
        aggregated = np.mean(user_data)
        return self.add_noise(aggregated)
```

## Заключение

Система AI рекомендаций Benefit AI Portal представляет собой комплексное решение, объединяющее современные алгоритмы машинного обучения с эффективной архитектурой обработки данных. Система обеспечивает персонализацию рекомендаций, адаптивность к изменениям предпочтений пользователей и высокую производительность при обработке больших объемов данных. 