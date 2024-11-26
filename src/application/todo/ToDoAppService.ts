import { tokens } from '@di/tokens'
import { ITask } from '@domain/toDo/entities/Task'
import { ICreateToDo } from '@domain/toDo/types/ICreateToDo'
import { IToDoService } from '@domain/toDo/types/IToDoService'
import { inject, injectable } from 'tsyringe'

@injectable()
export default class ToDoAppService {
  constructor(
    @inject(tokens.ToDoService)
    private toDoService: IToDoService
  ) {}
  async create(data: ICreateToDo): Promise<void> {
    await this.toDoService.create(data)
  }

  async list(): Promise<ITask[]> {
    return await this.toDoService.list()
  }
}
