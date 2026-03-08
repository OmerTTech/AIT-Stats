# AIT Stats - Full Stack Eğitim Yönetim Sistemi

Modern bir React + Node.js/Express + MongoDB full stack eğitim yönetim sistemi.

## 📁 Proje Yapısı

```
AIT_Stats/
├── fbfinalproject/     # Frontend (React) → Netlify/Vercel
└── backend/            # Backend (Node.js) → Render/Railway
```

## 🚀 Quick Start

### 1. Backend

```bash
cd backend
npm install

# .env dosyasını düzenle (MongoDB Atlas connection string)
# seed.js ile veritabanını doldur
node seed.js

npm start
```

### 2. Frontend

```bash
cd fbfinalproject
npm install
npm start
```

## 👤 Demo Hesaplar

| Rol | Email | Şifre |
|-----|-------|--------|
| Admin | admin@gmail.com | Admin123 |
| Teacher | teacher@gmail.com | Teacher123 |
| Student | user@gmail.com | User123 |

## 🌐 Deployment

### Backend (Render/Railway):
- Bu klasörü ayrı repo olarak GitHub'a push et
- Environment Variables: `MONGODB_URI`, `JWT_SECRET`
- Build Command: `npm install`
- Start Command: `npm start`

### Frontend (Netlify):
- `fbfinalproject/` klasörünü ayrı repo olarak GitHub'a push et
- Build: `npm run build`
- Publish: `build` klasörü

## 🔧 Environment Variables (Backend)

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ait-stats
JWT_SECRET=herhangi-bir-secret-key
PORT=5002
```
