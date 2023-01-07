import { CloseDebt } from '@/domain/usecases'
import { DebtMongoRepository } from '@/infra/db'
import { DbCloseDebt } from '@/data/usecases'

export const makeDbCloseDebt = (): CloseDebt => {
  const addDebtRepository = new DebtMongoRepository()
  return new DbCloseDebt(addDebtRepository)
}
