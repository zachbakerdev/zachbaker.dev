# zachbaker.dev

This repository contains the source code for [zachbaker.dev](https://zachbaker.dev).

## Prerequisites

- Node 20 or greater
- Docker

## Quick Start

### Clone

Clone repo and install dependencies

```shell
git clone git@github.com:zachbakerdev/zachbaker.dev.git
cd zcahbaker.dev
npm install
```

### Postgres

Make sure to change the password and name in the `docker run` command below.

```shell
docker pull postgres
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
```

### Environment Variables

Please populate the `.env.local` file using the `.env.exmaple` as a reference.

### Development

To start the dev server, run:

```shell
npm run dev
```

### Production

```shell
npm run build
npm run start
```
