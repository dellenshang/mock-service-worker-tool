import {
  MswHandler,
  createhandlers
} from '../index'
import { setupServer } from 'msw/node'
export const server = (handlers: MswHandler[]) => {
  setupServer(...createhandlers(handlers))
}
