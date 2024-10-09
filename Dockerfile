# Используем официальный образ Node.js
FROM node:20.0-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Устанавливаем переменную окружения для Vite
ENV VITE_PORT=3000

# Открываем порт для Vite
EXPOSE 3000

# Запускаем Vite с горячей перезагрузкой
CMD ["npm", "run", "dev"]
