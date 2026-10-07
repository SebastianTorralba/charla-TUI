# Observabilidad

Primero levantá `../02-docker-compose`. Luego:

```bash
cd ejemplos/03-observabilidad
docker compose up -d
curl http://localhost:8080/metrics
```

Abrí Prometheus en <http://localhost:9090> y Grafana en <http://localhost:3001> (`admin` / `admin`). La fuente Prometheus ya está configurada. Creá un panel con `workshop_http_requests_total`.

```bash
btop
lazydocker
docker stats
docker compose logs -f prometheus grafana
```

