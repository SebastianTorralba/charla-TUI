# Observá recursos, logs y métricas

Esta guía cubre **btop** para recursos del sistema, **lazydocker** para contenedores y **Grafana** para visualizar métricas.

## btop

`btop` muestra CPU, memoria, discos, red y procesos en una interfaz interactiva.

```bash
btop                 # iniciar
btop --utf-force     # forzar caracteres UTF-8
btop --debug         # generar información de diagnóstico
```

Teclas principales:

| Tecla | Acción |
|---|---|
| `q` | Salir |
| `Esc` / `m` | Abrir el menú |
| `h` | Mostrar ayuda |
| Flechas | Seleccionar procesos |
| `f` | Filtrar procesos |
| `/` | Buscar un proceso |
| `t` | Alternar vista de árbol |
| `k` | Enviar una señal al proceso seleccionado |
| `+` / `-` | Cambiar el intervalo de actualización |

Antes de terminar un proceso con `k`, confirmá el PID, el comando y el usuario propietario.

## lazydocker

`lazydocker` permite inspeccionar y operar contenedores, imágenes, volúmenes y servicios Compose desde una TUI.

```bash
lazydocker                    # abrir en el proyecto actual
lazydocker --file compose.yaml
lazydocker --project demo     # elegir un proyecto Compose
lazydocker --config /ruta/config.yml
```

Controles habituales:

| Tecla | Acción |
|---|---|
| Flechas / `h j k l` | Navegar |
| `Enter` | Abrir el elemento seleccionado |
| `[` / `]` | Cambiar de pestaña |
| `m` | Abrir el menú de comandos |
| `e` | Ejecutar una shell en un contenedor |
| `r` | Reiniciar |
| `s` | Detener |
| `d` | Eliminar; requiere confirmación |
| `q` | Volver o salir |
| `x` | Abrir el menú global |
| `?` | Mostrar todos los atajos disponibles |

Los atajos pueden cambiar entre versiones. `?` muestra la referencia válida para la instalación actual.

Para analizar un problema:

1. Revisá el estado de los servicios.
2. Seleccioná el contenedor y leé sus logs.
3. Observá CPU y memoria en la pestaña de estadísticas.
4. Abrí una shell solo si hace falta inspeccionar el entorno interno.

## Logs desde Docker

Aunque lazydocker facilita la navegación, estos comandos son útiles para automatizar y copiar resultados:

```bash
docker compose logs --tail=100
docker compose logs -f backend
docker compose logs --since=10m backend
docker logs --timestamps nombre-contenedor
docker stats --no-stream
```

## Grafana

Grafana consulta fuentes de datos y presenta métricas en dashboards. No almacena por sí sola las métricas de la aplicación: normalmente consulta Prometheus, Loki, PostgreSQL u otra fuente.

### Stack mínimo con Prometheus

Agregar a `compose.yaml`:

```yaml
services:
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    environment:
      GF_SECURITY_ADMIN_USER: admin
      GF_SECURITY_ADMIN_PASSWORD: admin
    volumes:
      - grafana_data:/var/lib/grafana

volumes:
  grafana_data:
```

Ejemplo de `prometheus.yml`:

```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: backend
    static_configs:
      - targets: ["backend:8080"]
```

La aplicación debe exponer métricas compatibles —habitualmente en `/metrics`— para que Prometheus pueda recolectarlas.

### Puesta en marcha

```bash
docker compose up -d prometheus grafana
docker compose ps
docker compose logs -f grafana
```

Después:

1. Abrí `http://localhost:3001`.
2. Ingresá con las credenciales configuradas.
3. En **Connections → Data sources**, agregá Prometheus.
4. Usá `http://prometheus:9090` como URL, porque ambos servicios comparten la red de Compose.
5. Creá un dashboard y agregá un panel con una consulta PromQL.

Consultas PromQL introductorias:

```promql
up
rate(http_requests_total[5m])
sum by (status) (rate(http_requests_total[5m]))
histogram_quantile(0.95, sum by (le) (rate(http_request_duration_seconds_bucket[5m])))
```

## Método simple de diagnóstico

- **Síntoma:** ¿qué ve la persona usuaria?
- **Estado:** ¿el contenedor está activo y saludable?
- **Logs:** ¿qué error aparece y desde cuándo?
- **Recursos:** ¿hay saturación de CPU, RAM, disco o red?
- **Métricas:** ¿qué cambió respecto del comportamiento normal?
- **Correlación:** compará timestamps entre aplicación, contenedor y dashboard.

