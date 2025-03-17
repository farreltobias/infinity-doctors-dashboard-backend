import { UserDetails } from '@/domain/system/enterprise/entities/value-object/user-details'

export class UserDetailsPresenter {
  static toHTTP(userDetails: UserDetails) {
    return {
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      fullName: userDetails.fullName,
      email: userDetails.email,
      partner: userDetails.partner || null,
    }
  }
}
