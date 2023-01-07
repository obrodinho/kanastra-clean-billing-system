import { makeCloseDebtValidation } from '@/main/factories'
import { ValidationComposite, RequiredFieldValidation } from '@/utils/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/utils/validators/validation-composite')

describe('CloseDebtValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeCloseDebtValidation()
    const validations: Validation[] = []
    for (const field of ['debtId', 'paidAmount', 'paidAt']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
