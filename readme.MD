## pern app running on docker compose

make sure you have make, docker and docker-compose installed

starting the service
```bash make server.start```

start in detach mode
```bash make server.daemon```

start in development mode
```bash make server.startdev```

rebuild images
```bash make server.rebuild```

connect to database image
```bash make database.connect```

stop images running
```bash make server.stop```

