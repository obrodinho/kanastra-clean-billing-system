import { AddManyDebt } from '@/domain/usecases'
import { DebtMongoRepository } from '@/infra/db'
import { DbAddManyDebt } from '@/data/usecases'

export const makeDbAddManyDebt = (): AddManyDebt => {
  const addManyDebtRepository = new DebtMongoRepository()
  return new DbAddManyDebt(addManyDebtRepository)
}
