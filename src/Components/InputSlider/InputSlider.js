import React, { Component } from 'react'
import { useState } from 'react'

const InputSlider = () => {
  const [rangeval, setRangeval] = useState(10000)

  return (
    <div>
      <h4>Rs. {rangeval}</h4>
      <input
        type='range'
        class='form-range'
        min='0'
        max='100000'
        step='1000'
        value={rangeval}
        onChange={(event) => setRangeval(event.target.value)}
      />
    </div>
  )
}

export default InputSlider
