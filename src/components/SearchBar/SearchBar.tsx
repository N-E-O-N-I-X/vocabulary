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
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path fill="currentColor" d="M11.63 8h7.38v2h-7.38z" />
        <path fill="currentColor" d="M7 8h3.19v2H7z" />
        <path fill="currentColor" d="M7 16h7.38v2H7z" />
        <path fill="currentColor" d="M15.81 16H19v2h-3.19zM7 12h9v2H7z" />
        <path
          fill="currentColor"
          d="M13 0C5.82 0 0 5.82 0 13s5.82 13 13 13s13-5.82 13-13A13 13 0 0 0 13 0m0 24C6.925 24 2 19.075 2 13S6.925 2 13 2s11 4.925 11 11s-4.925 11-11 11m9.581-.007l1.414-1.414l7.708 7.708l-1.414 1.414z"
        />
      </svg>
      <input
        type="text"
        className={style.searchInput}
        placeholder="Поиск по словарю..."
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
