import { SearchBar } from '../../components/SearchBar'
import { LetterGroups } from '../../components/LetterGroups'
import style from './Dictionary.module.css'

export const Dictionary = () => {
  return (
    <main className={style.dictionary}>
      <div className={style.searchWrapper}>
        <SearchBar />
      </div>

      <section className={style.content}>
        <LetterGroups />
      </section>
    </main>
  )
}
