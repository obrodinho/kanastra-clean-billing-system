export interface UpdateDebt {
  update: (debtId: string, changes: UpdateDebt.Params) => Promise<UpdateDebt.Result>
}

export namespace UpdateDebt {
  export type Params = {
    name: string
    email: string
    governmentId: string
    debtAmount: number
    debtDueDate: Date
  }

  export type Result = boolean
}
