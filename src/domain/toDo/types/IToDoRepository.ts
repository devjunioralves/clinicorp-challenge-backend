import { ITask } from '../entities/Task'
import { ICreateToDo } from './ICreateToDo'

export interface IToDoRepository {
  create(data: ICreateToDo): Promise<void>
  list(hostname: string): Promise<ITask[]>
}
