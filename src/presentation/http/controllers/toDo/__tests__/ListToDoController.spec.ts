import ToDoAppService from '@application/todo/ToDoAppService'
import { IRequest } from '@presentation/http/types/IRequest'
import { BaseError } from '@shared/exceptions/BaseError'
import 'reflect-metadata'
import ListToDoController from '../ListToDoController'

describe('ListToDoController', () => {
  let mockToDoAppService: jest.Mocked<ToDoAppService>
  let listToDoController: ListToDoController

  beforeEach(() => {
    mockToDoAppService = {
      list: jest.fn(),
    } as unknown as jest.Mocked<ToDoAppService>

    listToDoController = new ListToDoController(mockToDoAppService)
  })

  it('should return a list of tasks when service succeeds', async () => {
    const mockTasks = [
      {
        id: '1',
        description: 'Task 1',
        responsable: 'John',
        status: 'todo',
        hostname: 'host1',
      },
      {
        id: '2',
        description: 'Task 2',
        responsable: 'Doe',
        status: 'done',
        hostname: 'host2',
      },
    ]
    mockToDoAppService.list.mockResolvedValueOnce(mockTasks)

    const request: IRequest = { body: {}, params: {}, query: {}, headers: {} }
    const response = await listToDoController.execute(request)

    expect(mockToDoAppService.list).toHaveBeenCalled()
    expect(response).toEqual({
      data: mockTasks,
    })
  })

  it('should handle BaseError and return an error response', async () => {
    const baseError = new BaseError({
      message: 'Custom error',
      name: 'CustomError',
      statusCode: 400,
    })
    mockToDoAppService.list.mockRejectedValueOnce(baseError)

    const request: IRequest = { body: {}, params: {}, query: {}, headers: {} }
    const response = await listToDoController.execute(request)

    expect(mockToDoAppService.list).toHaveBeenCalled()
    expect(response).toEqual({
      error: {
        code: 400,
        message: {
          type: 'CustomError',
          value: 'Custom error',
        },
      },
    })
  })
})
