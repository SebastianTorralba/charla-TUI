# Práctica de terminal

## nano

```bash
cd ejemplos/01-terminal/nano
nano notas.txt
```

Buscá `PENDIENTE` con `Ctrl+W`, reemplazalo con `Ctrl+\`, cortá y pegá una línea con `Ctrl+K` y `Ctrl+U`, guardá con `Ctrl+O` y salí con `Ctrl+X`.

## Neovim

```bash
cd ejemplos/01-terminal/nvim
nvim relato.md
```

Buscá `TODO` con `/TODO`, avanzá con `n`, editá con `i`, copiá y pegá líneas con `yy` y `p`, deshacé con `u` y guardá con `:wq`.

## Midnight Commander

```bash
cd ejemplos/01-terminal
mc
```

Abrí `origen/` y `destino/` en paneles diferentes. Copiá `presentacion.txt` con `F5`, renombralo con `F6` y creá una carpeta con `F7`.

## tmux

```bash
tmux new -s workshop
```

Abrí Neovim en una ventana, creá otra con `Ctrl+B`, `c`, ejecutá `watch -n 2 date`, desconectate con `Ctrl+B`, `d` y regresá con `tmux attach -t workshop`.

