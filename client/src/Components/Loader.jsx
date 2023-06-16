import React from 'react'
import { ScaleLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div style={{ width : '100%' , height : '100%', display : 'flex', justifyContent : 'center', alignItems : 'center' }}>
      <ScaleLoader color='#084da3' />
    </div>
  )
}

export default Loader
