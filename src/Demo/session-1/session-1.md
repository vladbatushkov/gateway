# Session 
- Query
- Muation

# Query
```gql
query{
  tags{
    name
  }
}
```

# Mutation
```gql
mutation {
  addTag(tag: { id : 6, name : "C"}) {
      id
      name
  }
}
```