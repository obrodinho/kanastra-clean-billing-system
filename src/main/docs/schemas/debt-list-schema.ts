export const debtListSchema = {
  type: 'object',
  mimeType: 'application/json',
  properties: {
    fileContents: {
      type: 'string'
    }
  },
  example: { fileContents: 'name,governmentId,email,debtAmount,debtDueDate,debtId\nJohn Doe,11111111111,johndoe@kanastra.com.br,1000000.00,2022-10-12,8291' }
}
