import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, serverError, ok } from '@/presentation/helpers'
import { CsvParser } from '@/utils/protocols'
// import { DebtAlreadyNoted } from '@/presentation/errors'
import { AddDebt, AddManyDebt } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'

export class AddManyDebtController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly csvParser: CsvParser,
    private readonly addDebt: AddManyDebt
  ) {
  }

  async handle (request: AddManyDebtController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { body } = request
      if (body.length === 0) {
        return badRequest(new InvalidParamError('body'))
      }

      const debtRows = await this.csvParser.parse(body)
      const debts = debtRows as AddDebt.Params[]
      if (debts.length === 0) {
        return badRequest(new InvalidParamError('body'))
      }

      const result = await this.addDebt.addMany(debts)
      const summary = Object.fromEntries(result)

      return ok({
        success: true,
        message: `Received ${Array.from(debtRows).length} debt(s).`,
        summary
      })
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddManyDebtController {
  export type Request = {
    body: any
  }
}
