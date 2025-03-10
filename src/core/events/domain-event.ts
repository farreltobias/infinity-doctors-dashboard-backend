import type { UniqueEntityID } from '@/core/entities/value-object/unique-entity-id'

export interface DomainEvent {
  occurredAt: Date
  getAggregateId(): UniqueEntityID
}
