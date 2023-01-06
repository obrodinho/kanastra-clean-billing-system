export const addManyDebtPath = {
  post: {
    tags: ['Debt'],
    summary: 'Adiciona uma lista de dívidas e prepara as notificações para os usuários',
    description: '',
    requestBody: {
      required: true,
      content: {
        'text/csv': {
          schema: {
            $ref: '#/schemas/debtListRequest'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/addManyDebtResponse'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
