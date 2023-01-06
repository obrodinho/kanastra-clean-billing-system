import { Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation } from '@/utils/validators'

export const makeAddManyDebtValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['fileContents']) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
