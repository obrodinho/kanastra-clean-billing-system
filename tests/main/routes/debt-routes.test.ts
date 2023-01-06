import { MongoHelper } from '@/infra/db'
import { setupApp } from '@/main/config/app'

import { Collection } from 'mongodb'
import { Express } from 'express'
import request from 'supertest'

let debtCollection: Collection
let app: Express

describe('Debt Routes', () => {
  beforeAll(async () => {
    app = await setupApp()
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    debtCollection = MongoHelper.getCollection('debts')
    await debtCollection.deleteMany({})
  })

  describe('POST /debts', () => {
    test('Should return 200 on Debt Addition', async () => {
      await request(app)
        .post('/api/debts')
        .send({
          fileContents: 'name,governmentId,email,debtAmount,debtDueDate,debtId\n' +
              'John Doe,11111111111,johndoe@kanastra.com.br,1000000.00,2022-10-12,8291'
        })
        .expect(200)
    })

    test('Should return 400 on empty list', async () => {
      await request(app)
        .post('/api/debts')
        .send('')
        .expect(400)
    })

    test('Should return 400 on invalid data', async () => {
      await request(app)
        .post('/api/debts')
        .send({})
        .expect(400)

      await request(app)
        .post('/api/debts')
        .send({ fileContents: undefined })
        .expect(400)
    })
  })
})
