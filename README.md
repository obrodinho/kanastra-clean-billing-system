# **Kanastra Challenge - Billing System**
---

Este repositório é uma tentativa de resolver o [desafio](https://kanastra.notion.site/Hiring-Challenge-software-engineers-5c75c248711941e1825d905556effce9) com TypeScript e Clean Architecture.

IMHO, no desafio estão destacados 3 casos de uso:
- Receber lista de dívidas em CSV
- Notificar os devedores
- Receber uma notificação JSON de fechamento da dívida

## Casos de uso

1. [Carga de CSV](./requirements/001_load-debts-csv_use-case.md)
2. [Aviso de Pagamento](./requirements/003_register-payment_use-case.md)


## Características do projeto e como executar

### Conectividade
- Portas reservadas:
  - `5988`: API
  - `9222`: Debugger, quando executado
  - `27017`: MongoDB, quando executado via container
- Home: http://localhost:5988
- Swagger:
  - Com o projeto rodando, a url `http://localhost:5988/api-docs/` deve mostrar os endpoints criados até o momento para a API.
  - Esta URL é um playground. Caso queira, você pode experimentar a API diretamente.

### Testes
Para rodar os testes, é necessário um ambiente de desenvolvimento com NodeJS 16.

Após clonar o projeto, rode:
```bash
$ npm i # Instalar as dependências do projeto
$ npm t # Ou npm run test
```
#### Testes Unitários e de Integração

Para rodar os testes de cada tipo:
```bash
$ npm run test:unit # Pode ser necessário apertar a tecla `a` para rodar todos os testes novamente
$ npm run test:integration
```
Para observar a cobertura de código e outros comandos, visite o arquivo `package.json`.

Após instaladas as dependências é possível executar o projeto de várias maneiras: 

### `docker-compose`
> #### Requisitos
- `Docker` e `docker-compose` instalados

```bash
$ docker-compose up # levantará os containers da API e do MongoDB 
```

### Localmente (Diretamente)
> #### Requisitos
- Instalar as dependências do projeto (Já rodou os testes? Para rodá-los as dependências serão instaladas primeiro).
- Uma URL de conexão com um servidor mongo (Já desistiu e colocou pra rodar no container?).

De posse da URL, crie uma variável de ambiente chamada `MONGO_URL` com a string de conexão. Basta um `npm run start` e pronto.

### Rodou, e agora?

Acesse http://localhost:5988/api-docs/#/ para ver as rotas em sua documentação.