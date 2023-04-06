## pern app running on docker compose

make sure you have make, docker and docker-compose installed

starting the service
```make server.start```

start in detach mode
```make server.daemon```

start in development mode
```make server.startdev```

rebuild images
```make server.rebuild```

connect to database image
```make database.connect```

stop images running
```make server.stop```
