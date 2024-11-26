import { ITask } from '../entities/Task'
import { ICreateToDo } from './ICreateToDo'

export interface IToDoService {
  create(data: ICreateToDo): Promise<void>
  list(): Promise<ITask[]>
}
