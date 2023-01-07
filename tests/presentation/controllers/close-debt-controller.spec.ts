import { CloseDebt } from '@/domain/usecases'
import { CloseDebtController } from '@/presentation/controllers'
import { ServerError, MissingParamError } from '@/presentation/errors'
import { ok, serverError, badRequest } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { CloseDebtSpy, ValidationSpy } from '@/tests/presentation/mocks'

const mockRequest = (): CloseDebtController.Params => {
  return { debtId: '', paidAmount: 0, paidAt: undefined, paidBy: '' }
}

type SutTypes = {
  sut: CloseDebtController
  validationSpy: ValidationSpy
  closeDebtSpy: CloseDebtSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const closeDebtSpy = new CloseDebtSpy()
  const sut = new CloseDebtController(validationSpy, closeDebtSpy)

  return {
    sut,
    validationSpy: validationSpy,
    closeDebtSpy: closeDebtSpy
  }
}

describe('Close Debt Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should return 400 any missing required field', async () => {
    const { sut, validationSpy } = makeSut()
    for (const param of ['debtId', 'paidAmount', 'paidAt']) {
      validationSpy.error = new MissingParamError(param)
      const httpResponse = await sut.handle(mockRequest())

      expect(httpResponse).toEqual(badRequest(validationSpy.error))
      expect(httpResponse.body).toEqual(validationSpy.error)
    }
  })

  test('Should return 500 if Validation throws', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 with no errors', async () => {
    const { sut, closeDebtSpy } = makeSut()
    const request: CloseDebt.Params = {
      debtId: '8291',
      paidAt: new Date('2022-06-09 10:00:00'),
      paidAmount: 100000.00,
      paidBy: 'John Doe'
    }
    closeDebtSpy.result = true
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(
      ok({ success: true })
    )
  })
})
