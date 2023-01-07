import { DbCloseDebt } from '@/data/usecases'
import { mockCloseDebtParams, throwError } from '@/tests/domain/mocks'
import { CloseDebtRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbCloseDebt
  closeDebt: CloseDebtRepositorySpy
}

const makeSut = (): SutTypes => {
  const closeDebtRepositorySpy = new CloseDebtRepositorySpy()
  const sut = new DbCloseDebt(closeDebtRepositorySpy)
  return {
    sut,
    closeDebt: closeDebtRepositorySpy
  }
}

describe('DbCloseDebt Use case', () => {
  test('Should call CloseDebtRepository with correct values', async () => {
    const { sut, closeDebt } = makeSut()
    const paymentData = mockCloseDebtParams()
    await sut.close(paymentData)
    expect(closeDebt.paymentData).toEqual({
      paidBy: paymentData.paidBy,
      debtId: paymentData.debtId,
      paidAmount: paymentData.paidAmount,
      paidAt: paymentData.paidAt
    })
  })

  test('Should throw if CloseDebtRepository throws', async () => {
    const { sut, closeDebt } = makeSut()
    jest.spyOn(closeDebt, 'close').mockImplementationOnce(throwError)
    const paymentData = mockCloseDebtParams()
    const promise = sut.close(paymentData)
    await expect(promise).rejects.toThrow()
  })
})
