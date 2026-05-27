export type Result<T> =
  | { status: 'success'; data: T }
  | { status: 'notFound'; message?: string | null }
  | { status: 'failed'; message: string };


