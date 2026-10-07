# Programá con Codex desde la terminal

Codex puede inspeccionar un proyecto, explicar código, proponer cambios, editar archivos y ejecutar verificaciones. La calidad del resultado depende mucho del contexto y de una consigna verificable.

> La interfaz y los comandos disponibles pueden variar según la versión instalada. Usá `codex --help` y la ayuda interactiva como referencia principal.

## Comenzar

```bash
cd ruta/al/proyecto
git status
codex
```

Comandos de descubrimiento:

```bash
codex --help
codex --version
```

Es recomendable iniciar Codex desde la raíz del repositorio para que pueda entender su estructura sin incluir directorios ajenos.

## Cómo dar contexto

Una consigna eficaz incluye:

- **Objetivo:** qué resultado se busca.
- **Alcance:** archivos o componentes involucrados.
- **Restricciones:** tecnologías, compatibilidad y cosas que no deben cambiar.
- **Criterio de aceptación:** cómo comprobar que quedó bien.

Ejemplo:

```text
Agregá un endpoint GET /health al backend Express.
Debe responder 200 con {"status":"ok"}.
No cambies las rutas existentes.
Agregá una prueba y ejecutá la suite del backend.
```

Para tareas grandes, conviene avanzar por etapas:

```text
1. Inspeccioná la arquitectura y explicame dónde implementarías esto.
2. Implementá solamente el backend.
3. Ejecutá las pruebas y corregí los errores relacionados.
4. Mostrame un resumen del diff y los riesgos pendientes.
```

## Contexto persistente del repositorio

Un archivo `AGENTS.md` puede documentar instrucciones para trabajar en el proyecto:

```markdown
# Instrucciones del repositorio

- Backend: Node.js 22 y TypeScript.
- Ejecutar pruebas con `npm test` desde `backend/`.
- No modificar migraciones ya aplicadas.
- Mantener los mensajes de error en español.
- Antes de finalizar, ejecutar lint, tests y build.
```

Incluí convenciones estables, no detalles pasajeros. Las consignas específicas siguen perteneciendo al pedido de cada tarea.

## Pedidos útiles

### Entender el código

```text
Explicá el flujo de autenticación desde la ruta HTTP hasta la consulta a la base.
Indicá archivos y funciones relevantes.
```

### Diagnosticar

```text
El backend devuelve 500 al crear un usuario. Inspeccioná logs y código,
reproducí el error si es posible y explicá la causa. Todavía no modifiques archivos.
```

### Implementar

```text
Implementá paginación en GET /users con page y limit.
Validá valores inválidos, conservá compatibilidad y agregá pruebas.
```

### Revisar

```text
Revisá los cambios actuales como en un code review.
Priorizá errores, seguridad y regresiones. Citá archivo y línea.
```

## Comandos y permisos

Codex puede proponer o ejecutar comandos para inspeccionar y validar el proyecto. Antes de aprobar uno, revisá:

- qué programa se ejecutará;
- en qué directorio;
- qué archivos o servicios puede modificar;
- si accede a la red;
- si elimina datos o altera una base.

Ejemplos habituales de verificación:

```bash
git status --short
git diff
npm test
npm run lint
npm run build
docker compose config
docker compose up -d --build
docker compose logs --tail=100 backend
```

Separá ambientes y credenciales. No pegues tokens o contraseñas en el chat ni los guardes en archivos versionados.

## Skills

Una skill reúne instrucciones, recursos y flujos especializados para una clase de tarea. Puede indicar cómo crear una presentación, trabajar con una planilla, diagnosticar un crash o aplicar convenciones internas.

Buenas prácticas:

- Usá una skill cuando el trabajo coincida con su especialidad.
- Leé qué alcance y herramientas requiere.
- Mantené cada skill enfocada en un flujo concreto.
- Guardá ejemplos reutilizables, validaciones y criterios de calidad.
- No uses una skill como reemplazo de una consigna clara.

Ejemplo de pedido:

```text
Usá la skill de documentos para crear una guía del workshop en formato DOCX.
Conservá los bloques de código y verificá visualmente el resultado.
```

## MCP

MCP (Model Context Protocol) permite conectar Codex con herramientas y fuentes externas mediante servidores MCP. Por ejemplo:

- Figma: consultar diseños y componentes.
- Jira: leer issues y contexto de trabajo.
- Bases de datos: inspeccionar esquemas o ejecutar consultas autorizadas.

