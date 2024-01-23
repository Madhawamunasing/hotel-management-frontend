import React from 'react'
import PuffLoader from 'react-spinners/PuffLoader'
import styled, { css } from 'styled-components'
import '../../Assets/styles/css/Components/darkOverlaybackGround.css'

const DarkBackground = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  ${(props) =>
    props.disappear &&
    css`
      display: block; /* show */
    `}
`
const styles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '1000',
  fontWeight: '500',
  fontSize: 'large',
}
const DarkOverlaybackGround = ({ loading, content }) => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     loading = false
  //   }, 5000)
  // })
  return (
    <div>
      <DarkBackground disappear={loading}>
        <div style={styles}>
          <div className='row' style={{ justifyContent: 'center' }}>
            <PuffLoader loading={loading} size={50} margin={2} color='white' />
          </div>
          <div
            className='row'
            style={{ justifyContent: 'center', textAlign: 'center' }}
          >
            <div style={{ position: 'relative', color: 'white' }}>
              Please be patient!
              <br />
              {content}
            </div>
          </div>
        </div>
      </DarkBackground>
    </div>
  )
}

export default DarkOverlaybackGround
