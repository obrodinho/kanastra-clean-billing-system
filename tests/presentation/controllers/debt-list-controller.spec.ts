import { AddManyDebtController } from '@/presentation/controllers'
import { MissingParamError, ServerError, InvalidParamError } from '@/presentation/errors'
import { ok, serverError, badRequest } from '@/presentation/helpers'
import { AddManyDebtSpy, CsvParserSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'
import * as fs from 'fs'
import { resolve } from 'path'

const mockRequest = (): AddManyDebtController.Params => {
  return {
    fileContents: ''
  }
}

const mockCsvRequest = (csvFilename): AddManyDebtController.Params => {
  const debtsFile = fs.readFileSync(csvFilename)
  return {
    fileContents: debtsFile
  }
}

type SutTypes = {
  sut: AddManyDebtController
  validationSpy: ValidationSpy
  csvParserSpy: CsvParserSpy
  addDebtSpy: AddManyDebtSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const csvParserSpy = new CsvParserSpy()
  const addManyDebtSpy = new AddManyDebtSpy()
  const sut = new AddManyDebtController(validationSpy, csvParserSpy, addManyDebtSpy)

  return {
    sut,
    validationSpy: validationSpy,
    csvParserSpy,
    addDebtSpy: addManyDebtSpy
  }
}

describe('Debt List Controller', () => {
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

  test('Should return 400 on empty body', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new InvalidParamError('body')
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
    expect(httpResponse.body).toEqual(validationSpy.error)
  })

  test('Should return 500 if Validation throws', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 500 if CsvParser throws', async () => {
    const { sut, csvParserSpy } = makeSut()
    jest.spyOn(csvParserSpy, 'parse').mockImplementationOnce(throwError)
    const csvFilename = resolve(__dirname, '../fixtures/csv/default-debts.csv')
    const httpResponse = await sut.handle(mockCsvRequest(csvFilename))
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 500 if AddDebt throws', async () => {
    const { sut, addDebtSpy, csvParserSpy } = makeSut()
    jest.spyOn(csvParserSpy, 'parse').mockResolvedValueOnce([{ name: faker.name.findName(), debtId: '8291' }])
    jest.spyOn(addDebtSpy, 'addMany').mockImplementationOnce(throwError)
    const csvFilename = resolve(__dirname, '../fixtures/csv/default-debts.csv')
    const httpResponse = await sut.handle(mockCsvRequest(csvFilename))
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 if valid data is provide', async () => {
    const { sut, csvParserSpy } = makeSut()
    const csvFilename = resolve(__dirname, '../fixtures/csv/default-debts.csv')
    const request = mockCsvRequest(csvFilename)
    jest.spyOn(csvParserSpy, 'parse').mockResolvedValueOnce([{ name: faker.name.findName(), debtId: '8291' }])
    const httpResponse = await sut.handle(request)
    expect(httpResponse.statusCode).toEqual(200)
    expect(httpResponse).toEqual(
      ok({
        message: 'Received 1 debt(s).',
        success: true,
        summary: {
          8291: true
        }
      })
    )
  })

  test('Should get an populated debt list on an csv inputted body', async () => {
    const { sut, csvParserSpy } = makeSut()
    const csvFilename = resolve(__dirname, '../fixtures/csv/default-debts.csv')
    const request = mockCsvRequest(csvFilename)
    const expected = [{ name: faker.name.findName(), debtId: '8291' }]
    jest.spyOn(csvParserSpy, 'parse').mockResolvedValueOnce(expected)
    const promise = sut.handle(request)
    await expect(promise).resolves.toBeTruthy()
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.random.word())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })
})
