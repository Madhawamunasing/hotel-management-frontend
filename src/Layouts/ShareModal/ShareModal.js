import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { createRefferal } from '../../Services/Api/Utilities/Index.js'
const ShareModal = () => {
  const [refferal, setRefferal] = useState('')
  useEffect(() => {
    toast.configure()
    const sharedToken = localStorage.getItem('sharedToken')
    if (sharedToken == null || sharedToken == undefined || sharedToken == '') {
      genarateToken()
    } else {
      setRefferal(
        window.location.protocol +
          '//' +
          window.location.hostname +
          ':' +
          window.location.port +
          '/share?token=' +
          sharedToken
      )
    }
  }, [])

  const copyText = () => {
    let copiedText = document.getElementById('copiedText').value
    navigator.clipboard.writeText(copiedText)
    notifySuccess('Copied sharerable link to the clipboard')
  }
  const notifySuccess = (message) => {
    toast.success(message)
  }
  const genarateToken = async () => {
    const dataModel = {
      userId: localStorage.getItem('user'),
    }
    await createRefferal(dataModel)
      .then((data) => {
        localStorage.setItem('sharedToken', data.data.token)
        // setToken(data.data.token)
        setRefferal(window.location.href + 'share?token=' + data.data.token)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className='shareModal'>
      <h5>Share this link and get extra discounts</h5>
      <div className='row'>
        <div className='col-10'>
          <input
            type='text'
            class='form-control mt-2 shareModal-inputbox'
            value={refferal}
            id='copiedText'
            onClick={() => {
              copyText()
            }}
          />
        </div>
        <div className='col-2'>
          <i
            class='fas fa-clipboard'
            onClick={() => {
              copyText()
            }}
          ></i>
        </div>
      </div>
    </div>
  )
}

export default ShareModal
