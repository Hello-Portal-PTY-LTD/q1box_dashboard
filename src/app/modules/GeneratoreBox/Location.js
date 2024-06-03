import React, {useState} from 'react'
import {GoogleMap, Marker} from '@react-google-maps/api'
import {useFormContext, useWatch} from 'react-hook-form'
import {useEffect} from 'react'
import {getEditQrId} from './utils/functions'

const Map = () => {
  const {setValue} = useFormContext()
  const mapCoordinates = useWatch({name: 'position'})

  const [selectedLocation, setSelectedLocation] = useState({
    lat: -24.2744,
    lng: 133.7751,
  })

  const mapUrl = useWatch({name: 'mapUrl'})
  const edit_qrId = getEditQrId()
  const containerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '16px',
  }

  const handleMapClick = (event) => {
    const lat = event.latLng.lat()
    const lng = event.latLng.lng()
    setValue('mapLocation', {
      lat: lat,
      lng: lng,
    })
    setValue('mapUrl', `https://www.google.com/maps?q=${lat},${lng}`)
    setSelectedLocation({
      lat: lat,
      lng: lng,
    })
  }

  useEffect(() => {
    if (edit_qrId && mapCoordinates) {
      if (mapCoordinates?.lat && mapCoordinates?.lng) {
        setSelectedLocation({
          lat: mapCoordinates?.lat,
          lng: mapCoordinates?.lng,
        })
      } else {
        console.log('Latitude and longitude values not found in the URL.')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapUrl])

  useEffect(() => {
    if (mapCoordinates) {
      setSelectedLocation({
        lat: mapCoordinates.lat,
        lng: mapCoordinates.lng,
      })
    }
  }, [mapCoordinates])

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={selectedLocation}
        zoom={mapCoordinates?.lat && mapCoordinates?.lng ? 14 : 5}
        onClick={handleMapClick}
      >
        {selectedLocation && <Marker draggable={false} position={selectedLocation} />}
      </GoogleMap>
    </div>
  )
}

export default Map
