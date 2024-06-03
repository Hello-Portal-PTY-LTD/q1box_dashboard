import {useEffect, useState} from 'react'
const useDebounceSearch = (
  initialValue: string,
  delay: number
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [searchTerm, setSearchTerm] = useState<string>(initialValue)
  const [debouncedTerm, setDebouncedTerm] = useState<string>(initialValue)

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedTerm(searchTerm)
    }, delay)

    return () => {
      clearTimeout(debounceTimer)
    }
  }, [searchTerm, delay])

  return [debouncedTerm, setSearchTerm]
}

export {useDebounceSearch}
