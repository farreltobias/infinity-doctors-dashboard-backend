import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/value-object/unique-entity-id'
import { Systems } from '@/domain/system/enterprise/entities/value-object/systems'

export interface OwnerProps {
  firstName: string
  lastName: string
  email: string
  password: string
  systems: Systems
}

export class Owner extends Entity<OwnerProps> {
  get firstName() {
    return this.props.firstName
  }

  get lastName() {
    return this.props.lastName
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get systems() {
    return this.props.systems
  }

  static create(props: OwnerProps, id?: UniqueEntityID) {
    return new Owner(props, id)
  }
}
