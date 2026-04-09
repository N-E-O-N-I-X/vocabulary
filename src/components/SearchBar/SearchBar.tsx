import { useState, useEffect, type ChangeEvent } from 'react'
import style from './SearchBar.module.css'
import { useDictionary } from '../../hooks/useDictionary'
import type { Word } from '../../hooks/useDictionary'

export const SearchBar = () => {
  const { search, setSearch, words: filteredWords } = useDictionary()
  const [localSearch, setLocalSearch] = useState(search)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(localSearch)
      setShowDropdown(localSearch.trim().length > 1 && filteredWords.length > 0)
    }, 300)
    return () => clearTimeout(timeout)
  }, [localSearch, setSearch, filteredWords.length])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value)
  }

  const clearSearch = () => {
    setLocalSearch('')
    setSearch('')
    setShowDropdown(false)
  }

  return (
    <div className={style.searchContainer}>
      <svg
        className={style.searchIcon}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
      >
        <path
          fill="currentColor"
          d="m11.271 11.978l3.872 3.873a.502.502 0 0 0 .708 0a.502.502 0 0 0 0-.708l-3.565-3.564c2.38-2.747 2.267-6.923-.342-9.532c-2.73-2.73-7.17-2.73-9.898 0c-2.728 2.729-2.728 7.17 0 9.9a6.955 6.955 0 0 0 4.949 2.05a.5.5 0 0 0 0-1a5.96 5.96 0 0 1-4.242-1.757a6.01 6.01 0 0 1 0-8.486a6.004 6.004 0 0 1 8.484 0a6.01 6.01 0 0 1 0 8.486a.5.5 0 0 0 .034.738"
        />
      </svg>
      <input
        type="text"
        className={style.searchInput}
        placeholder="Поиск"
        value={localSearch}
        onChange={handleChange}
        autoComplete="off"
      />
      {search && (
        <button className={style.searchClear} type="button" onClick={clearSearch}>
          ×
        </button>
      )}

      {showDropdown && filteredWords.length > 0 && (
        <div className={style.dropdown}>
          <div className={style.dropdownList}>
            {filteredWords.map((word: Word) => (
              <div
                key={word.word}
                className={style.dropdownItem}
                onClick={() => {
                  document.querySelector(`[data-word="${word.word}"]`)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                  })
                }}
              >
                <span className={style.dropdownWord}>{word.word}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
