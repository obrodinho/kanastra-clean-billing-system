import {
  debtListSchema,
  errorSchema,
  addManyDebtResponseSchema, closeDebtSchema
} from './schemas/'

export default {
  closeDebtRequest: closeDebtSchema,
  debtListRequest: debtListSchema,
  // Responses
  addManyDebtResponse: addManyDebtResponseSchema,
  error: errorSchema
}
