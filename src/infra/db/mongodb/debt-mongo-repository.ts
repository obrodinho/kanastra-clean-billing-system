import { MongoHelper } from '@/infra/db'
import { AddManyDebtRepository } from '@/data/protocols/db'
import { Document, MongoServerError } from 'mongodb'

export class DebtMongoRepository implements AddManyDebtRepository {
  private readonly collection = 'debts'

  async addMany (debts: AddManyDebtRepository.Params[]): Promise<AddManyDebtRepository.Result> {
    const insertedDebtIds = []
    const debtsCollection = MongoHelper.getCollection(this.collection)
    for (const debt of debts) {
      const doc: Document = { ...debt, _id: debt.debtId }
      try {
        const insertOneResult = await debtsCollection.insertOne(doc)
        insertedDebtIds.push(insertOneResult.insertedId)
      } catch (e) {
        if (e instanceof MongoServerError && e.code === 11000) {
          continue
        }
      }
    }

    return insertedDebtIds
  }
}
