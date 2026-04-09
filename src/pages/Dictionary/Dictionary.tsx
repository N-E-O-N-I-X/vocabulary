import { SearchBar } from '../../components/SearchBar'
import { LetterGroups } from '../../components/LetterGroups'
import style from './Dictionary.module.css'

export const Dictionary = () => {
  return (
    <main className={style.dictionary}>
      <h1 className={style.heading}>Словарь по "Книге о скудости и богатстве" И. Т. Посошкова</h1>
      <div className={style.searchWrapper}>
        <SearchBar />
      </div>

      <section className={style.content}>
        <LetterGroups />
      </section>
    </main>
  )
}
