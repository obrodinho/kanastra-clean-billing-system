import {
  operationResponseSchema,
  closeDebtSchema,
  debtListSchema,
  errorSchema
} from './schemas/'

export default {
  closeDebtRequest: closeDebtSchema,
  debtListRequest: debtListSchema,
  // Responses
  operationResponse: operationResponseSchema,
  error: errorSchema
}
