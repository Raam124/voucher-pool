
# Node JS Boilerpalte 

Backend Node js powered boilerplate 


## Setup PostgreSQL database locally 

    1.  Download and Install PostgresSQL locally and set it up to run with a superuser

    2.  Run the following commands with Postgres superuser to create the database
    
        * CREATE DATABASE nodeboilerplate;
        * CREATE USER nodeuser;
        * ALTER USER nodeuser WITH PASSWORD 'boilerplatepass';
        * \c nodeboilerplate;
        * GRANT TEMP ON DATABASE nodeboilerplate TO nodeuser;
        * GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO nodeuser;
        * GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO nodeuser;
        * GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO nodeuser;
        * ALTER USER nodeuser CREATEDB;
        * GRANT ALL ON SCHEMA public TO nodeuser;


## Run Locally

Make sure that you have Node.js v8.15.1 and npm v5 or above installed. 

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```
Generate Prisma client

```bash
  npx prisma generate
```

Apply migrations 

```bash
  npx prisma migrate dev
```

Start the server

```bash
  node app.js or nodemon app.js (if you wanna use nodemon)
```

Apply migration changes

```bash
  prisma migrate dev --name --migration-name
```

Apply seed data

```bash
  npx prisma db seed
```

## Run using Docker

Make sure you installed Docker and Docker compose locally. 

Make sure to stop the local PostgreSQL server 

Clone the project

```bash
  git clone https://github.com/Raam124/voucher-pool.git
```

Run docker 

```bash
  docker compose up 
```

Prisma client generate and apply migrations

```bash
  ./docker-init-migrate
```


## Documentation


We used Prisma ORM with PostgreSQL

[Prisma Documentation](https://www.prisma.io/docs/getting-started)

If you're using docker to run the project docker compose contains pgAdmin for visual representation as well.

```bash
    * pg admin will run on port 5555
    * username : admin@admin.com
    * password : admin
```


SendGrid is used for email services check the .env file for credential changes 


author : ramvijay124@gmail.com

