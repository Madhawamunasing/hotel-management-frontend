import React, { Component } from 'react'

class Progressbar extends Component {
  render() {
    return (
      <div>
        <div class='progress'>
          <div
            class='progress-bar progress-bar-striped active'
            role='progressbar'
            id='pg'
            aria-valuenow='60'
            aria-valuemin='0'
            aria-valuemax='100'
            style='width:60%'
          ></div>
        </div>
      </div>
    )
  }
}

export default Progressbar
