import { UniqueEntityID } from '@/core/entities/value-object/unique-entity-id'

export abstract class Entity<T> {
  private readonly _id: UniqueEntityID
  protected props: T

  get id() {
    return this._id
  }

  protected constructor(props: T, id?: UniqueEntityID) {
    this.props = props
    this._id = id ?? new UniqueEntityID()
  }

  // biome-ignore lint/suspicious/noExplicitAny: the equals comparator should check any other type
  public equals(entity: Entity<any>): boolean {
    if (entity === this) {
      return true
    }

    return entity.id === this._id
  }
}
