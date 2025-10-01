# JDIH Frontend (React + Vite)

## Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Jalankan development server:
   ```bash
   npm run dev
   ```
3. Build untuk production:
   ```bash
   npm run build
   ```

## Production dengan Docker

### Build & Run dengan Docker Compose

1. Pastikan Docker & docker-compose sudah terinstall.
2. Edit file `docker-compose.yml` jika perlu (default port 3000 di host).
3. Build & jalankan container:
   ```bash
   docker-compose up --build -d
   ```
4. Aplikasi akan tersedia di http://localhost:3000

### Struktur Docker

- Build React app di container Node.js
- Hasil build (`dist/`) disajikan oleh Nginx di container production
- Volume `/home/admin01/ui-jdih` di server akan berisi hasil build statis

### Stop & Remove

```bash
docker-compose down
```

---

## Plugins

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
