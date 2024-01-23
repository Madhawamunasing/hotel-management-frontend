import React, { Component } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../../Assets/styles/css/Layouts/searchedHotel.css'
import PriceTag from '../PriceTag/PriceTag'

class SearchedHotel extends Component {
  constructor(props) {
    super(props)
    toast.configure()
    this.state = {
      isSaved: false,
    }
  }

  notify(message) {
    toast.success(message)
  }
  saveHotel() {
    this.setState((state) => ({
      isSaved: !state.isSaved,
    }))
    if (this.state.isSaved) {
      this.notify('You removed a hotel successfully !')
    } else {
      this.notify('You Saved a hotel successfully !')
    }
  }

  getStars(params) {
    let content = []
    for (let i = 0; i < params; i++) {
      content.push(<i class='fa fa-star' aria-hidden='true'></i>)
    }
    return content
  }
  render() {
    return (
      <div className=''>
        <div class='card mb-3 p-2'>
          <div class='row no-gutters'>
            <div class='col-md-4 '>
              <img
                src={this.props.hotel.image}
                class='card-img rounded'
                alt='...'
              />
            </div>
            <div class='col-md-8'>
              <div class='card-body'>
                <div className='hotel-title'>
                  <b>
                    <h2 class='card-title'>{this.props.hotel.name}</h2>
                  </b>
                  {this.state.isSaved ? (
                    <i
                      class='fas fa-heart fa-2x saved-heart'
                      id='savel-hotel'
                      onClick={() => {
                        this.saveHotel()
                      }}
                    ></i>
                  ) : (
                    <i
                      class='fas fa-heart fa-2x notSaved-heart'
                      id='savel-hotel'
                      onClick={() => {
                        this.saveHotel()
                      }}
                    ></i>
                  )}
                </div>
                <h5 class='card-title'>{this.props.hotel.province}</h5>
                <div>{this.getStars(this.props.hotel.stars)}</div>
                <p class='card-text'>{this.props.hotel.description}</p>
                <PriceTag price={this.props.hotel.price} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchedHotel
