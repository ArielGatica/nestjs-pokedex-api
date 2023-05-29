<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Execute in develop

1. Clone repository

2. Execute

```
yarn install
```

3. Nest ClI installed
```
npm i -g @nestjs/cli
```

4. Run database
```
docker-compose up -d
```

5. Get file ```.env.template``` about ```.env``` file

6.  Execute run app in dev environment with command:
```
yarn start:dev
```

7. Re-insert database in __development__
```
localhost:3000/api/v1/seed
```
## Stack used
* MongoDB
* NestJS
* Docker
