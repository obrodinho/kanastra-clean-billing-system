export const addManyDebtPath = {
  post: {
    tags: ['CSV'],
    summary: 'Adiciona uma lista de dívidas e prepara as notificações para os usuários',
    description: '',
    requestBody: {
      required: true,
      content: {
        'text/csv': {
          schema: {
            $ref: '#/schemas/debtList'
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
              $ref: '#/schemas/debt'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/unauthorized'
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
