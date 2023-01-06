import {
  addManyDebtPath,
  closeDebtPath
} from './paths/'

export default {
  '/debts': addManyDebtPath,
  '/payment': closeDebtPath
}
