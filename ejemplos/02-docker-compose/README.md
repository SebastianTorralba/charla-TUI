# Stack Docker Compose

Levanta un frontend en <http://localhost:3000>, un backend en <http://localhost:8080> y PostgreSQL en el puerto `5432`.

```bash
cd ejemplos/02-docker-compose
cp .env.example .env
docker compose config
docker compose up -d --build
docker compose ps
curl http://localhost:8080/health
curl http://localhost:8080/api/message
docker compose logs -f backend
```

Abrí `http://localhost:3000` y presioná el botón. Para explorar la base:

```bash
docker compose exec db psql -U workshop -d workshop
```

Detené todo con `docker compose down`. `docker compose down -v` también borra los datos.

