export const closeDebtSchema = {
  type: 'object',
  properties: {
    debtId: {
      type: 'string'
    },
    paidAt: {
      type: 'string'
    },
    paidAmount: {
      type: 'number'
    },
    paidBy: {
      type: 'string'
    }
  },
  required: ['debtId', 'paidAt', 'paidAmount']
}
