import { useState, useEffect, useCallback } from 'react'

interface Word {
  word: string
  'part of speech': string
  description: string
  example?: string
}

type PosType = Word['part of speech']

interface DictionaryData {
  words: Word[]
  letters: string[]
  grouped: Record<string, Word[]>
}

const useDictionary = () => {
  const [data, setData] = useState<DictionaryData>({
    words: [],
    letters: [],
    grouped: {},
  })
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/data/words.json')
      .then((res) => res.json())
      .then((raw: { words: Word[] }) => {
        const words = raw.words.sort((a, b) => a.word.localeCompare(b.word, 'ru'))
        const letters = Array.from(new Set(words.map((w) => w.word[0].toUpperCase()))).sort()

        const grouped: Record<string, Word[]> = {}
        letters.forEach((letter) => {
          grouped[letter] = words.filter((w) => w.word.toUpperCase().startsWith(letter))
        })

        setData({ words, letters, grouped })
      })
  }, [])

  const filteredWords = useCallback(() => {
    if (!search.trim()) return []
    const query = search.toLowerCase().trim()
    return data.words
      .filter(
        (word) =>
          word.word.toLowerCase().includes(query) || word.description.toLowerCase().includes(query),
      )
      .slice(0, 20)
  }, [data.words, search])

  return {
    words: filteredWords(),
    allWords: data.words,
    letters: data.letters,
    grouped: data.grouped,
    search,
    setSearch,
    hasData: data.words.length > 0,
    loading: data.words.length === 0,
  }
}

export type { Word, PosType }
export { useDictionary }
