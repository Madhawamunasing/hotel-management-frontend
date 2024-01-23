import React, { useEffect, useState } from 'react'
import '../../Assets/styles/css/Components/notification.css'
import { getMessagesByRecieverId } from '../../Services/Api/Utilities/Index'
const Notifications = () => {
  const [messages, setMessage] = useState(null)
  useEffect(() => {
    getMessages()
  }, [])
  const getMessages = async () => {
    const dataModal = {
      id: localStorage.getItem('user'), //user id
    }
    await getMessagesByRecieverId(dataModal)
      .then((res) => {
        setMessage(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  // const markAsRead =async(messageId)=>{
  //   await

  // }
  const calculateTime = (createdAt) => {
    const timeElapsed = new Date(createdAt)
    const today = new Date()
    var difference = Math.abs(today - timeElapsed)
    const days = difference / (1000 * 3600 * 24)
    if (days / 365 > 1) {
      return Math.floor(days / 365) + ' years ago'
    } else if (days / 365 < 1 && days >= 31) {
      return Math.floor(days / 12) + ' months ago'
    } else if (days / 365 < 1 && days <= 31 && days > 1) {
      return Math.floor(days) + ' days ago'
    } else if (
      days / 365 < 1 &&
      days <= 31 &&
      days < 1 &&
      difference / 1000 >= 3600
    ) {
      const milliSec = Math.abs(today - timeElapsed)
      return Math.floor(milliSec / (1000 * 3600)) + ' hours ago'
    } else if (
      days / 365 < 1 &&
      days <= 31 &&
      days < 1 &&
      difference / 1000 < 3600 &&
      difference / 1000 >= 60
    ) {
      const milliSec = Math.abs(today - timeElapsed)
      return Math.floor(milliSec / (1000 * 60)) + ' minutes ago'
    } else {
      const milliSec = Math.abs(today - timeElapsed)
      return Math.floor(milliSec / 1000) + ' seconds ago'
    }
  }
  return (
    <div>
      {messages != null ? (
        messages
          .map((message, index) => {
            if (message.mardRead) {
              return (
                <div class='sec '>
                  <div class='profCont'></div>
                  <div class=';'>{message.notification}</div>
                  <div class='txt sub'> {calculateTime(message.createdAt)}</div>
                </div>
              )
            } else {
              return (
                <div class='sec bg-light'>
                  <div class=''>{message.notification}</div>
                  <div class='txt sub'> {calculateTime(message.createdAt)}</div>
                </div>
              )
            }
          })
          .reverse()
      ) : (
        <></>
      )}
    </div>
  )
}

export default Notifications
