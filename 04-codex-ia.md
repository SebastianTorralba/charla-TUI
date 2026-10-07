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

