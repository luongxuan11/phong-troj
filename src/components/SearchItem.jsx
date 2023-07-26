import React, { memo} from 'react'

const SearchItem = ({firstIcon, lastIcon, text, onClick, defaultText}) => {
  return (
    <>
      <div onClick={onClick}  className="home-search__box row__inline">
        {firstIcon}
        <span className={`home-search__item ${text ? 'home-search__item--active' : ''}`}>{text || defaultText}</span>
        {lastIcon}
      </div>
    </>
  )
}

export default memo(SearchItem)