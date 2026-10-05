import {mkdir, readFile, writeFile} from 'node:fs/promises'
import {dirname, join} from 'node:path'

export interface DbUser {
    id: number,
    name: string,
    email: string,
    passwordHash: string,
    createdAt: string
}

export interface DbLearnedWord {
    userId: number,
    wordId: number,
    learnedAt: string
}

export type RoundStatus = 'active' | 'correct' | 'revealed'

export interface DbRound {
    id: number,
    userId: number,
    wordId: number,
    attemptsUsed: number,
    status: RoundStatus
}

interface Database {
    users: DbUser[]
    learnedWords: DbLearnedWord[]
    rounds: DbRound[]
}

const dbPath = join(process.cwd(), 'data', 'db.json')

function emptyDb(): Database {
    return {users: [], learnedWords: [], rounds: []}
}

let queue: Promise<unknown> = Promise.resolve()

function enqueue<T>(task: () => Promise<T>): Promise<T> {
    const run = queue.then(task, task)
    queue = run.then(() => undefined, () => undefined)
    return run
}


async function load(): Promise<Database> {
    try {
      const raw = await readFile(dbPath, 'utf8')
      return JSON.parse(raw) as Database
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
      const db = emptyDb()
      await mkdir(dirname(dbPath), { recursive: true })
      await writeFile(dbPath, JSON.stringify(db, null, 2))
      return db
    }
  }
  export function readDb() {
    return enqueue(() => load())
  }
  export function updateDb(change: (db: Database) => void) {
    return enqueue(async () => {
      const db = await load()
      change(db)
      await writeFile(dbPath, JSON.stringify(db, null, 2))
      return db
    })
  }