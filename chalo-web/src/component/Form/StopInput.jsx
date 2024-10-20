import {useState, useEffect} from 'react'
import { autoSuggestion } from '../../helper/utils'

const StopInput = ({focus, handleInput, inputType}) => {
  const [suggestions, setSuggestions] = useState([])
  const [searchText, setSearchText] = useState('')
  useEffect(() => {
    setSuggestions(autoSuggestion(searchText))
  }, [searchText])

  const handleClick = (stop) => {
    handleInput(stop)
    setSearchText(stop.label)
    setSuggestions([])
  }

  return (
    <>
      <div>
        <input 
          className='user-input'
          autoFocus={focus}
          type="text" 
          placeholder={`Enter ${inputType}...`}
          value={searchText} 
          onChange={e => setSearchText(e.target.value)} 
        />
        <ul>
          {suggestions?.length > 0 && 
            suggestions.map(item => (
              <li key={item.id} onClick={() => handleClick(item)}>
                <span>{item.label}</span>
              </li>
            ))
          }
        </ul>
      </div>
    </>
  )
}

export default StopInput