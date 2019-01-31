export default `

type User {
  id: ID!
  username: String!
}

type Query {
  login(email: String!, password: String!): String!
}

type Mutation {
  register(username: String!, email: String!, password: String): Boolean!
}

`