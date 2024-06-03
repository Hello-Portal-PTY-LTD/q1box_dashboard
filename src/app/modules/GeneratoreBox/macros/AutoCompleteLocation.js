import React, {useEffect, useState} from 'react'
import {Autocomplete, useLoadScript} from '@react-google-maps/api'
import {useFormContext, useWatch} from 'react-hook-form'

import {getEditQrId} from '../utils/functions'
const placesLibrary = ['places']

function AutoCompleteLocation() {
  const [searchResult, setSearchResult] = useState('Result: none')
  const {setValue} = useFormContext()
  const placeName = useWatch({name: 'placeName'})

  const edit_qrId = getEditQrId()

  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY,
    libraries: placesLibrary,
  })

  function onLoad(autocomplete) {
    setSearchResult(autocomplete)
  }

  useEffect(() => {
    if (edit_qrId && placeName) {
      const inputValue = document.getElementById('location-input')
      inputValue.value = placeName
    }
  }, [edit_qrId, placeName])

  function onPlaceChanged() {
    if (searchResult != null) {
      const place = searchResult.getPlace()

      const inputValue = document.getElementById('location-input')?.value
      setValue('placeName', inputValue)
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat()
        const lng = place.geometry.location.lng()

        if (place?.url) {
          setValue('position', {
            lat: lat,
            lng: lng,
          })
          setValue('mapUrl', place?.url)
        } else if (lat && lng) {
          setValue('mapUrl', `https://www.google.com/maps?q=${lat},${lng}`)
        }
      } else {
        console.log('Location data not available.')
      }
    }
  }
  if (!isLoaded) {
    return <div>Loading...</div>
  }

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  return (
    <div className='App'>
      <div id='searchColumn'>
        <h2 className='t-mb-2'>Search Location</h2>
        <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
          <input id='location-input' onKeyDown={handleInputKeyDown} className='t-input' />
        </Autocomplete>
      </div>
    </div>
  )
}

export default AutoCompleteLocation
