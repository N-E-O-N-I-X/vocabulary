import { useState } from 'react'
import style from './WordCard.module.css'
import type { Word } from '../../hooks/useDictionary'

interface Props {
  word: Word
}

export const WordCard = ({ word }: Props) => {
  const [showExample, setShowExample] = useState(false) // ← НОВОЕ

  const posColors: Record<string, string> = {
    местоимение: 'var(--pos-местоимение)',
    существительное: 'var(--pos-существительное)',
    глагол: 'var(--pos-глагол)',
    прилагательное: 'var(--pos-прилагательное)',
    наречие: 'var(--pos-наречие)',
    союз: 'var(--pos-союз)',
    частица: 'var(--pos-частица)',
    'союз, частица': 'var(--pos-союз)',
    'частица, союз': 'var(--pos-союз)',
    'союз, наречие': 'var(--pos-союз)',
  }

  const posColor = posColors[word['part of speech']] || 'var(--pos-default)'

  const toggleExample = () => {
    setShowExample(prev => !prev)
  }

  return (
    <article
      className={`${style.card} ${showExample ? style.expanded : ''}`}
      data-word={word.word}
      onClick={toggleExample}
      role="button"
      tabIndex={0}
      aria-expanded={showExample}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggleExample()
        }
      }}
    >
      <header className={style.header}>
        <h3 className={style.word}>{word.word}</h3>
        <span 
          className={style.pos} 
          style={{ '--pos-color': posColor } as React.CSSProperties}
        >
          {word['part of speech']}
        </span>
      </header>

      <p className={style.description}>{word.description}</p>

      {word.example && (
        <blockquote className={`${style.example} ${showExample ? style.show : ''}`}>
          "{word.example}"
        </blockquote>
      )}
    </article>
  )
}