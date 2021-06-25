import React, { useCallback, useState, useEffect } from "react";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";

const App = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [initialCroppedAreaPixels, setInitialCroppedAreaPixels] = useState(
    undefined
  )
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    const croppedAreaPixels = JSON.parse(
      window.localStorage.getItem('croppedAreaPixels')
    )
    setInitialCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels)
    window.localStorage.setItem(
      'croppedAreaPixels',
      JSON.stringify(croppedAreaPixels)
    )
  }, [])

  return (
    <div className="App">
      <div className="crop-container">
        <Cropper
          image="/law.jpg"
          crop={crop}
          zoom={zoom}
          aspect={3 / 5}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          minZoom={0.5}
          initialCroppedAreaPixels={initialCroppedAreaPixels}
          restrictPosition={false}
        />
      </div>
      <div className="controls">
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e, zoom) => setZoom(zoom)}
          classes={{ container: 'slider' }}
        />
      </div>
    </div>
  )
}
export default App;
