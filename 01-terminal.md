# Dominá la terminal

Guía rápida de **tmux**, **Midnight Commander**, **nano** y **Neovim**. Los ejemplos usan una terminal tipo Bash o Zsh.

## Conceptos básicos de la shell

Antes de usar las herramientas del workshop conviene dominar estos comandos:

```bash
pwd                 # mostrar el directorio actual
ls                  # listar archivos
ls -la              # listar también archivos ocultos y detalles
cd proyecto         # entrar en un directorio
cd ..               # subir un nivel
mkdir demo          # crear un directorio
touch archivo.txt   # crear un archivo vacío
cp origen destino   # copiar
mv origen destino   # mover o renombrar
rm archivo.txt      # borrar un archivo (no pasa por la papelera)
clear               # limpiar la pantalla
history             # mostrar comandos anteriores
man ls              # abrir el manual de un comando
```

Atajos habituales de la shell:

- `Tab`: autocompletar nombres y comandos.
- `Ctrl+C`: interrumpir el proceso actual.
- `Ctrl+L`: limpiar la pantalla.
- `Ctrl+R`: buscar en el historial.
- `Ctrl+A` / `Ctrl+E`: ir al inicio / final de la línea.
- Flechas arriba y abajo: recorrer el historial.

> Cuidado: `rm` elimina sin confirmación ni papelera. Revisá siempre la ruta antes de ejecutarlo.

## tmux

`tmux` permite mantener varias terminales dentro de una sola sesión y conservar procesos activos aunque se cierre la ventana.

### Sesiones

```bash
tmux                         # crear una sesión nueva
tmux new -s workshop         # crear una sesión con nombre
tmux ls                      # listar sesiones
tmux attach -t workshop      # volver a una sesión
tmux detach                  # salir sin detener la sesión
tmux kill-session -t workshop # cerrar una sesión
```

Dentro de tmux, los atajos comienzan con el prefijo `Ctrl+B`: se presiona el prefijo, se suelta y luego se pulsa la otra tecla.

### Ventanas y paneles

| Atajo | Acción |
|---|---|
| `Ctrl+B`, `c` | Crear una ventana |
| `Ctrl+B`, `n` | Ventana siguiente |
| `Ctrl+B`, `p` | Ventana anterior |
| `Ctrl+B`, `0..9` | Ir a una ventana por número |
| `Ctrl+B`, `,` | Renombrar la ventana |
| `Ctrl+B`, `%` | Dividir verticalmente |
| `Ctrl+B`, `"` | Dividir horizontalmente |
| `Ctrl+B`, flechas | Cambiar de panel |
| `Ctrl+B`, `z` | Maximizar/restaurar el panel |
| `Ctrl+B`, `d` | Desconectarse de la sesión |
| `Ctrl+B`, `[` | Entrar en modo copia; `q` para salir |

Una organización útil para el workshop:

```text
ventana 1: editor
ventana 2: docker compose y logs
ventana 3: comandos y pruebas
```

## Midnight Commander

`mc` es un administrador de archivos de dos paneles que funciona dentro de la terminal.

```bash
mc                     # abrir Midnight Commander
mc /ruta/izquierda /ruta/derecha
mc -a                  # usar caracteres simples si hay problemas visuales
```

Atajos principales:

| Tecla | Acción |
|---|---|
| Flechas / `Enter` | Navegar y abrir |
| `Tab` | Cambiar de panel |
| `Insert` | Seleccionar un archivo |
| `F3` | Ver archivo |
| `F4` | Editar archivo |
| `F5` | Copiar |
| `F6` | Mover o renombrar |
| `F7` | Crear directorio |
| `F8` | Borrar |
| `F9` | Abrir el menú superior |
| `F10` | Salir |
| `Ctrl+O` | Ocultar/mostrar los paneles y ver la shell |

En algunas notebooks se necesita usar `Fn` junto con las teclas `F1`–`F10`.

## nano

`nano` es un editor sencillo. En su barra inferior, `^` significa `Ctrl` y `M-` significa `Alt`.

```bash
nano archivo.txt             # abrir o crear un archivo
nano +25 archivo.txt         # abrir en la línea 25
nano -l archivo.txt          # mostrar números de línea
nano -w archivo.txt          # no cortar líneas largas visualmente
```

Atajos principales:

| Atajo | Acción |
|---|---|
| `Ctrl+O` | Guardar; confirmar con `Enter` |
| `Ctrl+X` | Salir |
| `Ctrl+W` | Buscar texto |
| `Alt+W` | Repetir búsqueda |
| `Ctrl+\` | Buscar y reemplazar |
| `Ctrl+K` | Cortar la línea |
| `Ctrl+U` | Pegar lo cortado |
| `Alt+U` | Deshacer |
| `Alt+E` | Rehacer |
| `Alt+G` | Ir a una línea y columna |
| `Ctrl+G` | Abrir la ayuda |

## Neovim

Neovim es un editor modal: cada modo interpreta las teclas de manera distinta.

```bash
nvim archivo.txt       # abrir un archivo
nvim .                 # abrir el directorio actual
nvim +42 archivo.txt   # ir a la línea 42
nvim -d uno dos        # comparar dos archivos
```

### Modos esenciales

- `Esc`: volver al modo normal.
- `i`: insertar antes del cursor.
- `a`: insertar después del cursor.
- `v`: seleccionar caracteres.
- `V`: seleccionar líneas.
- `:`: escribir un comando de Neovim.

### Movimiento y edición

| Comando | Acción |
|---|---|
| `h j k l` | Izquierda, abajo, arriba, derecha |
| `w` / `b` | Palabra siguiente / anterior |
| `0` / `$` | Inicio / final de línea |
| `gg` / `G` | Inicio / final del archivo |
| `42G` | Ir a la línea 42 |
| `dd` | Cortar una línea |
| `yy` | Copiar una línea |
| `p` | Pegar después del cursor |
| `u` | Deshacer |
| `Ctrl+R` | Rehacer |
| `/texto` | Buscar; `n` y `N` avanzan y retroceden |
| `:%s/viejo/nuevo/g` | Reemplazar en todo el archivo |

### Guardado, ventanas y pestañas

```vim
:w              " guardar
:q              " salir
:wq             " guardar y salir
:q!             " salir descartando cambios
:split archivo  " división horizontal
:vsplit archivo " división vertical
:tabnew archivo " abrir una pestaña
:terminal       " abrir una terminal integrada
```

Para cambiar de ventana se usa `Ctrl+W` y después una flecha o `h`, `j`, `k`, `l`.

### Plugins

Los plugins dependen del gestor instalado. Con `lazy.nvim`, una configuración mínima en `~/.config/nvim/init.lua` suele declarar plugins en una tabla y luego ejecutar:

```vim
:Lazy           " abrir el administrador
:Lazy sync      " instalar, actualizar y limpiar plugins
:Lazy update    " actualizar plugins
:checkhealth    " diagnosticar Neovim y proveedores
```

Plugins frecuentes:

- `telescope.nvim`: búsqueda de archivos y texto.
- `nvim-treesitter`: resaltado y análisis de sintaxis.
- `nvim-lspconfig`: integración con servidores de lenguaje.
- `nvim-cmp`: autocompletado.
- `gitsigns.nvim`: cambios de Git en el margen.

## Instalación orientativa

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install tmux mc nano neovim

# macOS con Homebrew
brew install tmux midnight-commander nano neovim

# Windows con winget (PowerShell)
winget install Neovim.Neovim
```

En Windows, tmux y muchas herramientas Unix se usan cómodamente desde WSL. Midnight Commander, nano y tmux se instalan dentro de la distribución Linux elegida.

