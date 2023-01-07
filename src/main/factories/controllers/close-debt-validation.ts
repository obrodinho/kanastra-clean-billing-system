import { Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation } from '@/utils/validators'

export const makeCloseDebtValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['debtId', 'paidAmount', 'paidAt']) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
