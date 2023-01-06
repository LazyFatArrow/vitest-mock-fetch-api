const BASE_URL = 'https://imaginary-todos-api.com/api/v1/todos'

export async function fetchTodoList({ token }) {
  return (
    await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).json()
}

export async function createTodo({ token, todo }) {
  return (
    await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
  ).json()
}
