import { adaptRoute } from '@/main/adapters'
import { makeAddManyDebtController, makeCloseDebtController } from '@/main/factories'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/debts', adaptRoute(makeAddManyDebtController()))
  router.post('/debt/close', adaptRoute(makeCloseDebtController()))
}
