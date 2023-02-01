# REST API for AppCER

<!-- ![Project Image](project-image-url) -->

## Table of Contents

- [Description](#description)
- [How To Use](#how-to-use)
- [Running The Server](#running-the-server)
- [References](#references)

---

## Description

This repository contains the back-end implementation of the AppCER web app. This project was built to support the subject of the term paper for graduating in Computer Science at Universidade Federal de Campina Grande in the year of 2022.

### Technologies

- TypeScript
- Node.js
- Express.js
- Prisma
- MongoDB

---

## Running the server

Go to the _server_ directory using:

```console
cd server
```

Once you there, run:

```console
npm ci
```

After downloading all of the project dependencies, run:

```console
npm run dev
```

When the server is up, you should be able to use the base [url](https://localhost:3333) to start sending your HTTP requests and receiving the responses.

Keep in mind that you should create a MongoDB cluster and manually connect it to the application using the prisma schema and .env files
The following links may be helpful:

- [Prisma MongoDB connection](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb-typescript-mongodbb)
- [Creating your MongoDB database](https://www.mongodb.com/atlas/database)

---

## API References

You can send your requests using [this](https://app-cer-backend.herokuapp.com/) as the base url

### Fetching all items

```
GET /items/all
```

### Fetching items with a filter

```
GET /items/all/:filter
```

### Fetching activities

```
GET /activities/all
```

### Fetching activity by name

```
GET /activities/:name
```

### Fetching testimonials

```
GET /testimonials/all
```

---

## References

- [Express](http://expressjs.com/pt-br/)
- [Node](https://nodejs.org/en/)
- [Prisma](https://www.prisma.io/docs/)
- [MongoDB](https://www.mongodb.com/docs/)

[Back To The Top](#rest-api-for-appcer)
