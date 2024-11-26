import { ITask } from '@domain/toDo/entities/Task'
import { ICreateToDo } from '@domain/toDo/types/ICreateToDo'
import { IToDoRepository } from '@domain/toDo/types/IToDoRepository'
import os from 'os'
import ToDoService from '../ToDoService'

jest.mock('os', () => ({
  hostname: jest.fn(),
}))

describe('ToDoService', () => {
  let mockToDoRepository: jest.Mocked<IToDoRepository>
  let toDoService: ToDoService

  beforeEach(() => {
    mockToDoRepository = {
      create: jest.fn(),
      list: jest.fn(),
    }
    toDoService = new ToDoService(mockToDoRepository)
  })

  describe('create', () => {
    it('should call toDoRepository.create with data including hostname', async () => {
      const mockData: ICreateToDo = {
        description: 'Test task',
        responsable: 'John Doe',
        status: 'todo',
      }

      const hostname = 'test-host'
      ;(os.hostname as jest.Mock).mockReturnValue(hostname)

      await toDoService.create(mockData)

      expect(mockToDoRepository.create).toHaveBeenCalledWith({
        ...mockData,
        hostname,
      })
    })

    it('should throw a generic error if toDoRepository.create fails', async () => {
      const mockData: ICreateToDo = {
        description: 'Test task',
        responsable: 'John Doe',
        status: 'todo',
      }

      ;(os.hostname as jest.Mock).mockReturnValue('test-host')
      mockToDoRepository.create.mockRejectedValue(new Error('Repository error'))

      await expect(toDoService.create(mockData)).rejects.toThrow(
        'Error creating task'
      )
      expect(mockToDoRepository.create).toHaveBeenCalled()
    })
  })

  describe('list', () => {
    it('should call toDoRepository.list with hostname and return tasks', async () => {
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

      ;(os.hostname as jest.Mock).mockReturnValue(hostname)
      mockToDoRepository.list.mockResolvedValue(mockTasks)

      const result = await toDoService.list()

      expect(mockToDoRepository.list).toHaveBeenCalledWith(hostname)
      expect(result).toEqual(mockTasks)
    })

    it('should throw a generic error if toDoRepository.list fails', async () => {
      const hostname = 'test-host'

      ;(os.hostname as jest.Mock).mockReturnValue(hostname)
      mockToDoRepository.list.mockRejectedValue(new Error('Repository error'))

      await expect(toDoService.list()).rejects.toThrow('Error listing tasks')
      expect(mockToDoRepository.list).toHaveBeenCalledWith(hostname)
    })
  })
})
