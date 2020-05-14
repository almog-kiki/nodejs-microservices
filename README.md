# microservice docker 
Example of microservices full project with nodejs, react, nginx and docker

# How to run 
```
docker-compose -f docker-compose-<target>.yml  <Commands>
```
- development
```
docker-compose -f docker-compose-dev.yml build
docker-compose -f docker-compose-dev.yml up -d
```

- production
```
docker-compose -f docker-compose-prod.yml build
docker-compose -f docker-compose-prod.yml up -d
```

- stop:
```
docker-compose -f docker-compose-<target>.yml down
```


# Referencing external resources:
https://github.com/fChristenson/microservices-example



