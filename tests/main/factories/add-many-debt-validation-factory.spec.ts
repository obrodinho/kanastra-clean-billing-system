import { makeAddManyDebtValidation } from '@/main/factories'
import { ValidationComposite, RequiredFieldValidation } from '@/utils/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/utils/validators/validation-composite')

describe('AddManyDebtValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddManyDebtValidation()
    const validations: Validation[] = []
    for (const field of ['fileContents']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
