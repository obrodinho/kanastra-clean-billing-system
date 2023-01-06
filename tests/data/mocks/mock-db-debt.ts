import {
  AddManyDebtRepository,
  LoadDebtRepository,
  UpdateDebtRepository,
  CloseDebtRepository
} from '@/data/protocols'

import faker from 'faker'

export class AddManyDebtRepositorySpy implements AddManyDebtRepository {
  params: AddManyDebtRepository.Params[]
  result: AddManyDebtRepository.Result = []

  async addMany (params: AddManyDebtRepository.Params[]): Promise<AddManyDebtRepository.Result> {
    this.params = params
    return this.result
  }
}

export class LoadDebtRepositorySpy implements LoadDebtRepository {
  debtId: string
  result = {
    debtId: faker.finance.account(9),
    debtAmount: faker.datatype.number({ max: 1e6, mi: 1e3 }),
    debtDueDate: faker.date.between('2019-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z'),
    email: faker.internet.email(
      faker.name.fistName(),
      faker.name.lastName(),
      'kanastra.com.br',
      { allowSpecialCharacters: false }
    ),
    governmentId: faker.datatype.number().toString(),
    name: faker.name.findName(),
    payments: [],
    status: 0
  }

  async getById (id: string): Promise<LoadDebtRepository.Result> {
    this.debtId = id
    return this.result
  }
}

export class UpdateDebtRepositorySpy implements UpdateDebtRepository {
  id: string
  changes: UpdateDebtRepository.Params
  result: boolean

  async update (id: string, changes: UpdateDebtRepository.Params): Promise<UpdateDebtRepository.Result> {
    this.id = id
    this.changes = changes
    return this.result
  }
}

export class CloseDebtRepositorySpy implements CloseDebtRepository {
  id: string
  changes: CloseDebtRepository.Params
  result: boolean

  async close (id: string, changes: CloseDebtRepository.Params): Promise<CloseDebtRepository.Result> {
    this.id = id
    this.changes = changes
    return this.result
  }
}
