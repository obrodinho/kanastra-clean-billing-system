# Receber uma lista via API, com um CSV de devedores.

> ## Sucesso: Lista carregada com todos os dados
1. Dados esperados: `Nomes, CPFs, e-mails, valor da divida, vencimento da divida e cod. da divida`
   - Assumir que todos os dados são obrigatórios
      - ```csv 
        name,governmentId,email,debtAmount,debtDueDate,debtId
        John Doe,11111111111,johndoe@kanastra.com.br,1000000.00,2022-10-12,8291 
        ```
2. Carregar numa base de dados em memória ou arquivo, para permitir a retomada dos avisos
3. Rota: `POST /debts`
   - Arquivo anexo! 

> ## Exceção: Lista inválida
- Corpo da requisição, vazio
