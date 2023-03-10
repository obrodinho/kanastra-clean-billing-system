import { CloseDebt } from '@/domain/usecases'
import { CloseDebtRepository } from '@/data/protocols'

export class DbCloseDebt implements CloseDebt {
  constructor (private readonly closeDebtRepository: CloseDebtRepository) {}

  async close (paymentData: CloseDebt.Params): Promise<CloseDebt.Result> {
    return this.closeDebtRepository.close(paymentData)
  }
}
