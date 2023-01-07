export const operationResponseSchema = {
  type: 'object',
  required: ['success'],
  properties: {
    message: {
      type: 'string'
    },
    success: {
      type: 'boolean'
    },
    summary: {
      type: 'object'
    }
  }
}
