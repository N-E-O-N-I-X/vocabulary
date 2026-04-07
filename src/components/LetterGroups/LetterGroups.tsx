import style from './LetterGroups.module.css'
import { WordCard } from '../WordCard'
import type { Word } from '../../hooks/useDictionary'
import { useDictionary } from '../../hooks/useDictionary'

export const LetterGroups = () => {
  const { allWords, letters, grouped, search } = useDictionary()
const data = { allWords, letters, grouped }

  if (search.trim()) {
    return (
      <div className={style.results}>
        {useDictionary().words.map((word: Word) => (
          <WordCard key={word.word} word={word} />
        ))}
      </div>
    )
  }

  return (
    <div className={style.groups}>
      {Object.entries(data.grouped).map(([letter, words]) => (
        <section key={letter} className={style.group}>
          <details className={style.header}>
            <summary className={style.summary}>
              <span>{letter}</span>
              <span className={style.count}>{words.length}</span>
            </summary>
          </details>
          <div className={style.words}>
            {words.map((word: Word) => (
              <WordCard key={word.word} word={word} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}