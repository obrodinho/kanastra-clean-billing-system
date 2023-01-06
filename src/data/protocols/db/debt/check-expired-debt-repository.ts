export interface CheckExpiredDebtRepository {
    isExpired: (date?: Date) => Promise<CheckExpiredDebtRepository.Result>
}

export namespace CheckExpiredDebtRepository {
    export type Result = boolean
}
