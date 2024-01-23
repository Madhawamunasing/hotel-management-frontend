import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
class StartFilter extends Component {
  render() {
    return (
      <div className='border'>
        <div class='card-header card-header'>Stars</div>
        <div class='card-body'>
          <Form>
            <div class='form-check'>
              <input
                class='form-check-input'
                type='radio'
                name='flexRadioDefault'
                id='flexRadioDefault1'
              />
              <label class='form-check-label' for='flexRadioDefault1'>
                <i class='fa fa-star' aria-hidden='true'></i>
              </label>
            </div>
            <div class='form-check'>
              <input
                class='form-check-input'
                type='radio'
                name='flexRadioDefault'
                id='flexRadioDefault2'
              />
              <label class='form-check-label' for='flexRadioDefault2'>
                <i class='fa fa-star' aria-hidden='true'></i>
                <i class='fa fa-star' aria-hidden='true'></i>
              </label>
            </div>
            <div class='form-check'>
              <input
                class='form-check-input'
                type='radio'
                name='flexRadioDefault'
                id='flexRadioDefault1'
              />
              <label class='form-check-label' for='flexRadioDefault1'>
                <i class='fa fa-star' aria-hidden='true'></i>
                <i class='fa fa-star' aria-hidden='true'></i>
                <i class='fa fa-star' aria-hidden='true'></i>
              </label>
            </div>
            <div class='form-check'>
              <input
                class='form-check-input'
                type='radio'
                name='flexRadioDefault'
                id='flexRadioDefault1'
              />
              <label class='form-check-label' for='flexRadioDefault1'>
                <i class='fa fa-star' aria-hidden='true'></i>
                <i class='fa fa-star' aria-hidden='true'></i>
                <i class='fa fa-star' aria-hidden='true'></i>
                <i class='fa fa-star' aria-hidden='true'></i>
              </label>
            </div>
            <div class='form-check'>
              <input
                class='form-check-input'
                type='radio'
                name='flexRadioDefault'
                id='flexRadioDefault1'
              />
              <label class='form-check-label' for='flexRadioDefault1'>
                <i class='fa fa-star' aria-hidden='true'></i>
                <i class='fa fa-star' aria-hidden='true'></i>
                <i class='fa fa-star' aria-hidden='true'></i>
                <i class='fa fa-star' aria-hidden='true'></i>
                <i class='fa fa-star' aria-hidden='true'></i>
              </label>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

export default StartFilter
