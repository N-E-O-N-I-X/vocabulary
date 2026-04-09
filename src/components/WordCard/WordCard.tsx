import { useState } from 'react'
import style from './WordCard.module.css'
import type { Word } from '../../hooks/useDictionary'

interface Props {
  word: Word
}

export const WordCard = ({ word }: Props) => {
  const [showImage, setShowImage] = useState(false)

  const posColors: Record<string, string> = {
    местоимение: 'var(--pos-местоимение)',
    существительное: 'var(--pos-существительное)',
    глагол: 'var(--pos-глагол)',
    прилагательное: 'var(--pos-прилагательное)',
    наречие: 'var(--pos-наречие)',
    союз: 'var(--pos-союз)',
    частица: 'var(--pos-частица)',
    'союз, частица': 'var(--pos-союз)',
    'союз, наречие': 'var(--pos-союз)',
  }

  const posColor = posColors[word['part of speech']] || 'var(--pos-default)'

  return (
    <article
      className={style.card}
      data-word={word.word}
      onMouseEnter={() => setShowImage(true)}
      onMouseLeave={() => setShowImage(false)}
    >
      <header className={style.header}>
        <h3 className={style.word}>{word.word}</h3>
        <span className={style.pos} style={{ '--pos-color': posColor } as React.CSSProperties}>
          {word['part of speech']}
        </span>
      </header>

      <p className={style.description}>{word.description}</p>

      {word.example && <blockquote className={style.example}>"{word.example}"</blockquote>}

      {word.image && showImage && (
        <div className={style.imageContainer}>
          <img
            src={`/assets/media/${word.image}`}
            alt={word.word}
            className={style.image}
            loading="lazy"
          />
        </div>
      )}
    </article>
  )
}
