import { tokens } from '@di/tokens'
import { IRouter } from '@presentation/http/routes/IRouter'
import { Router } from 'express'
import { inject, injectable } from 'tsyringe'

@injectable()
export class Routes {
  constructor(
    @inject(tokens.ToDoRouter)
    private toDoRouter: IRouter
  ) {}

  public setupRouter(router: Router) {
    router.use('/api', this.toDoRouter.setup())
  }
}
