import { MongoHelper } from '@/infra/db'
import { AddManyDebtRepository } from '@/data/protocols/db'

export class DebtMongoRepository implements AddManyDebtRepository {
  private readonly collection = 'debts'

  async addMany (debts: AddManyDebtRepository.Params[]): Promise<AddManyDebtRepository.Result> {
    const debtsCollection = MongoHelper.getCollection(this.collection)
    const result = await debtsCollection.insertMany(debts)
    const { insertedIds } = result
    const insertedDebtIds = []
    for (const [insertedId] of new Map(Object.entries(insertedIds))) {
      insertedDebtIds.push(insertedId.toString())
    }

    return insertedDebtIds
  }
}
