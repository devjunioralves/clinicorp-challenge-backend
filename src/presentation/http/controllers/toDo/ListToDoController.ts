import { inject, injectable } from 'tsyringe'

import BaseController from '@shared/http/controller/BaseController'

import ToDoAppService from '@application/todo/ToDoAppService'
import { tokens } from '@di/tokens'
import { IRequest } from '@presentation/http/types/IRequest'
import { BaseError } from '@shared/exceptions/BaseError'

@injectable()
export default class ListToDoController extends BaseController {
  constructor(
    @inject(tokens.ToDoAppService)
    private toDoAppService: ToDoAppService
  ) {
    super()
  }

  public async execute(request: IRequest) {
    try {
      const result = await this.toDoAppService.list()
      return this.send(result)
    } catch (err) {
      return this.error(err as BaseError)
    }
  }
}
