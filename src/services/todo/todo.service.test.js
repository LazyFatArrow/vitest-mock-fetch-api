import { describe, test, expect, vi, beforeEach } from 'vitest'
import { createTodo, fetchTodoList } from './todo.service'

global.fetch = vi.fn()

function createFetchResponse(data) {
  return { json: () => new Promise((resolve) => resolve(data)) }
}

describe('Todo Service', () => {
  beforeEach(() => {
    global.fetch.mockReset()
  })

  test('makes a GET request to fetch todo list and returns the result', async () => {
    const response = [
      {
        title: 'Unit test',
        done: false,
      },
    ]
    const token = 'token'

    fetch.mockResolvedValue(createFetchResponse(response))

    const todoList = await fetchTodoList({ token })

    expect(fetch).toHaveBeenCalledWith(
      'https://imaginary-todos-api.com/api/v1/todos',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    expect(todoList).toStrictEqual(response)
  })

  test('makes a POST request to create a todo', async () => {
    const token = 'token'
    const todo = {}
    const response = {
      id: 'random-id',
      ...todo,
    }

    fetch.mockResolvedValue(createFetchResponse(response))

    const newTodo = await createTodo({
      token,
      todo,
    })

    expect(fetch).toHaveBeenCalledWith(
      'https://imaginary-todos-api.com/api/v1/todos',
      {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
    expect(newTodo).toStrictEqual(response)
  })
})
