# Card Mover

Интерактивное приложение для работы с карточками на canvas. Позволяет перетаскивать карточки, выбирать их с помощью рамки выделения и управлять их положением на холсте.

## Технологии

### Core
- **Next.js 16.1.6** - React фреймворк с Server-Side Rendering
- **React 19.2.3** - библиотека для построения пользовательских интерфейсов
- **TypeScript 5** - типизированный JavaScript

### UI библиотеки
- **Material-UI (MUI) 7.3.7** - компонентная библиотека для React
- **@mui/icons-material** - набор иконок Material Design
- **Emotion** - CSS-in-JS библиотека для стилизации компонентов

### Canvas и графика
- **Konva 10.2.0** - библиотека для работы с 2D canvas
- **react-konva 19.2.2** - React обёртка для Konva

### State Management
- **Zustand 5.0.11** - легковесная библиотека для управления состоянием
- **Immer 11.1.3** - упрощение работы с иммутабельным состоянием

### Архитектура
Проект следует принципам **Feature-Sliced Design** (FSD):
- `entities/` - бизнес-сущности (card)
- `features/` - функциональности (card-canvas, card-list)
- `widgets/` - композитные блоки (dashboard)

## Установка и запуск

### Требования
- Node.js 20+
- pnpm (используется в проекте)

### Установка зависимостей

```bash
pnpm install
```

### Запуск в режиме разработки

```bash
pnpm dev
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)

### Сборка для production

```bash
pnpm build
```

### Запуск production сборки

```bash
pnpm start
```

### Линтинг

```bash
pnpm lint
```

## Структура проекта

```
src/
├── app/              # Next.js App Router
├── entities/         # Бизнес-сущности
│   └── card/         # Модели и UI карточек
├── features/         # Функциональные модули
│   ├── card-canvas/  # Canvas с перетаскиванием
│   └── card-list/    # Список карточек
├── widgets/          # Композитные блоки
│   └── dashboard/    # Главная страница
└── theme/            # Тема и стили
```
