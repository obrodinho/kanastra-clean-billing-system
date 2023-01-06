export interface LoadDebtRepository {
  getById: (id: string) => Promise<LoadDebtRepository.Result>
}

export namespace LoadDebtRepository {
    export const enum Status {
        Unsettled = 0,
        Settled = 1,
        PartiallySettled = 2,
        Overpaid = -1
    }

    export type PaymentResult = {
        debtId: string
        paidAt: Date
        paidAmount: number
        paidBy: string
    }
    export type DebtResult = {
        debtId: string
        debtAmount: number
        debtDueDate: Date
        email: string
        governmentId: string
        name: string
        payments?: PaymentResult[]
        status?: Status
    }

    export type Result = LoadDebtRepository.DebtResult
}