El flujo general es:

1. Instalar o definir el servidor MCP.
2. Configurar el comando, transporte o URL del servidor.
3. Proveer credenciales mediante variables de entorno o un almacén seguro.
4. Reiniciar o recargar Codex.
5. Verificar que las herramientas del servidor estén disponibles.
6. Conceder solamente los permisos necesarios.

Ejemplos de pedidos una vez configurada la integración:

```text
Leé el issue PROY-123 de Jira y resumí los criterios de aceptación.
No hagas cambios en Jira.
```

```text
Inspeccioná el frame de login en Figma y comparalo con el componente LoginForm.
Enumerá diferencias antes de editar código.
```

```text
Consultá el esquema de la base y explicá la relación entre users y sessions.
No ejecutes escrituras.
```

En integraciones externas, empezá con acceso de solo lectura. Las escrituras —crear issues, modificar diseños o ejecutar `INSERT`, `UPDATE` y `DELETE`— deben ser explícitas y revisadas.

## Ciclo recomendado

```text
describir → inspeccionar → acordar alcance → modificar → probar → revisar diff
```

Antes de cerrar una tarea, pedí un resumen que indique archivos cambiados, pruebas ejecutadas, resultados y riesgos pendientes.

---

## Guion de introducción a Codex CLI

Para esta demostración conviene preparar de antemano un cambio pequeño en Git y una conversación guardada. Así se pueden mostrar `/diff`, `/review`, `/compact` y `/resume` sin gastar el tiempo del workshop implementando una funcionalidad completa.

### Comandos iniciales

Conservar este orden durante la exposición:

| Orden | Comando | Uso |
|---:|---|---|
| 1 | `/init` | Generar un borrador de `AGENTS.md` para el proyecto. |
| 2 | `/status` | Inspeccionar la configuración de la sesión y el consumo de tokens. El contexto de la conversación no es lo mismo que las cuotas de la cuenta. |
| 3 | `/plan` | Activar la planificación antes de implementar. |
| 4 | `/diff` | Mostrar el diff de Git, incluidos los archivos sin seguimiento. |
| 5 | `/review` | Solicitar una revisión de los cambios y posibles problemas. |
| 6 | `/model` | Seleccionar modelo y nivel de razonamiento cuando estén disponibles. |
| 7 | `/compact` | Resumir una conversación larga para liberar espacio de contexto. |
| 8 | `/resume` | Recuperar una conversación guardada. |
| 9 | `/quit` | Salir de la CLI. |

Mostrá primero `/` para abrir el menú y confirmar los comandos disponibles en la versión instalada.

## Contexto exacto y edición del prompt

Usá `@` para buscar archivos e insertar sus rutas en el prompt. Una mención orienta a Codex, pero no significa que todo el repositorio se cargue completo en el contexto. Indicá expresamente qué debe leer:

```text
Leé @AGENTS.md, @docs/api.md, @docs/arquitectura.md,
@compose.yaml y @backend/src/tasks.js.

Explicá el flujo actual de creación de tareas. No modifiques archivos.
```

Los archivos pertinentes suelen ser:

- el contrato de la API;
- las reglas de arquitectura;
- `compose.yaml`;
- la implementación correspondiente al backend elegido;
- las migraciones o el esquema de la base, si cambia persistencia.

### Comparación de prompts

Un pedido ambiguo:

```text
Agregá prioridades.
```

Un requerimiento verificable:

```text
Agregá prioridad a las tareas: baja, media o alta.
Si no se informa, usá media.
Las tareas existentes deben seguir funcionando y mostrar media.
Una prioridad inválida debe devolver HTTP 400.
La prioridad debe guardarse en la base elegida y mostrarse en el frontend.
Leé el contrato, la implementación y AGENTS.md.
Primero presentá un plan; todavía no modifiques archivos.
```

La segunda versión define valores aceptados, comportamiento por defecto, validación, persistencia, interfaz y compatibilidad.

### Editar prompts extensos

`/vim` activa edición con modos Vim dentro del compositor del prompt cuando está disponible. No edita archivos del proyecto: esos archivos se modifican con nano, Neovim o mediante los cambios realizados por Codex.

También se puede usar un editor externo:

```bash
export VISUAL=nvim
codex
```

