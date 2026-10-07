# Bonus: SSH, SFTP y trabajo remoto

SSH permite abrir una terminal segura en otro equipo. SFTP transfiere archivos a través de la misma infraestructura.

## Conectarse por SSH

```bash
ssh usuario@servidor               # conexión básica
ssh usuario@192.168.1.50           # conexión por IP
ssh -p 2222 usuario@servidor       # usar otro puerto
ssh -v usuario@servidor            # diagnóstico detallado
ssh usuario@servidor 'uptime'      # ejecutar un comando remoto
```

En la primera conexión se muestra la huella del servidor. Verificala con la persona administradora antes de aceptarla, especialmente en servidores públicos o productivos.

Dentro de la sesión remota se usan los mismos comandos de shell:

```bash
hostname
whoami
pwd
ls -la
df -h
free -h
uptime
exit
```

## Claves SSH

Crear una clave moderna:

```bash
ssh-keygen -t ed25519 -C "tu-correo@example.com"
```

El comando crea una clave privada y otra pública. Protegé la privada con una frase de contraseña y nunca la compartas.

Copiar la clave pública al servidor:

```bash
ssh-copy-id usuario@servidor
```

En sistemas sin `ssh-copy-id`, se puede mostrar la clave pública para copiarla por un canal autorizado:

```bash
cat ~/.ssh/id_ed25519.pub
```

Usar el agente SSH:

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
ssh-add -l
```

## Configuración por alias

El archivo `~/.ssh/config` evita repetir parámetros:

```sshconfig
Host taller
    HostName servidor.example.com
    User estudiante
    Port 22
    IdentityFile ~/.ssh/id_ed25519
```

Después basta con:

```bash
ssh taller
sftp taller
scp archivo.txt taller:/tmp/
```

Los permisos recomendados en Linux y macOS son:

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/config ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
```

## Transferencias con SFTP

```bash
sftp usuario@servidor
sftp -P 2222 usuario@servidor
```

Comandos dentro de SFTP:

| Comando | Acción |
|---|---|
| `pwd` / `lpwd` | Ruta remota / local |
| `ls` / `lls` | Listar remoto / local |
| `cd` / `lcd` | Cambiar directorio remoto / local |
| `get archivo` | Descargar un archivo |
| `get -r carpeta` | Descargar una carpeta |
| `put archivo` | Subir un archivo |
| `put -r carpeta` | Subir una carpeta |
| `mkdir nombre` | Crear directorio remoto |
| `progress` | Activar/desactivar progreso |
| `exit` | Salir |

## Copias rápidas con SCP

```bash
scp archivo.zip usuario@servidor:/tmp/
scp usuario@servidor:/var/log/app.log .
scp -r dist/ usuario@servidor:/var/www/app/
scp -P 2222 archivo.txt usuario@servidor:/tmp/
```

Atención: en `scp`, `-P` mayúscula indica el puerto; `-p` minúscula preserva fechas y permisos.

## Sincronización con rsync

`rsync` copia solamente las diferencias y es muy útil para directorios grandes:

```bash
rsync -avz --progress ./dist/ usuario@servidor:/var/www/app/
rsync -avz usuario@servidor:/var/log/app/ ./logs/
rsync -avzn --delete ./dist/ usuario@servidor:/var/www/app/
```

- `-a`: modo archivo; conserva estructura y metadatos.
- `-v`: salida detallada.
- `-z`: comprime durante la transferencia.
- `-n`: simulación, no modifica nada.
- `--delete`: elimina en destino lo que no existe en origen.

> Probá primero con `-n` antes de usar `--delete`: una ruta o barra final incorrecta puede borrar archivos remotos válidos.

## Mantener el trabajo con tmux

En el servidor remoto:

```bash
ssh taller
tmux new -s trabajo
# ejecutar el proceso
# Ctrl+B, d para desconectarse
```

Más tarde:

```bash
ssh taller
tmux attach -t trabajo
```

Así el proceso continúa aunque se corte la conexión SSH.

## Túneles SSH

Acceder localmente a un servicio remoto que escucha en el puerto 3000:

```bash
ssh -L 8080:localhost:3000 usuario@servidor
```

Mientras la conexión esté abierta, `http://localhost:8080` apunta al puerto 3000 del servidor.

Enviar el puerto local 3000 hacia el puerto 8080 del servidor:

```bash
ssh -R 8080:localhost:3000 usuario@servidor
```

Usá túneles remotos solamente cuando estén permitidos por la política del servidor.

## Diagnóstico

```bash
ssh -vv usuario@servidor
ping servidor.example.com
nc -vz servidor.example.com 22
```

Problemas frecuentes:

- `Connection timed out`: red, firewall, hostname o puerto incorrecto.
- `Connection refused`: no hay servicio escuchando en ese puerto.
- `Permission denied (publickey)`: usuario, clave o permisos incorrectos.
- `Host key verification failed`: la huella cambió; verificá el motivo antes de modificar `known_hosts`.

## Reglas mínimas de seguridad

- No compartas claves privadas.
- Usá una frase de contraseña y un agente SSH.
- Verificá host, usuario y ruta antes de copiar o borrar.
- Evitá trabajar como `root`; usá privilegios elevados solo cuando hagan falta.
- No expongas bases de datos o paneles al público si un túnel SSH es suficiente.
- Cerrá accesos y revocá claves que ya no se utilicen.

