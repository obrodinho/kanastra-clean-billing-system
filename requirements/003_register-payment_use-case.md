# Receber JSON, via API, para marcar um débito como pago

> ## Sucesso: Pagamento salvo e débito marcado como pago
1. Rota: `POST /payment`
    - ```json
      {
       "debtId": "8291",
       "paidAt": "2022-06-09 10:00:00",
       "paidAmount": 100000.00,
       "paidBy": "John Doe"
       }
       ```
2. Adicionar campo para que os débitos sejam marcados como pagos e serem ignorados no restart do programa
3. Alertar pagamentos parciais e somente marcar os pagamentos enquanto o montante pago for igual ou superior ao devido

> ## Exceção: débito já quitado
> ## Exceção: pagamento inválido
1. Débito inexistente
2. Valor negativo
3. Data futura
> ## Alerta: Débito quitado parcialmente