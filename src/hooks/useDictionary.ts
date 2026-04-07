import { useState, useEffect, useCallback } from 'react'

interface Word {
  word: string
  "part of speech": string
  description: string
  example?: string
  image?: string
}

type PosType = Word["part of speech"]

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
  const [activeLetter, setActiveLetter] = useState('А')

  useEffect(() => {
    fetch('/data/words.json')
      .then(res => res.json())
      .then((data: { words: Word[] }) => {
        const words = data.words   
          const sorted = words.sort((a, b) => 
            a.word.localeCompare(b.word, 'ru')
          )
          const letters = Array.from(
            new Set(sorted.map(w => w.word[0].toUpperCase()))
          ).sort()
          
          const grouped: Record<string, Word[]> = {}
          letters.forEach(letter => {
            grouped[letter] = sorted.filter(w => 
              w.word.toUpperCase().startsWith(letter)
            )
          })

          setData({ words: sorted, letters, grouped })
          if (letters[0]) setActiveLetter(letters[0])
        })
  }, [])

  const filteredWords = useCallback(() => {
    if (!search.trim()) {
      return data.grouped[activeLetter] || []
    }
    
    const query = search.toLowerCase().trim()
    return data.words.filter(word =>
      word.word.toLowerCase().includes(query) ||
      word.description.toLowerCase().includes(query)
    )
  }, [data.words, data.grouped, activeLetter, search])

  return {
    words: filteredWords(),
    allWords: data.words,
    letters: data.letters,
    grouped: data.grouped,
    activeLetter,
    setActiveLetter,
    search,
    setSearch,
    hasData: data.words.length > 0,
    loading: data.words.length === 0 && data.letters.length === 0
  }
}

export type { Word, PosType }
export { useDictionary }