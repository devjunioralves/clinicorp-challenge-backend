import ToDoAppService from '@application/todo/ToDoAppService'
import { IToDoService } from '@domain/toDo/types/IToDoService'
import { BaseError } from '@shared/exceptions/BaseError'
import { container } from 'tsyringe'
import CreateToDoController from '../CreateToDoController'

describe('CreateToDoController', () => {
  let createToDoController: CreateToDoController
  let mockToDoAppService: ToDoAppService
  let mockToDoService: jest.Mocked<IToDoService>

  beforeEach(() => {
    mockToDoService = {
      create: jest.fn(),
      list: jest.fn(),
    }

    mockToDoAppService = new ToDoAppService(mockToDoService)

    container.registerInstance('ToDoAppService', mockToDoAppService)

    createToDoController = new CreateToDoController(mockToDoAppService)
  })

  describe('execute', () => {
    it('should call ToDoAppService.create with correct data and return success response', async () => {
      const request = {
        body: {
          description: 'Task 1',
          responsable: 'John Doe',
          status: 'todo',
        },
        params: {},
        query: {},
        headers: {},
      }

      jest.spyOn(mockToDoAppService, 'create').mockResolvedValueOnce(undefined)

      const response = await createToDoController.execute(request)

      expect(mockToDoAppService.create).toHaveBeenCalledWith({
        description: 'Task 1',
        responsable: 'John Doe',
        status: 'todo',
      })
      expect(response).toEqual({})
    })

    it('should handle errors and return error response when ToDoAppService.create throws a BaseError', async () => {
      const request = {
        body: {
          description: 'Task 1',
          responsable: 'John Doe',
          status: 'todo',
        },
        params: {},
        query: {},
        headers: {},
      }

      const error = new BaseError({
        message: 'Invalid data',
        statusCode: 400,
      })

      jest.spyOn(mockToDoAppService, 'create').mockRejectedValueOnce(error)

      const response = await createToDoController.execute(request)

      expect(mockToDoAppService.create).toHaveBeenCalledWith({
        description: 'Task 1',
        responsable: 'John Doe',
        status: 'todo',
      })
      expect(response).toEqual({
        error: {
          code: 400,
          message: {
            type: 'BaseError',
            value: 'Invalid data',
          },
        },
      })
    })
  })
})
