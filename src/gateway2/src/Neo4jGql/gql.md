# Create tag
```gql
mutation{
  createTags(input:{
    name : "ts"
  }) 
  {
    tags { 
      name
    }
  }
}

```

# Create Person

```gql
mutation{
     createPeople(input:{
name: "vlad"
  }) {
    people {
      name
      tags {
        name
      }
    }
  }
}
```



#  Make relationship
```gql
mutation UpdatePeople{
  updatePeople(connect: {
    tags: {
      where : { node :  { name : "c#"}}
    }
  }) {
    people {
      name
      tags {
        name
      }
    }
  }
}
```

# Query Person with tag "C#"

```gql
query($where: PersonWhere){
  people(where: $where) {
    name
    tags {
       name
    }
  }

}

== vvariable
{
  "where": {"tags" : { "name_CONTAINS" : "c#"}}
}
```

# Update People tag
```gqlmutation {
  updatePeople(
    connect: {
      tags: {
        where: { node: { name: "scalar" } }
        connect: { persons: { where: { node: { name: "vlad" } } } }
      }
    }
  ) {
    people {
      name
      tags {
        name
      }
    }
  }
}
```