import {AddManyDebt} from '@/domain/usecases'
import {AddManyDebtRepository} from '@/data/protocols'

export class DbAddManyDebt implements AddManyDebt {
  constructor(
      private readonly addManyDebtRepository: AddManyDebtRepository
  ) {
  }

  async addMany(debts: AddManyDebt.Params[]): Promise<AddManyDebt.Result> {
    const result = new Map<string, boolean>()
    const inserted = await this.addManyDebtRepository.addMany(debts)
    for (const debt of debts) {
      const isSaved = inserted.includes(debt.debtId)
      result.set(debt.debtId, isSaved)
    }

    return result
  }
}
