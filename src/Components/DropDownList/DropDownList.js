import React, { Component } from 'react'
import '../../Assets/styles/css/Components/dropDownList.css'
class DropDownList extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <select
          class='form-select'
          id='roomtype'
          aria-label='Default select example'
          onChange={(data) => {
            var x = document.getElementById('roomtype').value
            this.props.setRoomType(x)
          }}
        >
          {/* <option selected disabled>
            Select your preference{' '}
          </option> */}
          {this.props.roomTypes.map((roomType, index) => {
            return (
              <option key={roomType.roomTypeId} value={roomType.roomTypeId}>
                {roomType.type}
              </option>
            )
          })}
        </select>
      </div>
    )
  }
}

export default DropDownList
