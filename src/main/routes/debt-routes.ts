import { adaptRoute } from '@/main/adapters'
import { makeAddManyDebtController } from '@/main/factories'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/debts', adaptRoute(makeAddManyDebtController()))
}
