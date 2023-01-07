import {
  makeCloseDebtValidation,
  makeLogControllerDecorator,
  makeDbCloseDebt
} from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { CloseDebtController } from '@/presentation/controllers'

export const makeCloseDebtController = (): Controller => {
  const controller = new CloseDebtController(makeCloseDebtValidation(), makeDbCloseDebt())
  return makeLogControllerDecorator(controller)
}
