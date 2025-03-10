import type { UniqueEntityID } from '@/core/entities/value-object/unique-entity-id'
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AggregateRoot } from '../entities/aggregate-root'
import type { DomainEvent } from './domain-event'

// biome-ignore lint/suspicious/noExplicitAny: any event callback
type DomainEventCallback = (event: any) => void
// biome-ignore lint/suspicious/noExplicitAny: Generic AggregateRoot
type GenericAggregateRoot = AggregateRoot<any>

export class DomainEvents {
  private static handlersMap: Record<string, DomainEventCallback[]> = {}
  private static markedAggregates: GenericAggregateRoot[] = []

  public static shouldRun = true

  public static markAggregateForDispatch(aggregate: GenericAggregateRoot) {
    const aggregateFound = !!DomainEvents.findMarkedAggregateByID(aggregate.id)

    if (!aggregateFound) {
      DomainEvents.markedAggregates.push(aggregate)
    }
  }

  private static dispatchAggregateEvents(aggregate: GenericAggregateRoot) {
    for (const event of aggregate.domainEvents) {
      DomainEvents.dispatch(event)
    }
  }

  private static removeAggregateFromMarkedDispatchList(
    aggregate: GenericAggregateRoot,
  ) {
    const index = DomainEvents.markedAggregates.findIndex((a) =>
      a.equals(aggregate),
    )

    DomainEvents.markedAggregates.splice(index, 1)
  }

  private static findMarkedAggregateByID(
    id: UniqueEntityID,
  ): GenericAggregateRoot | undefined {
    return DomainEvents.markedAggregates.find((aggregate) =>
      aggregate.id.equals(id),
    )
  }

  public static dispatchEventsForAggregate(id: UniqueEntityID) {
    const aggregate = DomainEvents.findMarkedAggregateByID(id)

    if (aggregate) {
      DomainEvents.dispatchAggregateEvents(aggregate)
      aggregate.clearEvents()
      DomainEvents.removeAggregateFromMarkedDispatchList(aggregate)
    }
  }

  public static register(
    callback: DomainEventCallback,
    eventClassName: string,
  ) {
    const wasEventRegisteredBefore = eventClassName in DomainEvents.handlersMap

    if (!wasEventRegisteredBefore) {
      DomainEvents.handlersMap[eventClassName] = []
    }

    DomainEvents.handlersMap[eventClassName].push(callback)
  }

  public static clearHandlers() {
    DomainEvents.handlersMap = {}
  }

  public static clearMarkedAggregates() {
    DomainEvents.markedAggregates = []
  }

  private static dispatch(event: DomainEvent) {
    const eventClassName: string = event.constructor.name

    const isEventRegistered = eventClassName in DomainEvents.handlersMap

    if (!DomainEvents.shouldRun) {
      return
    }

    if (isEventRegistered) {
      const handlers = DomainEvents.handlersMap[eventClassName]

      for (const handler of handlers) {
        handler(event)
      }
    }
  }
}
