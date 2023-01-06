import {UpdateDebt} from '@/domain/usecases'
import {UpdateDebtRepository, LoadDebtRepository} from '@/data/protocols'

export class DbUpdateDebt implements UpdateDebt {
    constructor(
        private readonly updateDebtRepository: UpdateDebtRepository,
        private readonly loadDebtRepository: LoadDebtRepository,
    ) {
    }

    async update(id: string, data: UpdateDebt.Params): Promise<UpdateDebt.Result> {
        const debt = await this.loadDebtRepository.getById(id)
        const {debtId, ...debtValues} = debt
        const changes = Object.assign(data, debtValues)
        return this.updateDebtRepository.update(id, changes)
    }
}
