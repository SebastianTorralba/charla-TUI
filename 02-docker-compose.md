# Levantá tu stack con Docker Compose

Docker empaqueta aplicaciones en contenedores. Docker Compose describe varios servicios —por ejemplo frontend, backend y base de datos— en un único archivo YAML.

## Verificar la instalación

```bash
docker --version
docker compose version
docker info
docker run --rm hello-world
```

En Windows y macOS normalmente se usa Docker Desktop. En Linux se puede usar Docker Engine con el plugin de Compose.

## Comandos básicos de Docker

```bash
docker image ls                       # listar imágenes
docker container ls                   # contenedores activos
docker container ls -a                # todos los contenedores
docker pull nginx:alpine              # descargar una imagen
docker run --name web -p 8080:80 -d nginx:alpine
docker logs web                       # mostrar logs
docker logs -f web                    # seguir logs en vivo
docker exec -it web sh                # abrir una shell en el contenedor
docker inspect web                    # mostrar configuración detallada
docker stats                          # consumo de CPU, RAM y red
docker stop web                       # detener
docker start web                      # volver a iniciar
docker rm web                         # borrar un contenedor detenido
docker image rm nginx:alpine          # borrar una imagen sin uso
```

Significado de opciones comunes:

- `-d`: ejecutar en segundo plano.
- `--name`: asignar un nombre.
- `-p 8080:80`: publicar el puerto 80 del contenedor en el 8080 local.
- `-v origen:destino`: montar un volumen o directorio.
- `-e CLAVE=valor`: definir una variable de entorno.
- `--rm`: borrar el contenedor al terminar.
- `-it`: habilitar una terminal interactiva.

## Ejemplo de `compose.yaml`

```yaml
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "8080:8080"
    environment:
      DATABASE_URL: postgres://app:secreto@db:5432/app
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:17-alpine
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: secreto
      POSTGRES_DB: app
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app -d app"]
      interval: 5s
      timeout: 3s
      retries: 10

volumes:
  postgres_data:
```

Dentro de la red de Compose, el backend accede a PostgreSQL mediante el hostname `db`, no `localhost`.

## Flujo diario con Compose

```bash
docker compose config                 # validar y mostrar la configuración final
docker compose build                  # construir imágenes
docker compose up                     # iniciar y ver logs
docker compose up -d                  # iniciar en segundo plano
docker compose up -d --build          # reconstruir e iniciar
docker compose ps                     # ver estado de servicios
docker compose logs                   # logs de todo el stack
docker compose logs -f backend        # seguir un servicio
docker compose exec backend sh        # shell dentro del backend
docker compose restart backend        # reiniciar un servicio
docker compose stop                   # detener sin borrar contenedores
docker compose down                   # detener y borrar contenedores y red
docker compose down -v                # también borra volúmenes y sus datos
```

> `docker compose down -v` elimina los datos persistidos en los volúmenes del proyecto. Usalo solamente cuando realmente quieras reiniciar la base desde cero.

## Variables de entorno

Compose lee automáticamente un archivo `.env` ubicado junto a `compose.yaml`:

```dotenv
POSTGRES_USER=app
POSTGRES_PASSWORD=cambiar-en-desarrollo
POSTGRES_DB=app
```

Se referencia así:

```yaml
environment:
  POSTGRES_USER: ${POSTGRES_USER}
  POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
```

No subas secretos reales al repositorio. Agregá `.env` a `.gitignore` y compartí un `.env.example` sin credenciales.

## Diagnóstico rápido

```bash
docker compose ps -a
docker compose logs --tail=100 backend
docker compose exec db pg_isready -U app
docker compose top
docker system df
```

Si un puerto está ocupado, cambiá solo el puerto izquierdo de `"8080:8080"`, por ejemplo `"8081:8080"`.

