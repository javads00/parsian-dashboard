export type RoutePageFallbackProps = {
  variant?: 'dashboard' | 'login'
}

export type TablePaginationProps = {
  total?: number
  page: number
  onPageChange?: (page: number) => void
}
