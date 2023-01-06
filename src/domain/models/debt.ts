export namespace DebtModelTypes {
  export const enum Status {
    Unsettled = 0,
    Settled = 1,
    PartiallySettled = 2,
    Overpaid = -1
  }

  export type Payment = {
    debtId: string
    paidAt: Date
    paidAmount: number
    paidBy: string
  }

  export type Debt = {
    _id: string
    debtId: string
    name: string
    email: string
    governmentId: string
    debtAmount: number
    debtDueDate: Date
    status: DebtModelTypes.Status
    payments: Payment[]
  }
}

export type DebtModel = {
  id: string
  debtId: string
  name: string
  email: string
  governmentId: string
  debtAmount: number
  debtDueDate: Date
  status: DebtModelTypes.Status
}