Dentro de la CLI, `Ctrl+G` abre el prompt en el editor configurado. Al guardar y cerrar se devuelve el texto al compositor. Para usar nano:

```bash
export VISUAL=nano
codex
```

Estos ejemplos funcionan en macOS, Linux y Ubuntu mediante WSL. Confirmá el atajo con la versión instalada.

## AGENTS.md: reglas arquitectónicas

`/init` genera un punto de partida. Hay que revisarlo y adaptarlo al stack elegido antes de tratarlo como regla del proyecto. Un buen `AGENTS.md` describe la arquitectura real, los límites de cambio y comandos que efectivamente funcionan.

Ejemplo:

```markdown
# Reglas del proyecto

- Mantener frontend, backend e infraestructura en sus carpetas actuales.
- Conservar las rutas y contratos existentes de la API.
- Persistir cambios en PostgreSQL y respetar las capas del backend.
- Mantener compatibilidad con tareas creadas antes del cambio.
- Ejecutar los comandos reales de pruebas, lint y build del repositorio.
- No agregar dependencias sin explicar su necesidad.
- No inventar archivos, resultados de pruebas ni decisiones de arquitectura.
```

Las instrucciones de directorios más específicos pueden acotar las reglas para una parte del proyecto. Codex carga instrucciones desde la raíz hacia el directorio de trabajo, de modo que las más cercanas pueden especializar el comportamiento. Después de modificar instrucciones, reiniciá la sesión para comprobar que se cargue la configuración esperada.

El contexto reduce suposiciones; no garantiza que no haya errores.

## Plan que continúa en el módulo 4

Usá el requerimiento completo de prioridades y pedí solamente un plan:

```text
Agregá prioridad a las tareas: baja, media o alta.
Si no se informa, usar media.
Las tareas existentes deben seguir funcionando y mostrar media.
Una prioridad inválida debe devolver HTTP 400.
La prioridad debe guardarse en la base elegida y mostrarse en el frontend.
Leé el contrato, la implementación y AGENTS.md.
Primero presentá un plan; todavía no modifiques archivos.
```

Revisá con el público:

- archivos afectados;
- cambios del contrato de API;
- validación de entradas;
- tratamiento de registros anteriores;
- estrategia de persistencia;
- cambios del frontend;
- pruebas y verificaciones propuestas.

Acordá el plan y dejá la implementación para el módulo siguiente.

# Módulo 4 · Desarrollo de software con Codex

**Duración:** 30 minutos.  
**Objetivo:** implementar el plan, reutilizar un procedimiento con skills, consultar una fuente externa mediante MCP y verificar el resultado.

| Bloque | Tiempo |
|---|---:|
| Controles y shortcuts | 4 min |
| Skills | 5 min |
| Implementación | 7 min |
| MCP | 7 min |
| Validación y revisión | 7 min |

## Controles y shortcuts

| Control | Acción |
|---|---|
| `/` | Abrir el menú de comandos. |
| `@` | Buscar archivos para mencionarlos. |
| `/permissions` | Consultar o ajustar permisos ofrecidos por la sesión. |
| `Ctrl+R` | Buscar en el historial de prompts. |
| `Ctrl+O` | Copiar la última respuesta terminada. |
| `Tab` mientras trabaja | Encolar el siguiente pedido. |
| `Enter` mientras trabaja | Incorporar instrucciones al turno actual. |
| `Ctrl+G` | Abrir el prompt en `$VISUAL`. |

Mostrá estos controles con la versión instalada: algunos dependen de la configuración de teclado o de la terminal.

## AGENTS.md, skills y MCP

Son tres funciones diferentes:

| Recurso | Función |
|---|---|
| `AGENTS.md` | Define reglas y límites permanentes del proyecto. |
| Skill | Aporta un procedimiento reutilizable para una clase de tarea. |
| Servidor MCP | Expone herramientas o recursos de una fuente externa. |

Un procedimiento escrito no demuestra que una herramienta se haya ejecutado. Pedí siempre resultados observados: comando o consulta, salida relevante y comprobaciones pendientes.

## Crear y utilizar un skill de validación

Crear `.agents/skills/validar-funcionalidad/SKILL.md` en el repositorio:

