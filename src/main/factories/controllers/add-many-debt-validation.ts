import { Validation } from '@/presentation/protocols'
import { EmailValidatorAdapter } from '@/infra/validators'
import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '@/utils/validators'

export const makeAddManyDebtValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'debtId', 'debtDueDate']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
