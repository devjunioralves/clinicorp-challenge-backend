import { tokens } from '@di/tokens'
import { FirestoreConnection } from '@infra/firestore/FirestoreConnection'
import { inject, injectable } from 'tsyringe'
import { ITask } from '../entities/Task'
import { ICreateToDo } from '../types/ICreateToDo'
import { IToDoRepository } from '../types/IToDoRepository'

@injectable()
export default class ToDoRepository implements IToDoRepository {
  constructor(
    @inject(tokens.FirestoreConnection)
    private firestoreConnection: FirestoreConnection
  ) {}

  async create(data: ICreateToDo): Promise<void> {
    await this.firestoreConnection.addDocuments('tasks', [data])
  }

  async list(hostname: string): Promise<ITask[]> {
    return (await this.firestoreConnection.getDocuments(
      'tasks',
      hostname
    )) as ITask[]
  }
}
