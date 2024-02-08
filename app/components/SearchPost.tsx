import React, { useState } from 'react'

const SearchPost = () => {
  const [search, setSearch] = useState('');

  const handleChange = () => {

  }

  return (
    <div className='flex flex-wrap'>
        <input onChange={handleChange} type="search" />
        <button>Search</button>
    </div>
  )
}

export default SearchPost