import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, serverError, ok } from '@/presentation/helpers'
import { CloseDebt } from '@/domain/usecases'

export class CloseDebtController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly closeDebt: CloseDebt
  ) {}

  async handle (request: CloseDebtController.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const result = await this.closeDebt.close(request)

      return ok({
        success: result
      })
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace CloseDebtController {
  export type Params = CloseDebt.Params
}
