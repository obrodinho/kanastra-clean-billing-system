import { Validation } from '@/presentation/protocols'

export class ValidationSpy implements Validation {
  error: Error = null
  input: any

  validate (input: any): Error {
    this.input = input
    return this.error
  }
}

// export class DebtValidationSpy implements Validation {
//   error: Error = null
//   debts: AddManyDebt.Params[]
//
//   validate (debts: AddManyDebt.Params[]): Error {
//     this.debts = debts
//     return this.error
//   }
// }
