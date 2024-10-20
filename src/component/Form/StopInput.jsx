import {useState, useEffect} from 'react'
import { autoSuggestion } from '../../helper/utils'

const StopInput = ({focus, input, handleInput, inputType}) => {
  const [suggestions, setSuggestions] = useState([])
  const [searchText, setSearchText] = useState(input)
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
        <ul className='suggestion-list'>
          {suggestions?.length > 0 && 
            suggestions.map(item => (
              <li key={item.id} className='list-input' onClick={() => handleClick(item)}>
                <span style={{ paddingLeft: '10px'}}>{item.label}</span>
              </li>
            ))
          }
        </ul>
      </div>
    </>
  )
}

export default StopInput