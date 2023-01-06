export interface AddDebt {
  add: (debt: AddDebt.Params) => Promise<AddDebt.Result>
}

export namespace AddDebt {
  export type Params = {
    name: string
    email: string
    governmentId: string
    debtAmount: number
    debtDueDate: Date
    debtId: string
  }

  export type Result = boolean
}
