import {
  addManyDebtPath,
  closeDebtPath
} from './paths/'

export default {
  '/debts': addManyDebtPath,
  '/debt/close': closeDebtPath
}
