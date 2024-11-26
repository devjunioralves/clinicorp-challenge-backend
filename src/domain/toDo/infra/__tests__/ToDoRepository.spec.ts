import { ICreateToDo } from '@domain/toDo/types/ICreateToDo'
import { FirestoreConnection } from '@infra/firestore/FirestoreConnection'
import { ITask } from '../../entities/Task'
import ToDoRepository from '../ToDoRepository'

jest.mock('@infra/firestore/FirestoreConnection')

describe('ToDoRepository', () => {
  let mockFirestoreConnection: jest.Mocked<FirestoreConnection>
  let toDoRepository: ToDoRepository

  beforeEach(() => {
    mockFirestoreConnection =
      new FirestoreConnection() as jest.Mocked<FirestoreConnection>
    toDoRepository = new ToDoRepository(mockFirestoreConnection)
  })

  describe('create', () => {
    it('should call addDocuments with correct parameters', async () => {
      const mockData: ICreateToDo = {
        description: 'Test task',
        responsable: 'John Doe',
        status: 'todo',
      }

      await toDoRepository.create(mockData)

      expect(mockFirestoreConnection.addDocuments).toHaveBeenCalledWith(
        'tasks',
        [mockData]
      )
    })

    it('should throw an error if addDocuments fails', async () => {
      const mockData: ICreateToDo = {
        description: 'Test task',
        responsable: 'John Doe',
        status: 'todo',
      }

      mockFirestoreConnection.addDocuments.mockRejectedValue(
        new Error('Firestore error')
      )

      await expect(toDoRepository.create(mockData)).rejects.toThrow(
        'Firestore error'
      )
      expect(mockFirestoreConnection.addDocuments).toHaveBeenCalledWith(
        'tasks',
        [mockData]
      )
    })
  })

  describe('list', () => {
    it('should return tasks filtered by hostname', async () => {
      const hostname = 'test-host'
      const mockTasks: ITask[] = [
        {
          id: '1',
          description: 'Task 1',
          responsable: 'John',
          status: 'todo',
          hostname,
        },
        {
          id: '2',
          description: 'Task 2',
          responsable: 'Jane',
          status: 'done',
          hostname,
        },
      ]

      mockFirestoreConnection.getDocuments.mockResolvedValue(mockTasks)

      const result = await toDoRepository.list(hostname)

      expect(mockFirestoreConnection.getDocuments).toHaveBeenCalledWith(
        'tasks',
        hostname
      )
      expect(result).toEqual(mockTasks)
    })

    it('should return an empty array if no tasks are found', async () => {
      const hostname = 'non-existent-host'

      mockFirestoreConnection.getDocuments.mockResolvedValue([])

      const result = await toDoRepository.list(hostname)

      expect(mockFirestoreConnection.getDocuments).toHaveBeenCalledWith(
        'tasks',
        hostname
      )
      expect(result).toEqual([])
    })

    it('should throw an error if getDocuments fails', async () => {
      const hostname = 'test-host'

      mockFirestoreConnection.getDocuments.mockRejectedValue(
        new Error('Firestore error')
      )

      await expect(toDoRepository.list(hostname)).rejects.toThrow(
        'Firestore error'
      )
      expect(mockFirestoreConnection.getDocuments).toHaveBeenCalledWith(
        'tasks',
        hostname
      )
    })
  })
})
