# REST API for AppCER

<!-- ![Project Image](project-image-url) -->

### Table of Contents

- [Description](#description)
- [How To Use](#how-to-use)
- [References](#references)
- [License](#license)
- [Author Info](#author-info)

---

## Description

This repository contains the back-end implementation of the AppCER web app. This project was built to support the subject of the term paper for graduating in Computer Science at Universidade Federal de Campina Grande in the year of 2022.

#### Technologies

- TypeScript
- Node.js
- Express.js
- Prisma
- MongoDB

[Back To The Top](#read-me-template)

---

## How To Use

If you want to test the API for yourself, or check this [front-end](https://github.com/danilocsm/t.c.c-frontend) integrated with the back-end and the database, you can execute the following commands to run the project on your machine

#### Installation

First, clone the repository using the following command:

```console
git clone https://github.com/danilocsm/t.c.c-backend.git
```

After, go to the _t.c.c-backend_ directory using:

```console
cd t.c.c-backend
```

Once you there, run:

```console
npm install
```

After downloading all of the project dependencies, run:

```console
npm run dev
```

When the server is up, you should be able to use the base [url](https://localhost:3333) to start sending your HTTP requests and receiving the responses.

[Back To The Top](#read-me-template)

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

[Back To The Top](#read-me-template)

---

## License

MIT License

Copyright (c) 2022 Danilo César Ribeiro Garcia de Medeiros

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[Back To The Top](#read-me-template)

---

## Author Info

- GitHub - [Danilo César Ribeiro Garcia de Medeiros](https://github.com/danilocsm)

[Back To The Top](#read-me-template)
