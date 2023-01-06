export const debtSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    governmentId: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    debtAmount: {
      type: 'number'
    },
    debtDueDate: {
      type: 'string',
      example: '2022-10-12'
    },
    debtId: {
      type: 'string',
      example: '8291'
    }
  },
  required: ['name', 'email', 'debtAmount', 'debtDueDate', 'debtId']
}
