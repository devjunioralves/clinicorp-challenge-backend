import { tokens } from '@di/tokens'
import { Routes } from '@presentation/http/Routes'
import { container } from 'tsyringe'

const childContainer = container.createChildContainer()

childContainer.registerSingleton(tokens.Routes, Routes)

import ToDoAppService from '@application/todo/ToDoAppService'
import ToDoRepository from '@domain/toDo/infra/ToDoRepository'
import ToDoService from '@domain/toDo/services/ToDoService'
import { FirestoreConnection } from '@infra/firestore/FirestoreConnection'
import CreateToDoController from '@presentation/http/controllers/toDo/CreateToDoController'
import ListToDoController from '@presentation/http/controllers/toDo/ListToDoController'
import { ToDoRouter } from '@presentation/http/routes/ToDoRouter'

childContainer.registerSingleton(tokens.ToDoRouter, ToDoRouter)
childContainer.registerSingleton(
  tokens.CreateToDoController,
  CreateToDoController
)

childContainer.registerSingleton(tokens.ListToDoController, ListToDoController)

childContainer.registerSingleton(tokens.ToDoAppService, ToDoAppService)
childContainer.registerSingleton(tokens.ToDoService, ToDoService)
childContainer.registerSingleton(tokens.ToDoRepository, ToDoRepository)
childContainer.registerSingleton(
  tokens.FirestoreConnection,
  FirestoreConnection
)

export { childContainer as container }
