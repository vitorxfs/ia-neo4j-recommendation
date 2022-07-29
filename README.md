# IA Recommendation

## Antes de tudo:

Adicione um arquivo `.env` na raiz do projeto e cole as credenciais que mandei no whatsapp

```
NEO4J_URI=...
NEO4J_USERNAME=...
NEO4J_PASSWORD=...
AURA_INSTANCENAME=...

```

---
## Como rodar:

Para rodar, basta instalar o Node e rodar:

`npm install -g yarn`

`yarn install`

`yarn dev`

---
## Estrutura:

Todo o código está dentro da pasta `/src`

`database/neo4j.driver.ts` - Aqui é onde é realizada a conexão com o banco de dados

`models` - Pasta com as classes de modelo do sistema (User e Film)

`services` - Pasta contendo as classes onde devem conter as regras de negócio

`env.ts` - Arquivo onde são mapeadas as variáveis de ambiente

`index.ts` - Arquivo onde tudo será utilizado.

