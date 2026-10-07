# Práctica remota

Reemplazá los datos de ejemplo antes de conectar. Copiá el bloque de `ssh-config.example` a `~/.ssh/config` y comprobalo sin conectar:

```bash
ssh -G taller-demo
ssh taller-demo
sftp -b sftp-comandos.txt taller-demo
```

Para acceder a un Grafana remoto mediante túnel:

```bash
ssh -N -L 3001:localhost:3001 taller-demo
```

