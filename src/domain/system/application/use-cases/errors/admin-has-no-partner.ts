import { UseCaseError } from '@/core/errors/use-case-error'

export class AdminHasNoPartnerError extends Error implements UseCaseError {
  constructor() {
    super('Admin has no partner.')
  }
}
