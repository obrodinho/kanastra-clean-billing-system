import { AddDebt, AddManyDebt } from '@/domain/usecases'

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

//
// export class LoadDebtsSpy implements LoadDebts {
//   accountId: string
//   result = mockDebtModels()
//
//   async load (accountId: string): Promise<LoadDebts.Result> {
//     this.accountId = accountId
//     return this.result
//   }
// }
//
// export class CheckDebtByIdSpy implements CheckDebtById {
//   id: string
//   result = true
//
//   async checkById (id: string): Promise<CheckDebtById.Result> {
//     this.id = id
//     return this.result
//   }
// }
