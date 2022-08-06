const queryCompleta = `
  CALL {
    MATCH (u:User)-[r:FRIENDS_WITH]->(f:User)-[:LIKES]->(m:Movie)
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
  MATCH (u:User)-[r:FRIENDS_WITH]->(f:User)-[:LIKES]->(m:Movie)
  WHERE u.name = 'Julio'
  RETURN m, count(m) AS occurrence
  ORDER BY occurrence DESC
  LIMIT 10
`

const queryPerson = `
  MATCH (u:User)-[:LIKES]->(m1:Movie)<-[]-(p:Person)-[]->(m:Movie)
  WHERE u.name = 'Julio'
  RETURN m, count(m) AS occurrence
  ORDER BY occurrence DESC
  LIMIT 10
`;


const queryGenre = `
  MATCH (u:User)-[:LIKES]->(m1:Movie)<-[]-(g:Genre)-[]->(m:Movie)
  WHERE u.name = 'Julio'
  RETURN m, count(m) AS occurrence
  ORDER BY occurrence DESC
  LIMIT 10
`
