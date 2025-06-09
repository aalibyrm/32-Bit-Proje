# Game Hub - Lerna Monorepo

```bash
https://github.com/aalibyrm/32-Bit-Proje
```

Lerna ile yönetilen monorepo yapısında React + Vite tabanlı oyun lobisi ve çeşitli oyunları barındıran proje.

## Özellikler

- **Game Hub**: Ana oyun lobisi ve yönetim sistemi
- **Tombala**: Bağımsız tombala oyunu paketi (Git submodule olarak yönetilir)
- **Modüler Yapı**: Her oyun ayrı paket/submodule olarak geliştirilebilir
- Gerçek zamanlı lobi oluşturma ve katılma
- Kullanıcı girişi & JWT tabanlı hızlı giriş
- Dark/Light tema desteği (MUI)
- Session ile oturum kontrolü
- Alert bildirimleri

## Gereksinimler

- Node.js v18+ ve npm v9+
- Lerna v8+

## Kurulum

1. Depoyu klonlayın (submodule'lar dahil):
   ```bash
   git clone --recursive https://github.com/aalibyrm/32-Bit-Proje.git
   cd 32-Bit-Proje
   ```

2. Lerna ile paketleri kurun:
   ```bash
   npm install
   ```

3. Tüm paketleri paralel çalıştırın
   ```bash
   cd packages
   npm run dev
   ```

4. Serverı çalıştırın
```bash
   cd packages/game-hub/server
   npm run dev
   ```


### Sadece Game Hub çalıştırma:
```bash
npm run dev:game-hub
```

### Sadece Tombala oyunu çalıştırma:
```bash
npm run dev:tombala
```

### Ayrı terminallerde çalıştırma:
- **Game Hub Sunucu**
  ```bash
  cd packages/game-hub/server
  npm run dev
  ```
- **Game Hub İstemci**
  ```bash
  cd packages/game-hub
  npm run dev
  ```

- Game Hub: `http://localhost:5173`
- Server: `http://localhost:4000`

## Proje Yapısı

```
Game-Hub/
├── packages/
│   ├── game-hub/             # Ana oyun lobisi
│   │   ├── public/           # Statik varlıklar
│   │   ├── src/              # React bileşenleri
│   │   ├── server/           # Express + Socket.io API
│   │   └── package.json
│   │
│   ├── tombala/              # Tombala oyunu paketi (submodule)
│   │   ├── src/              # Tombala bileşenleri
│   │   ├── package.json
│   │   └── vite.config.js
│   │
│   └── [future-games]/       # Gelecekteki oyunlar buraya
│
├── package.json              # Root monorepo konfigürasyonu
├── lerna.json                # Lerna konfigürasyonu
└── README.md                 # Bu dosya
```

## Lerna Komutları

```bash
# Yeni bağımlılık ekle
lerna add [package] --scope=[target-package]

# Tüm paketleri build et
npm run build

# Paketleri temizle
npm run clean

# Versiyon bump ve publish
npm run publish
```

## Yeni Oyun Ekleme

1. Yeni paket oluştur:
   ```bash
   mkdir packages/[oyun-adi]
   cd packages/[oyun-adi]
   npm init
   ```

2. Package.json'da isim formatı:
   ```json
   {
     "name": "@gamehub/[oyun-adi]",
     "version": "1.0.0"
   }
   ```

3. Game-hub'a bağımlılık ekle:
   ```bash
   lerna add @gamehub/[oyun-adi] --scope=game-hub
   ```

## Submodule Yönetimi

Tombala oyunu ayrı bir Git repository'si olarak yönetilir ve bu projeye submodule olarak eklenir:

### Submodule Güncelleme
```bash
# Tombala submodule'unu en son sürüme güncelle
git submodule update --remote packages/tombala

# Değişiklikleri commit et
git add packages/tombala
git commit -m "Update tombala submodule"
```

### Yeni Submodule Ekleme
```bash
# Yeni oyun submodule'u ekle
git submodule add https://github.com/aalibyrm/[oyun-repo].git packages/[oyun-adi]
```

### Submodule İçinde Çalışma
```bash
# Submodule dizinine gir
cd packages/tombala

# Normal git işlemleri yap
git checkout main
git pull origin main

# Ana projeye geri dön ve güncelle
cd ../..
git add packages/tombala
git commit -m "Update tombala to latest version"
```
