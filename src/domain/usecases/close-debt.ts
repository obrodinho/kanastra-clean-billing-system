export interface CloseDebt {
  close: (paymentData: CloseDebt.Params) => Promise<CloseDebt.Result>
}

export namespace CloseDebt {
  export type Params = {
    debtId: string
    paidAt: Date
    paidAmount: number
    paidBy: string
  }

  export type Result = boolean
}
