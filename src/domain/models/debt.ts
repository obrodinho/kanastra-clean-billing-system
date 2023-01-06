import ObjectID from 'bson-objectid'

export namespace Debt {
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

  export type Model = {
    id: ObjectID
    debtId: string
    name: string
    email: string
    governmentId: string
    debtAmount: number
    debtDueDate: Date
    status: Debt.Status
    payments: Payment[]
  }
}

export type DebtModel = {
  id: ObjectID
  debtId: string
  name: string
  email: string
  governmentId: string
  debtAmount: number
  debtDueDate: Date
  status: Debt.Status
}
