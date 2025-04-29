# 32-Bit Proje

```bash
https://github.com/aalibyrm/32-Bit-Proje
```

Bir monorepo proje yapısı içerisinde React + Vite tabanlı bir oyun lobisi ve sohbet uygulaması ile Express + Socket.io sunucusunu barındırır.

## Özellikler

- Gerçek zamanlı lobi oluşturma ve katılma
- Etkinlik tipi lobilerde başlangıç ve bitiş zamanına göre otomatik temizleme
- Şifreli lobilere katılma
- Kullanıcı girişi & Remember Me (JWT tabanlı hızlı giriş)
- Dark/Light tema desteği (MUI)
-Session ile oturum kontrolü
-Alert bildirimleri

## Gereksinimler

- Node.js v18+ ve npm v9+

## Kurulum

1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/aalibyrm/32-Bit-Proje.git
   cd 32-Bit-Proje
   ```
2. Proje bağımlılıklarını yükleyin:
   ```bash
   npm install
   ```
3. Ortam değişkenlerini ayarlayın (server/.env):
   ```bash
   cp packages/game-hub/server/.env.example packages/game-hub/server/.env
   # veya direkt .env dosyasını açıp güncelleyin:
   SESSION_SECRET=ultra-gizli-session-key
   JWT_SECRET=mega-gizli-token-key
   ```

## Geliştirme Modu

Aşağıdaki komutları ayrı iki terminalde çalıştırın:

- **Sunucu**
  ```bash
  cd packages/game-hub/server
  npm run dev
  ```
- **İstemci**
  ```bash
  cd packages/game-hub
  npm run dev
  ```

- İstemci varsayılan olarak `http://localhost:5173`
- Sunucu varsayılan olarak `http://localhost:4000`

## Proje Yapısı

```
32-Bit-Proje/
├── packages/
│   └── game-hub/
│       ├── public/            # Statik varlıklar (favicon, resimler vb.)
│       ├── src/               # React bileşenleri, sayfalar, tema vb.
│       ├── server/            # Express + Socket.io API
│       │   ├── index.js
│       │   ├── users.js
│       │   └── .env           # Ortam değişkenleri
│       ├── package.json       # Frontend bağımlılıkları ve scriptler
│       └── README.md          # (Bu dosya)
├── package.json               # Monorepo root (workspaces)
├── lerna.json                 # Lerna konfigürasyonu
└── package-lock.json          # Kilit dosyası
```
