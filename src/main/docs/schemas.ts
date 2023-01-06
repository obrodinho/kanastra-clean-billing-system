import {
  addManyDebtResponseSchema,
  closeDebtSchema,
  debtListSchema,
  errorSchema
} from './schemas/'

export default {
  closeDebtRequest: closeDebtSchema,
  debtListRequest: debtListSchema,
  // Responses
  addManyDebtResponse: addManyDebtResponseSchema,
  error: errorSchema
}
