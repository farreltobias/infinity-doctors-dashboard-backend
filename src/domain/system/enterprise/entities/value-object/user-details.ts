import { ValueObject } from '@/core/entities/value-object/value-object'
import type { Nullable } from '@/core/types/nullable'

export interface UserDetailsProps {
  firstName: string
  lastName: string
  email: string
  partner: Nullable<string>
}

export class UserDetails extends ValueObject<UserDetailsProps> {
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

  get partner() {
    return this.props.partner
  }

  static create(props: UserDetailsProps) {
    return new UserDetails(props)
  }
}
