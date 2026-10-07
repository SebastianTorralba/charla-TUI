# Modo Terminal: Código, Docker e IA

> Menos mouse. Más control.

Workshop práctico para desplegar una aplicación, observar su funcionamiento y desarrollar con IA desde la terminal.

**Duración:** 2 horas de práctica + bonus opcional  
**Sistemas:** Windows, macOS y Linux

## Contenidos

1. **Dominá la terminal:** tmux, Midnight Commander, nano y Neovim con plugins.
2. **Levantá tu stack:** frontend, backend y base de datos con Docker Compose.
3. **Observá lo que pasa:** recursos, logs y métricas con btop, lazydocker, Prometheus y Grafana.
4. **Programá con Codex:** contexto, comandos, `AGENTS.md`, skills e integración MCP.
5. **Bonus remoto:** SSH, SFTP, SCP, rsync y túneles.

## Guías

| Módulo | Guía | Temas principales |
|---|---|---|
| 1 | [Dominá la terminal](01-terminal.md) | Shell, tmux, Midnight Commander, nano y Neovim |
| 2 | [Docker Compose](02-docker-compose.md) | Imágenes, contenedores, servicios, redes y volúmenes |
| 3 | [Observabilidad](03-observabilidad.md) | btop, lazydocker, logs, Prometheus y Grafana |
| 4 | [Desarrollo con Codex](04-codex-ia.md) | CLI, prompts, contexto, `AGENTS.md`, skills y MCP |
| Bonus | [Trabajo remoto](05-remoto-bonus.md) | SSH, SFTP, SCP, rsync, tmux y túneles |

## Ejemplos prácticos

La carpeta [`ejemplos/`](ejemplos/README.md) contiene archivos preparados para acompañar las demostraciones:

```text
ejemplos/
├── 01-terminal/        textos y carpetas para practicar editores y TUI
├── 02-docker-compose/  frontend + backend + PostgreSQL
├── 03-observabilidad/  Prometheus + Grafana
├── 04-codex/           AGENTS.md, prompts y skill de validación
└── 05-remoto/          plantillas de SSH y SFTP
```

Cada carpeta tiene su propio `README.md` con instrucciones.

## Requisitos

### Esenciales

- Una terminal Bash o Zsh en Linux o macOS.
- Ubuntu mediante WSL para Windows.
- Git.
- Docker Engine con Docker Compose o Docker Desktop.
- Un editor de terminal: nano o Neovim.
- Codex CLI para el módulo de IA.

### Recomendados

- tmux.
- Midnight Commander (`mc`).
- btop.
- lazydocker.
- glow para renderizar Markdown.
- curl para probar la API.

Verificá las herramientas instaladas:

```bash
git --version
docker --version
docker compose version
node --version
codex --version
nvim --version
tmux -V
```

## Leer las guías en la terminal

La opción recomendada es [Glow](https://github.com/charmbracelet/glow):

```bash
glow README.md
glow -p 01-terminal.md
glow -p -s dark 04-codex-ia.md
```

También se pueden abrir con otras herramientas:

```bash
bat README.md
less README.md
nvim README.md
nano README.md
```

## Inicio rápido

### 1. Explorar la terminal

```bash
cd ejemplos/01-terminal
glow README.md
```

Práctica con nano:

```bash
cd nano
nano notas.txt
```

Práctica con Neovim:

```bash
cd ../nvim
nvim relato.md
```

### 2. Levantar la aplicación

```bash
cd ejemplos/02-docker-compose
cp .env.example .env
docker compose config
docker compose up -d --build
docker compose ps
```

Servicios disponibles:

| Servicio | Dirección |
|---|---|
| Frontend | <http://localhost:3000> |
| Backend | <http://localhost:8080> |
| PostgreSQL | `localhost:5432` |

Probar el backend:

```bash
curl http://localhost:8080/health
curl http://localhost:8080/api/message
curl http://localhost:8080/metrics
```

Observar logs:

```bash
docker compose logs -f backend
```

### 3. Agregar observabilidad

La aplicación del paso anterior debe continuar activa.

Desde la raíz del repositorio:

```bash
cd ejemplos/03-observabilidad
docker compose up -d
docker compose ps
```

Servicios adicionales:

| Servicio | Dirección | Credenciales de demostración |
|---|---|---|
| Prometheus | <http://localhost:9090> | No requiere |
| Grafana | <http://localhost:3001> | `admin` / `admin` |

En Grafana, la fuente Prometheus ya está configurada. Una consulta inicial es:

```promql
workshop_http_requests_total
```

### 4. Practicar con Codex

```bash
cd ejemplos/04-codex
codex
```

Secuencia sugerida:

1. Revisar `/status` y el menú `/`.
2. Leer `AGENTS.md`.
3. Ejecutar los prompts guardados en `prompts/`.
4. Planificar antes de modificar.
5. Inspeccionar `/diff`.
6. Ejecutar `/review`.
7. Invocar `$validar-funcionalidad` cuando corresponda.

El ejemplo incluye el skill local:

```text
.agents/skills/validar-funcionalidad/SKILL.md
```

## Detener los servicios

Observabilidad:

```bash
cd ejemplos/03-observabilidad
docker compose down
```

Aplicación:

```bash
cd ../02-docker-compose
docker compose down
```

Para borrar también los datos persistidos de la demostración:

```bash
docker compose down -v
```

> `docker compose down -v` elimina los volúmenes del proyecto y los datos de PostgreSQL. No lo ejecutes sobre un entorno con información que quieras conservar.

## Agenda sugerida

| Bloque | Actividad |
|---|---|
| Terminal | Navegación, tmux, archivos y editores |
| Docker | Construcción y ejecución del stack |
| Observabilidad | Procesos, contenedores, logs y métricas |
| Codex | Contexto, planificación, implementación y revisión |
| Bonus | Conexión y trabajo en servidores remotos |

En el módulo de Codex, una distribución posible para 30 minutos es:

| Actividad | Tiempo |
|---|---:|
| Controles y shortcuts | 4 min |
| Skills | 5 min |
| Implementación | 7 min |
| MCP | 7 min |
| Validación y revisión | 7 min |

## Estructura del repositorio

```text
.
├── README.md
├── 01-terminal.md
├── 02-docker-compose.md
├── 03-observabilidad.md
├── 04-codex-ia.md
├── 05-remoto-bonus.md
└── ejemplos/
```

## Recomendaciones para la demostración

- Descargá previamente las imágenes Docker para no depender de la conexión del aula.
- Prepará una sesión de Codex guardada y un cambio pequeño en Git.
- Verificá los shortcuts con la terminal y la versión de Codex instaladas.
- Usá credenciales y bases exclusivas para la demostración.
- Configurá integraciones MCP de base de datos en modo de solo lectura.
- Probá cada comando desde una copia limpia del repositorio.
- Aumentá el tamaño de fuente antes de proyectar.

## Seguridad

- No guardes tokens, claves privadas ni contraseñas reales en el repositorio.
- No uses credenciales de producción durante el workshop.
- Revisá los comandos antes de aprobar su ejecución.
- Confirmá rutas y volúmenes antes de borrar datos.
- Usá usuarios de base de datos con los permisos mínimos necesarios.

