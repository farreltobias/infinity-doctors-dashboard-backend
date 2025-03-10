import { createHash } from 'node:crypto'
import { hostname } from 'node:os'

export class UniqueEntityID {
  private value: string

  toString(): string {
    return this.value
  }

  toValue(): string {
    return this.value
  }

  constructor(value?: string) {
    this.value = value ?? this.getObjectId()
  }

  equals(id: UniqueEntityID): boolean {
    return id.toValue() === this.value
  }

  private getObjectId() {
    const secondInHex = Math.floor(new Date().getTime() / 1000).toString(16)
    const machineId = createHash('md5')
      .update(hostname())
      .digest('hex')
      .slice(0, 6)
    const processId = process.pid.toString(16).slice(0, 4).padStart(4, '0')
    const counter = process
      .hrtime()[1]
      .toString(16)
      .slice(0, 6)
      .padStart(6, '0')

    return secondInHex + machineId + processId + counter
  }
}
