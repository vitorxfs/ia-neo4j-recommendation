const queryCompleta = `
  CALL {
    MATCH (u:User)-[r:FRIENDS_WITH]-(f:User)-[:LIKES]->(m:Movie)
    WHERE u.name = 'Julio'
    RETURN m

    UNION ALL

    MATCH (u:User)-[:LIKES]->(m1:Movie)<-[]-(p:Person)-[]->(m:Movie)
    WHERE u.name = 'Julio'
    RETURN m

    UNION ALL

    MATCH (u:User)-[:LIKES]->(m1:Movie)<-[]-(g:Genre)-[]->(m:Movie)
    WHERE u.name = 'Julio'
    RETURN m
  }
  RETURN m, count(m) AS occurrence
  ORDER BY occurrence DESC
  LIMIT 10
`;

const queryAmigos = `
  MATCH (u:User)-[r:FRIENDS_WITH]-(f:User)-[:LIKES]->(m:Movie)
  WHERE u.name = 'Julio'
  RETURN m, count(m) AS occurrence
  ORDER BY occurrence DESC
  LIMIT 10
`

// Para exemplo do documento
// MATCH (u:User)-[:LIKES]->(m1:Movie)<-[]-(p:Person)-[]->(m:Movie)
// WHERE u.name = 'Julio'
// RETURN m, m1, u, p
// LIMIT 20
const queryPerson = `
  MATCH (u:User)-[:LIKES]->(m1:Movie)<-[]-(p:Person)-[]->(m:Movie)
  WHERE u.name = 'Julio'
  RETURN m, count(m) AS occurrence
  ORDER BY occurrence DESC
  LIMIT 10
`;

// Para exemplo do Documento
// MATCH (u:User)-[:LIKES]->(m1:Movie)-[]-(g:Genre)-[]-(m:Movie)
// WHERE u.name = 'Julio'
// RETURN m, m1, u, g
const queryGenre = `
  MATCH (u:User)-[:LIKES]->(m1:Movie)<-[]-(g:Genre)-[]->(m:Movie)
  WHERE u.name = 'Julio'
  RETURN m, count(m) AS occurrence
  ORDER BY occurrence DESC
  LIMIT 10
`
