# Тестовое задание для СеквойаяЛаб

## Используемые технологии
- Svelte Kit
- Tailwindcss, SkeletonUI
- Docker
- CI/CD
- Eslint, Prettier

## Описание проекта
- Реализована авторизация через логин/пароль
- Обновление токена доступа через интерцепторы запроса
- Получение данных опасных грузов
- Табличное представление данных, пагинация
- Детальный просмотр груза
- Написан CI/CD для сборки на удаленном сервере
- Сборка клиента осуществляется через Docker на Docker Registry

## Запуск проекта
- Установка зависимостей проекта (в корне проекта)  
`npm i --force`

- Для запуска в режиме отладки  
`npm run dev` - приложение будет доступно на http://localhost:3000/

- Сборка продакшн-приложения  
`npm run build`

- Сборка продакшн-приложения через Docker  
`docker build -t client .` - соберет docker-образ  
`docker run -d --name client_container client` - запустит контейнер со сборкой  
`docker cp client_container:/.svelte-kit/output/. /host-output-folder` - скопирует файлы клиента на хост-машину  