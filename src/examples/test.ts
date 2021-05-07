function asdas<T>(value: T): T[] {
  return [value]
}

const lllklkl = <T>(value: T): T[] => {
  return [value]
}

interface saddsa<T> {
  (value: T): T[]
}

const funcTest123: saddsa<string> = () => {
  return ['1']
}

function funcTest145<T extends keyof any>(value: T): T[] {
  return [value]
}
