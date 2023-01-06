export interface AddManyDebtRepository {
  addMany: (debts: AddManyDebtRepository.Params[]) => Promise<AddManyDebtRepository.Result>
}

export namespace AddManyDebtRepository {
  export type Params = {
    name: string
    email: string
    governmentId: string
    debtAmount: number
    debtDueDate: Date
    debtId: string
  }

  export type Result = string[]
}
