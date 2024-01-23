import React, { Component } from 'react'
import '../../Assets/styles/css/Components/priceTag.css'
class PriceTag extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='tag-container'>
        <span class='tag'>LKR . {this.props.price}</span>
      </div>
    )
  }
}

export default PriceTag
