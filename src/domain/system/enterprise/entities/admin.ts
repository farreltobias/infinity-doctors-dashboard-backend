import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/value-object/unique-entity-id'

export interface AdminProps {
  firstName: string
  lastName: string
  email: string
  password: string
}

export class Admin extends Entity<AdminProps> {
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

  static create(props: AdminProps, id?: UniqueEntityID) {
    return new Admin(props, id)
  }
}
