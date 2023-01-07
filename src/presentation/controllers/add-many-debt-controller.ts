import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, serverError, ok } from '@/presentation/helpers'
import { CsvParser } from '@/utils/protocols'
import { AddDebt, AddManyDebt } from '@/domain/usecases'

export class AddManyDebtController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly csvParser: CsvParser,
    private readonly addDebt: AddManyDebt
  ) {}

  async handle (request: AddManyDebtController.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { fileContents } = request

      const debtRows = await this.csvParser.parse(fileContents)
      const debts = debtRows as AddDebt.Params[]
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
  export type Params = {
    fileContents: any
  }
}
