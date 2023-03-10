export interface CloseDebtRepository {
  close: (paymentData: CloseDebtRepository.Params) => Promise<CloseDebtRepository.Result>
}

export namespace CloseDebtRepository {
  export type Params = {
    debtId: string
    paidAt: Date
    paidAmount: number
    paidBy: string
  }
  export type Result = boolean
}
