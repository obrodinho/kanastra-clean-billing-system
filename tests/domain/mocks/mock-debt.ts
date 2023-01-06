import { AddDebt } from '@/domain/usecases'

import faker from 'faker'

export const mockAddDebtParams = (faker): AddDebt.Params => ({
  debtId: faker.finance.account(9),
  debtAmount: faker.datatype.number({ max: 1e6, mi: 1e3, precision: 2 }),
  debtDueDate: faker.date.between('2019-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z'),
  email: faker.internet.email(
    faker.name.firstName(),
    faker.name.lastName(),
    'kanastra.com.br',
    { allowSpecialCharacters: false }
  ),
  governmentId: faker.datatype.number().toString(),
  name: faker.name.findName()
})

export const mockAddManyDebtParams = (length): AddDebt.Params[] => {
  return [...Array(length).keys()].map((_) => mockAddDebtParams(faker))
}
