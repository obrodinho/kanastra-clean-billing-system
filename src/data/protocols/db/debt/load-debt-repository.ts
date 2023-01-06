export interface LoadDebtRepository {
    getById: (debtId: string) => Promise<LoadDebtRepository.Result>
}

export namespace LoadDebtRepository {
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
    }

    export type Result = LoadDebtRepository.DebtResult
}
