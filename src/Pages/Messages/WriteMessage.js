import React, { Component } from 'react'
import InputForm from '../Coupon/InputForm'
import Navbars from '../../Components/Navbar/Navbar'
import Footer from '../../Layouts/Footer/Footer'

class WriteMessage extends Component {
  state = {
    message: {
      to: '',
      messageText: '',
    },
    errors: {},
  }
  validate = () => {
    const errors = {}

    const { message } = this.state
    if (message.to.trim() === '') errors.to = 'Sender is required.'
    if (message.messageText.trim() === '')
      errors.messageText = 'Message is required.'

    return Object.keys(errors).length === 0 ? null : errors
  }

  handleWriteMessage = (e) => {
    e.preventDefault()

    const errors = this.validate()
    this.setState({ errors: errors || {} })
    if (errors) return
  }
  handleChange = (e) => {
    const message = { ...this.state.message }
    message[e.currentTarget.name] = e.currentTarget.value
    this.setState({ message })
  }

  render() {
    const { message, errors } = this.state
    return (
      <div>
        <div>
          <Navbars />
        </div>

        <div className='writeMessageBox'>
          <div className='writeMessageBoxHeader'>
            <>Write Message</>
          </div>

          <form onSubmit={this.handleWriteMessage}>
            <InputForm
              name='to'
              value={message.to}
              label='To'
              onChange={this.handleChange}
              error={errors.to}
            />
            <InputForm
              name='messageText'
              value={message.messageText}
              label='Enter Message'
              onChange={this.handleChange}
              error={errors.messageText}
            />

            {/* <div class="writeMessage-form-group">
                            <label htmlFor="to">To</label>
                            <input value={message.to}
                                onChange={this.handleChange}
                                name="to"
                                type="string" class="form-control" id="to" aria-describedby="emailHelp" placeholder="Enter receiver"></input>
                            <br />
                        </div> */}
            {/* <div class="writeMessage-form-group">
                            <label htmlFor="messageText">Message</label>
                            <input value={message.messageText}
                                onChange={this.handleChange}
                                name="messageText"
                                type="string" class="form-control" id="messageText" placeholder="Enter message"></input>
                            <br />
                        </div> */}
            <button
              onClick={() => this.handleSendMessage}
              type='submit'
              className='btn btn sendMessageButton'
            >
              Send
            </button>
          </form>
        </div>
        <div className='message-footer'>
          <Footer />
        </div>
      </div>
    )
  }
}

export default WriteMessage

//   const data={
//     // id:localStorage.getItem('userId'),
//     to:to.value,
//     message:message.value

//   }
//   axios.post('http://localhost:8000/api/message/sendMessage',data)
//   .then((res)=>{
//     this.setState({data:res.data})
//     console.log(this.state.data);
//      localStorage.setItem('userId', 4);
//   })
//   .catch((err)=>{
//     console.log(err);
//   })

// }

// const [to, setToValue] = useState("");
// const [message, setMessageValue] = useState("");
// const handleToChange = (e) => {
//   setToValue(e.target.value)
// }
// const handleMessageChange = (e) => {
//   setMessageValue(e.target.value)
// }
