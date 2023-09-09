interface ApiResponse<T> {
  data: T
  message?: string
}

interface WithPagination<T> {
  total: number
  per_page: number
  current_page: number
  last_page: number
  data: T
}

interface User {
  id: number
  name: string
  username: string
  _count: {
    contacts: number
  }
}
