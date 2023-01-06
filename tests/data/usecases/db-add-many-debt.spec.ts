import { DbAddManyDebt } from '@/data/usecases'
import { mockAddManyDebtParams, throwError } from '@/tests/domain/mocks'
import { AddManyDebtRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbAddManyDebt
  addDebt: AddManyDebtRepositorySpy
}

const makeSut = (): SutTypes => {
  const addManyDebtRepositorySpy = new AddManyDebtRepositorySpy()
  const sut = new DbAddManyDebt(addManyDebtRepositorySpy)
  return {
    sut,
    addDebt: addManyDebtRepositorySpy
  }
}

describe('DbAddManyDebt Usecase', () => {
  test('Should call AddManyDebtRepository with correct values', async () => {
    const { sut, addDebt } = makeSut()
    const params = mockAddManyDebtParams(1)
    await sut.addMany(params)
    const param = params[0]
    expect(addDebt.params).toEqual([{
      name: param.name,
      email: param.email,
      governmentId: param.governmentId,
      debtId: param.debtId,
      debtAmount: param.debtAmount,
      debtDueDate: param.debtDueDate
    }])
  })

  test('Should throw if AddManyDebtRepository throws', async () => {
    const { sut, addDebt } = makeSut()
    jest.spyOn(addDebt, 'addMany').mockImplementationOnce(throwError)
    const params = mockAddManyDebtParams(1)
    const promise = sut.addMany(params)
    await expect(promise).rejects.toThrow()
  })

  test('Should return true on result Map on success', async () => {
    const { sut, addDebt } = makeSut()
    const params = mockAddManyDebtParams(10)
    addDebt.result = params.map(p => p.debtId)
    const expectedResult = new Map<string, boolean>()
    for (const param of params) {
      expectedResult.set(param.debtId, true)
    }
    const result = await sut.addMany(params)
    expect(result).toEqual(expectedResult)
  })

  test('Should return false on result Map if any AddManyDebtRepository item returns false', async () => {
    const { sut, addDebt } = makeSut()
    const params = mockAddManyDebtParams(3)
    const debtId = params[1].debtId
    addDebt.result = [debtId]
    const result = await sut.addMany(params)
    const mapped = new Map()
    mapped.set(params[0].debtId, false)
    mapped.set(params[1].debtId, true)
    mapped.set(params[2].debtId, false)
    expect(result).toStrictEqual(mapped)
  })
})
