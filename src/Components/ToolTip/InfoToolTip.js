import React, { Component } from 'react'
import '../../Assets/styles/css/Components/toolTip.css'
class InfoToolTip extends Component {
  render() {
    return (
      <div>
        <div class='tooltip' data-direction='bottom'>
          <div class='tooltip__initiator'>
            <i class='fa fa-info-circle'></i>
          </div>
          <div class='tooltip__item'>Hello! I'm a pure css tooltip</div>
        </div>
      </div>
    )
  }
}

export default InfoToolTip
