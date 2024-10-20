import { STOPS } from '../data/stops.js'

export const autoSuggestion = (keyword) => {
  if(keyword === '') {
    return []
  }
  
  const result = STOPS.filter(stop => stop?.label?.toLowerCase().includes(keyword?.toLowerCase()))
  return result
}

export const identifyStops = () => {}