import { AddDebt, AddManyDebt, CloseDebt } from '@/domain/usecases'

export class AddDebtSpy implements AddDebt {
  params: AddDebt.Params

  async add (params: AddDebt.Params): Promise<boolean> {
    this.params = params
    return true
  }
}

export class AddManyDebtSpy implements AddManyDebt {
  debts: AddDebt.Params[]

  async addMany (debts: AddDebt.Params[]): Promise<Map<string, boolean>> {
    this.debts = debts
    const summary = new Map<string, boolean>()
    for (const debt of this.debts) {
      summary.set(debt.debtId, true)
    }

    return summary
  }
}

export class CloseDebtSpy implements CloseDebt {
  id: string
  paymentData: CloseDebt.Params
  result: CloseDebt.Result = true

  async close (paymentData: CloseDebt.Params): Promise<CloseDebt.Result> {
    this.paymentData = paymentData
    return this.result
  }
}
