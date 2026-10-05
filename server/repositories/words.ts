import {words} from '../data/words'

export function getWords() {
    return words
}


export function findWordById(id: number){
    return words.find((word) => word.id === id) ?? null
}