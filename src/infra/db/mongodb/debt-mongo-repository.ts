import { MongoHelper } from '@/infra/db'
import { AddManyDebtRepository, CloseDebtRepository } from '@/data/protocols/db'
import { Document, MongoServerError } from 'mongodb'

export class DebtMongoRepository implements AddManyDebtRepository, CloseDebtRepository {
  private readonly collection = 'debts'

  async close (paymentData: CloseDebtRepository.Params): Promise<CloseDebtRepository.Result> {
    const _id = paymentData.debtId
    const debtsCollection = MongoHelper.getCollection(this.collection)
    const debt: Document = await debtsCollection.findOne({ _id })
    if (!debt) {
      return false
    }

    const payments = (debt?.payments || []).push(paymentData)

    const result = await debtsCollection.updateOne({ _id }, { $set: { payments } })

    return !!result.modifiedCount
  }

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
