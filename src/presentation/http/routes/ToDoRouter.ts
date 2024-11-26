import { Router } from 'express'

import BaseController from '@shared/http/controller/BaseController'
import BaseRouter from '@shared/http/controller/BaseRouter'

import { tokens } from '@di/tokens'
import { inject, injectable } from 'tsyringe'

import { IRouter } from './IRouter'

@injectable()
export class ToDoRouter extends BaseRouter implements IRouter {
  constructor(
    @inject(tokens.CreateToDoController)
    private createToDoController: BaseController,
    @inject(tokens.ListToDoController)
    private listToDoController: BaseController
  ) {
    super(Router())
  }

  setup(): Router {
    this.post('/v1/todo', this.createToDoController)
    this.get('/v1/todo', this.listToDoController)
    return this.getRouter()
  }
}
