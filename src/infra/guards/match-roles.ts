export const matchRoles = (roles: string[], userRoles: string[]): boolean => {
  return roles.some((role) => userRoles.includes(role))
}
