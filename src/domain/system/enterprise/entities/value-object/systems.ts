export type SystemType = 'patients' | 'admin'

export class Systems {
  private value: SystemType[] = []

  private constructor(value: SystemType[]) {
    this.value = value
  }

  static create(status: SystemType[]) {
    return new Systems(status)
  }

  has(system: SystemType) {
    return this.value.includes(system)
  }

  remove(system: SystemType) {
    this.value = this.value.filter((s) => s !== system)
  }

  add(system: SystemType) {
    this.value.push(system)
  }

  toValue() {
    return this.value
  }
}
