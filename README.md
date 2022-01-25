# crud-nodejs


A simple CRUD project with Endpoints to submit and list users.

## Quick Start

```bash
# Install dependencies
npm install
# create an .env file with .env.examples as template
# fill in the database
# start the server
npx modemon start
```
## get user by email and password

```bash
# endpoint - /api/user
```

## Making a post request to create a new user

```bash
# endpoint - /api/create

x-www-form-urlencoded body

  1. name
  2. email
  3. password

```

## Making a put request to update a user

```bash
# endpoint - /api/update

x-www-form-urlencoded body

  1. name
  2. email
  3. password
  4. id

```

## Making a delete request to delete a user

```bash
# endpoint - /api/update

x-www-form-urlencoded body

  1. id

```
