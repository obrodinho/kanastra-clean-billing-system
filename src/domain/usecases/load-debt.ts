export interface LoadDebt {
  getById: (debtId: LoadDebt.Params) => Promise<LoadDebt.Result>
}

export namespace LoadDebt {
  export type Params = {
    debtId: string
  }

  export type Result = {
    name: string
    email: string
    governmentId: string
    debtAmount: number
    debtDueDate: Date
    debtId: string
  }
}
