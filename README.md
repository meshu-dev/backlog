# Backlog app

An app used to keep a backlog of movies and TV shows.

This is a Vue.js project which retrieves and updates data from the Backlog API and OMDB API.

## Setup

This project requires both the backlog-api and omdb-api apps to work.

### Dev Setup

- Install packages

```
npm install
```
-  Copy env file

```
cp .env.example .env
```
-  Add Backlog API and OMDB API urls to the following env variables

```
VITE_BACKLOG_API_URL
VITE_OMDB_API_URL
```
-  Run on local

```
npm run dev
```

### Static Site Hosting

- Run the following command to generate static site

```
npm run build
```
