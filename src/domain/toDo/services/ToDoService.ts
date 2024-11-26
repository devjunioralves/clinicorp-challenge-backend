import { tokens } from '@di/tokens'
import os from 'os'
import { inject, injectable } from 'tsyringe'
import { ITask } from '../entities/Task'
import { ICreateToDo } from '../types/ICreateToDo'
import { IToDoRepository } from '../types/IToDoRepository'
import { IToDoService } from '../types/IToDoService'

@injectable()
export default class ToDoService implements IToDoService {
  constructor(
    @inject(tokens.ToDoRepository)
    private toDoRepository: IToDoRepository
  ) {}

  public async create(data: ICreateToDo): Promise<void> {
    try {
      const hostname = os.hostname()
      const dataWithHostname = { ...data, hostname }
      await this.toDoRepository.create(dataWithHostname)
    } catch (error) {
      console.error('Error creating task:', error)
      throw new Error('Error creating task')
    }
  }

  public async list(): Promise<ITask[]> {
    try {
      const hostname = os.hostname()
      return await this.toDoRepository.list(hostname)
    } catch (error) {
      console.error('Error listing tasks:', error)
      throw new Error('Error listing tasks')
    }
  }
}
