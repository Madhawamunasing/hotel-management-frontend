import jQuery from 'jquery'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../Assets/vendor/font-awesome-4.7/css/font-awesome.min.css'
import '../../Assets/vendor/mdi-font/css/material-design-iconic-font.min.css'
import '../../Assets/vendor/select2/select2.min.css'
import DatePicker from '../DatePicker/Datepicker.js'

class SideSearchbar extends Component {
  componentDidMount() {
    ;(function ($) {
      try {
        var body = $('body,html')

        var selectSpecial = $('#js-select-special')
        var info = selectSpecial.find('#info')
        var dropdownSelect = selectSpecial.parent().find('.dropdown-select')
        var listRoom = dropdownSelect.find('.list-room')
        // var btnAddRoom = $('#btn-add-room')
        // var totalRoom = 1

        selectSpecial.on('click', function (e) {
          e.stopPropagation()
          $(this).toggleClass('open')
          dropdownSelect.toggleClass('show')
        })

        dropdownSelect.on('click', function (e) {
          e.stopPropagation()
        })

        body.on('click', function () {
          selectSpecial.removeClass('open')
          dropdownSelect.removeClass('show')
        })

        listRoom.on('click', '.plus', function () {
          var that = $(this)
          var qtyContainer = that.parent()
          var qtyInput = qtyContainer.find('input[type=number]')
          var oldValue = parseInt(qtyInput.val())
          var newVal = oldValue + 1
          qtyInput.val(newVal)

          updateRoom()
        })

        listRoom.on('click', '.minus', function () {
          var that = $(this)
          var qtyContainer = that.parent()
          var qtyInput = qtyContainer.find('input[type=number]')
          var min = qtyInput.attr('min')

          var oldValue = parseInt(qtyInput.val())
          if (oldValue <= min) {
            var newVal = oldValue
          } else {
            var newVal = oldValue - 1
          }
          qtyInput.val(newVal)

          updateRoom()
        })

        listRoom.on('change', '.inputQty', function () {
          var that = $(this)
          if (isNumber(that.val())) {
            var qtyVal = parseInt(that.val())
            if (that.val().length === 0) {
              qtyVal = 0
            }

            if (qtyVal < 0) {
              qtyVal = 0
            }
            that.val(qtyVal)

            updateRoom()
          }
        })

        function isNumber(n) {
          return typeof n != 'boolean' && !isNaN(n)
        }

        function countChildren() {
          var listRoomItem = listRoom.find('.list-room__item')
          var totalChildren = 0

          listRoomItem.each(function () {
            var that = $(this)
            var numberChildren = parseInt(that.find('.quantity2 > input').val())

            totalChildren = totalChildren + numberChildren
          })

          return totalChildren
        }

        function countAdult() {
          var listRoomItem = listRoom.find('.list-room__item')
          var totalAdults = 0

          listRoomItem.each(function () {
            var that = $(this)
            var numberAdults = parseInt(that.find('.quantity1 > input').val())

            totalAdults = totalAdults + numberAdults
          })

          return totalAdults
        }

        function countRoom() {
          var listRoomItem = listRoom.find('.list-room__item')
          var totalRooms = 0

          listRoomItem.each(function () {
            var that = $(this)
            var numberRooms = parseInt(that.find('.quantity3 > input').val())

            totalRooms = totalRooms + numberRooms
          })

          return totalRooms
        }

        function updateRoom() {
          var totalAd = parseInt(countAdult())
          var totalChi = parseInt(countChildren())

          var totalRo = parseInt(countRoom())

          var adults = 'Adult, '
          var rooms = 'Room'

          if (totalAd > 1) {
            adults = 'Adults, '
          }

          if (totalRo > 1) {
            rooms = 'Rooms'
          }

          var infoText =
            totalAd +
            ' ' +
            adults +
            totalChi +
            ' ' +
            'Children, ' +
            totalRo +
            ' ' +
            rooms

          info.val(infoText)
        }
      } catch (e) {
        console.log(e)
      }
      /*[ Select 2 Config ]
        ===========================================================*/

      try {
        var selectSimple = $('.js-select-simple')

        selectSimple.each(function () {
          var that = $(this)
          var selectBox = that.find('select')
          var selectDropdown = that.find('.select-dropdown')
          selectBox.select2({
            dropdownParent: selectDropdown,
          })
        })
      } catch (err) {
        console.log(err)
      }
    })(jQuery)
  }
  render() {
    return (
      <div>
        <form action='' method='post'>
          <div className='flex searchcontainer'>
            <div className='row'>
              <div>
                <div class='input-group '>
                  <label class='label'>Going to</label>
                  <input
                    class='input--style-1'
                    type='text'
                    name='address'
                    placeholder='Destination, hotel name'
                    required='required'
                  />
                  <i class='zmdi zmdi-pin input-group-symbol'></i>
                </div>
              </div>
              <div>
                <div class='input-group'>
                  <DatePicker />
                  <i class='zmdi zmdi-calendar-alt input-group-symbol'></i>
                </div>
              </div>

              <div className=' travellers ' id='show'>
                <div class='input-group' id='js-select-special'>
                  <label class='label'>Travellers</label>
                  <i class='zmdi zmdi-pin input-group-symbol'></i>
                  <input
                    class='input--style-1'
                    type='text'
                    name='traveller'
                    value='1 Adult, 0 Children, 1 Room'
                    disabled='disabled'
                    id='info'
                  />
                  <i class='zmdi zmdi-chevron-down input-icon'></i>
                </div>
                <div class='dropdown-select'>
                  <ul class='list-room'>
                    <li class='list-room__item'>
                      <ul class='list-person'>
                        <li class='list-person__item'>
                          <span class='name'>Adults</span>
                          <div class='quantity quantity1'>
                            <span class='minus'>-</span>
                            <input
                              class='inputQty'
                              type='number'
                              min='0'
                              value='1'
                            />
                            <span class='plus'>+</span>
                          </div>
                        </li>
                        <li class='list-person__item'>
                          <span class='name'>Children</span>
                          <div class='quantity quantity2'>
                            <span class='minus'>-</span>
                            <input
                              class='inputQty'
                              type='number'
                              min='0'
                              value='0'
                            />
                            <span class='plus'>+</span>
                          </div>
                        </li>
                        <li class='list-person__item'>
                          <span class='name'>Rooms</span>
                          <div class='quantity quantity3'>
                            <span class='minus'>-</span>
                            <input
                              class='inputQty'
                              type='number'
                              min='1'
                              value='1'
                            />
                            <span class='plus'>+</span>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='search-button'>
                <button class='btn-submit submit-Btn b-priamry' type='submit'>
                  <Link to='/hotels'>search</Link>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default SideSearchbar
