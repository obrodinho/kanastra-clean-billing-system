export interface UpdateDebtRepository {
    update: (debtId: string, changes: UpdateDebtRepository.Params) => Promise<UpdateDebtRepository.Result>
}

export namespace UpdateDebtRepository {
    export type Params = {
        name: string
        email: string
        governmentId: string
        debtAmount: number
        debtDueDate: Date
    }

    export type Result = boolean
}