import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import '../../Assets/styles/css/Layouts/hotelLeftSide.css'

//  setLowerPrice = { setLowerPrice }
//  setUpperPrice = { setUpperPrice }

const PriceRange = ({ setLowerPrice, setUpperPrice }) => {
  return (
    <div className=' price-container border'>
      <div class='card-header  text-dark '>Budget</div>
      <div class='card-body'>
        <Form className='mt-3 mb-3'>
          <Form.Check
            label='LKR. 0 - LKR. 10000'
            name='group1'
            type='radio'
            value='rice'
            // onChange={handleChange('category')}
            onChange={() => {
              setLowerPrice(0)
              setUpperPrice(10000)
            }}
          />
          <Form.Check
            label='LKR. 10000 - LKR. 20000'
            name='group1'
            type='radio'
            value='rice'
            // onChange={handleChange('category')}
            onChange={() => {
              setLowerPrice(10000)
              setUpperPrice(20000)
            }}
            defaultChecked
          />
          <Form.Check
            label='LKR. 20000 - LKR. 30000'
            name='group1'
            type='radio'
            value='fastFood'
            onChange={() => {
              setLowerPrice(20000)
              setUpperPrice(30000)
            }}
          />
          <Form.Check
            label='LKR. 30000 - LKR. 50000'
            name='group1'
            type='radio'
            value='beverage'
            onChange={() => {
              setLowerPrice(30000)
              setUpperPrice(50000)
            }}
          />
          <Form.Check
            defaultChecked
            label='Any'
            name='group1'
            type='radio'
            value='beverage'
            onChange={() => {
              setLowerPrice(0)
              setUpperPrice(100000)
            }}
          />
        </Form>
      </div>
    </div>
  )
}

export default PriceRange
