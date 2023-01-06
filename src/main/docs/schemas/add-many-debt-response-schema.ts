export const addManyDebtResponseSchema = {
  type: 'object',
  properties: {
    message: {
      type: 'string'
    },
    success: {
      type: 'boolean'
    },
    summary: {
      type: '[key: number]: string'
    }
  }
}
