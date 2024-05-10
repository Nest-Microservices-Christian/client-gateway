<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Client Gateway

## Description

This is a simple gateway API that allows connecting to microservices. Fernando Herrera's course project.

## Dev

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a `.env` based on the `.env.template` file
4. Run the app with `npm run start:dev`

## Production

Execute the following command to build the project:

```
docker build -f dockerfile.prod -t client-gateway .
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
