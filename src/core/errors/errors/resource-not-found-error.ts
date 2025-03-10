import type { UseCaseError } from '@/core/errors/use-case-error'

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor(resource = 'Resource') {
    super(`${resource} not found.`)
  }
}
