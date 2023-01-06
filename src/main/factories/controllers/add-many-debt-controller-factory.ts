import {
  makeAddManyDebtValidation,
  makeLogControllerDecorator,
  makeDbAddManyDebt,
  makeCsvParserAdapter
} from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { AddManyDebtController } from '@/presentation/controllers'

export const makeAddManyDebtController = (): Controller => {
  const controller = new AddManyDebtController(makeAddManyDebtValidation(), makeCsvParserAdapter(), makeDbAddManyDebt())
  return makeLogControllerDecorator(controller)
}
