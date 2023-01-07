import { DebtMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddManyDebtParams, mockCloseDebtParams } from '@/tests/domain/mocks'

import { Collection } from 'mongodb'

const makeSut = (): DebtMongoRepository => {
  return new DebtMongoRepository()
}

let accountCollection: Collection

describe('DebtMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('debts')
    await accountCollection.deleteMany({})
  })

  describe('addMany()', () => {
    test('Should return inserted id on success', async () => {
      const sut = makeSut()
      const addDebtParams = mockAddManyDebtParams(1)
      const insertedIds = await sut.addMany(addDebtParams)
      expect(insertedIds).toContain(addDebtParams[0].debtId)
      expect(insertedIds).toHaveLength(1)
    })

    test('Should return all inserted id on success', async () => {
      const sut = makeSut()
      const addDebtParams = mockAddManyDebtParams(10)
      const debtIds = addDebtParams.map(d => d.debtId)
      const insertedIds = await sut.addMany(addDebtParams)
      expect(insertedIds).toEqual(debtIds)
      expect(insertedIds).toHaveLength(10)
    })

    test('Should not insert existent debts', async () => {
      const sut = makeSut()
      const addDebtParams = mockAddManyDebtParams(5)
      const debtIds = addDebtParams.map(d => d.debtId)
      addDebtParams.push(addDebtParams[0])
      const insertedIds = await sut.addMany(addDebtParams)
      expect(insertedIds).toEqual(debtIds)
      expect(insertedIds).toHaveLength(5)
    })
  })

  describe('close()', () => {
    test('Should update inserted debt on success', async () => {
      const sut = makeSut()
      const addDebtParams = mockAddManyDebtParams(1)
      await sut.addMany(addDebtParams)
      const [debt] = addDebtParams
      const closeDebtParams = mockCloseDebtParams(debt.debtId)
      const result = await sut.close(closeDebtParams)
      expect(result).toBe(true)
    })

    test('Should not insert on non-existent debts', async () => {
      const sut = makeSut()
      const closeDebtParamsWithDebtSaved = mockCloseDebtParams()
      const result = await sut.close(closeDebtParamsWithDebtSaved)
      expect(result).toBe(false)
    })
  })
})
