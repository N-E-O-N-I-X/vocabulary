import style from './LetterGroups.module.css'
import { WordCard } from '../WordCard'
import { useDictionary } from '../../hooks/useDictionary'
import type { Word } from '../../hooks/useDictionary'
import { useState } from 'react'

export const LetterGroups = () => {
  const { grouped } = useDictionary()
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})

  const toggleGroup = (letter: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [letter]: !prev[letter],
    }))
  }

  return (
    <div className={style.groups}>
      {Object.entries(grouped).map(([letter, groupWords]) => {
        const isOpen = openGroups[letter] !== false

        return (
          <section key={letter} className={style.group}>
            <button
              className={style.header}
              onClick={() => toggleGroup(letter)}
              aria-expanded={isOpen}
            >
              <span className={style.summary}>
                <span className={style.letter}>{letter}</span>
              </span>
              <svg
                className={`${style.arrow} ${isOpen ? style.open : ''}`}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <div className={`${style.words} ${isOpen ? style.open : style.closed}`}>
              {groupWords.map((word: Word) => (
                <WordCard key={word.word} word={word} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
