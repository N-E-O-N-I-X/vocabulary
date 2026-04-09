import style from './LetterGroups.module.css'
import { WordCard } from '../WordCard'
import { useDictionary } from '../../hooks/useDictionary'
import type { Word } from '../../hooks/useDictionary'

export const LetterGroups = () => {
  const { grouped, search, words } = useDictionary()

  if (search.trim() && words.length > 0) {
    return (
      <div className={style.results}>
        <h2>Результаты поиска ({words.length})</h2>
        {words.map((word: Word) => (
          <WordCard key={word.word} word={word} />
        ))}
      </div>
    )
  }

  return (
    <div className={style.groups}>
      {Object.entries(grouped).map(([letter, groupWords]) => (
        <section key={letter} className={style.group}>
          <details className={style.header}>
            <summary className={style.summary}>
              <span>{letter}</span>
              <span className={style.arrow}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                  <title>Arrow-down SVG Icon</title>
                  <path
                    fill="currentColor"
                    fill-rule="non-zero"
                    d="M13.069 5.157L8.384 9.768a.546.546 0 0 1-.768 0L2.93 5.158a.552.552 0 0 0-.771 0a.53.53 0 0 0 0 .759l4.684 4.61a1.65 1.65 0 0 0 2.312 0l4.684-4.61a.53.53 0 0 0 0-.76a.552.552 0 0 0-.771 0"
                  />
                </svg>
              </span>
            </summary>
          </details>
          <div className={style.words}>
            {groupWords.map((word: Word) => (
              <WordCard key={word.word} word={word} data-word={word.word} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
