import {
  debtListSchema,
  errorSchema, addManyDebtResponseSchema
} from './schemas/'

export default {
  debtList: debtListSchema,
  addManyDebtResponse: addManyDebtResponseSchema,
  error: errorSchema
}
