# Build aşaması
FROM node:20-alpine AS builder

WORKDIR /app

# Sadece gerekli dosyaları kopyala
COPY package*.json ./
RUN npm install

# Tüm kodu kopyala ve derle
COPY . .
RUN npm run build

# Production aşaması
FROM node:20-alpine

WORKDIR /app

# Sadece production bağımlılıklarını kur
COPY package*.json ./
RUN npm install --omit=dev

# Derlenmiş dosyaları kopyala
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/dist/server ./dist/server

# Environment değişkenleri
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Uygulamayı başlat
# Not: Scripts kısmında "start" komutunun server'ı çalıştırdığından emin olunmalıdır
CMD ["node", "dist/server/server.js"]