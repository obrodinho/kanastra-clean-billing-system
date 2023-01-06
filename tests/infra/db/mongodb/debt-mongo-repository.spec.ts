import { DebtMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddManyDebtParams } from '@/tests/domain/mocks'

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
})