```markdown
---
name: validar-funcionalidad
description: Validar cambios funcionales del gestor de tareas contra sus criterios de aceptación.
---

Leer el requerimiento y AGENTS.md.
Identificar y ejecutar las verificaciones reales del proyecto.
Probar valores válidos, valor por defecto y valor inválido.
Comprobar compatibilidad con tareas existentes.
Consultar persistencia mediante el MCP disponible en modo de lectura.
Informar evidencia observada, fallas y comprobaciones pendientes.
```

La propiedad `description` ayuda a descubrir cuándo corresponde usarlo. Seleccionalo con `/skills` o invocalo directamente:

```text
$validar-funcionalidad
```

Si no aparece después de crearlo, reiniciá Codex. Este archivo es un skill local preparado para la demostración, no un skill instalado por esta guía.

## Implementar el plan de prioridades

Después de aprobar el plan:

```text
Implementá el plan acordado para agregar prioridades.
Respetá AGENTS.md y el stack elegido.
Conservá las rutas y el comportamiento anterior.
Al terminar, indicá archivos modificados y verificaciones ejecutadas.
```

Acompañá la implementación con una revisión breve de `/diff`. La compatibilidad con tareas antiguas puede resolverse con una migración, un valor por defecto durante la lectura u otra estrategia coherente con el stack. El comportamiento observable debe coincidir con lo acordado.

## MCP: conexión a herramientas externas

MCP puede conectar herramientas mediante:

- **STDIO:** Codex inicia y se comunica con un proceso local.
- **Streamable HTTP:** Codex se conecta con un servidor remoto mediante una URL.

Durante la demo configurá solamente el MCP de la base elegida y con permisos de lectura. Figma y Jira sirven como ejemplos; completar varias autenticaciones en vivo no entra cómodamente en siete minutos.

### MongoDB

Usar el servidor oficial `mongodb-mcp-server`, Node.js compatible con la versión fijada para el workshop y la cadena preparada en el entorno:

```bash
export MDB_MCP_CONNECTION_STRING='mongodb://usuario:clave@host/base'
codex mcp add mongodb -- npx -y mongodb-mcp-server --readOnly
```

No guardes la cadena real en el repositorio ni la muestres durante la presentación.

### PostgreSQL

Usar DBHub de Bytebase con una configuración probada. Configurá `readonly=true` para la herramienta `execute_sql`; no asumas que existe un flag `--readonly`. Complementá esta protección con un usuario PostgreSQL que tenga permisos reales de solo lectura.

### Figma y Atlassian

```bash
codex mcp add figma --url https://mcp.figma.com/mcp
codex mcp login figma

codex mcp add atlassian --url https://mcp.atlassian.com/v2/mcp
codex mcp login atlassian

codex mcp list
```

`login` se aplica a servidores que admiten OAuth y depende del acceso y permisos de la cuenta. Dentro de la TUI, `/mcp` permite inspeccionar conexiones activas.

### Consulta de práctica

```text
Usá el MCP de la base elegida para consultar una tarea nueva y una anterior
al cambio. Compará sus datos con la respuesta de la API. Informá la consulta
realizada y los valores observados.
```

Tener una conexión configurada no demuestra que la consulta se ejecutó; exigí evidencia observada.

## Validar comportamiento y revisar cambios

Lista de aceptación:

- Crear tareas con prioridad baja, media y alta: API y frontend muestran el valor pedido.
- Crear una tarea sin prioridad: se utiliza media.
- Enviar una prioridad inválida: la API responde HTTP 400.
- Listar una tarea antigua: sigue funcionando y muestra media.
- Consultar la base: el dato está persistido y los registros anteriores se tratan correctamente.
- Reiniciar el servicio y listar tareas: el resultado se conserva.

Cierre técnico:

```text
$validar-funcionalidad
```

Luego inspeccioná `/diff` y ejecutá `/review`. Separá claramente:

- problemas detectados;
- pruebas ejecutadas y sus resultados;
- validaciones pendientes.

Una revisión de código ayuda a encontrar errores. Las pruebas y la observación del sistema comprueban el comportamiento.

## Cierre del módulo

El participante debería poder mostrar:

1. qué pidió;
2. qué contexto entregó;
3. qué cambió;
4. qué evidencia respalda el resultado.

## Referencias oficiales

- [Codex Prompting Guide y carga de AGENTS.md](https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide)
- [Servidor MCP de documentación de OpenAI](https://developers.openai.com/learn/docs-mcp)
- [Skills y su relación con herramientas MCP](https://developers.openai.com/plugins/concepts/skills)
