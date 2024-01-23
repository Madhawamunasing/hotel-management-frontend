import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import '../../Assets/styles/css/Components/shareButton.css'
import ShareModal from '../../Layouts/ShareModal/ShareModal'
const ShareButton = () => {
  const [searchedParams, setSearchedparams] = useSearchParams()
  const [show, setShow] = useState(false)
  const [token, setToken] = useState(null)

  useEffect(() => {
    setToken(searchedParams.get('token') || '')
    if ((searchedParams.get('token') || '') != '') {
      document.getElementById('shareButton').style.display = 'none'
    }
  }, [])
  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => {
    setShow(true)
  }

  return (
    <div className='shareButton' id='shareButton'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='30'
        height='30'
        fill='currentColor'
        class='bi bi-share'
        viewBox='0 0 16 16'
        onClick={() => {
          handleShow()
        }}
      >
        <path d='M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z' />
      </svg>
      <Modal
        show={show}
        onHide={() => {
          handleClose()
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Invite your friends</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ShareModal />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  )
}

export default ShareButton
