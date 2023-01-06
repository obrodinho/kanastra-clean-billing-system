export interface AddManyDebt {
  addMany: (debts: AddManyDebt.Params[]) => Promise<AddManyDebt.Result>
}

export namespace AddManyDebt {
  export type Params = {
    name: string
    email: string
    governmentId: string
    debtAmount: number
    debtDueDate: Date
    debtId: string
  }

  export type Result = Map<string, boolean>
}
