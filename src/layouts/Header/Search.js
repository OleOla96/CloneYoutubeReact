import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import HeadlessTippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import axios from 'axios'

import { http } from '../../common/http'
import authHeader from '../../services/auth-header'
import { SearchIcon } from '../../components/Icons'
import useDelay from './useDelay'
import style from './search.module.scss'

const cb = classNames.bind(style)

function Search() {
  const [searchValue, setSearchValue] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = useDelay(searchValue, 800)

  const inputRef = useRef()

  useEffect(() => {
    if (!title.trim()) {
      setSearchResult([])
      return
    }

    const fetchApi = async () => {
      setLoading(true)

      const result = await axios.get(http + `search/title?q=${title}`, {
        headers: authHeader(),
      })

      setSearchResult(result.data)
      setLoading(false)
    }

    fetchApi()
  }, [title])

  const handleClear = () => {
    setSearchValue('')
    setSearchResult([])
    inputRef.current.focus()
  }

  const handleHideResult = () => {
    setShowResult(false)
  }

  const handleChange = (e) => {
    const searchValue = e.target.value
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue)
    }
  }

  return (
    <div className={cb('groupSearch')}>
      <HeadlessTippy
        interactive
        visible={showResult && searchResult.length > 0}
        render={(attrs) => (
          <div className={cb('search-result')} tabIndex='-1' {...attrs}>
            {searchResult.length > 0 &&
              searchResult.map((result) => (
                <Link to={result.linkVideo} key={result.id}>
                  <SearchIcon className={cb('bg-icon')} />
                    {result.title}
                </Link>
              ))}
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cb('searchBox')}>
          <input
            id='search'
            ref={inputRef}
            value={searchValue}
            placeholder='Search'
            spellCheck={false}
            onChange={handleChange}
            onFocus={() => setShowResult(true)}
            className={cb('search')}
          />
          {!!searchValue && !loading && (
            <button className={cb('clear')} onClick={handleClear}>
              <i className='fa-solid fa-xmark'></i>
            </button>
          )}
          {loading && <i className={cb('loading', 'fa-solid fa-spinner')} />}
        </div>
      </HeadlessTippy>
      <button
        className={cb('layoutIcon-search')}
        onMouseDown={(e) => e.preventDefault()}
      >
        <label htmlFor='search' className={cb('layoutIcon-search-sup')}>
          <SearchIcon className={cb('bg-icon')} />
        </label>
      </button>
    </div>
  )
}

export default Search
