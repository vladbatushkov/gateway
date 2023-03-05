# Neo4j

## Step 1: Manage Neo4j Database

- Run `docker-compose up` command for the `docker-compose.yml` file of next content.

```yml
version: "3.6"

services:
  neo4j:
    image: neo4j:5.5.0
    hostname: neo4j
    container_name: neo4j-gql
    restart: unless-stopped
    ports:
      - "7474:7474"
```

- Open Neo4j Browser [http://localhost:7474/](http://localhost:7474/).

- Connect to Neo4j could instance.
  - Host: `neo4j+s://d71b6287.databases.neo4j.io:7687`
  - User: `neo4j`
  - Passowrd: `a0mQyTDJ13EyOaqPiqHEIYnf6CDvkk_ngRKrN68c2NI`

## Step 2: Query Data