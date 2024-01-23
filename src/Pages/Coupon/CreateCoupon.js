import React, { Component } from 'react';
import InputForm from './InputForm';
import Navbars from '../../Components/Navbar/Navbar';
import Footer from '../../Layouts/Footer/Footer'

import '../Coupon/CouponStyles/couponStyles.css'

class CreateCoupon extends Component {
    state = {
        coupon: {
            title: '',
            token: '',
            discount: '',
            minTotal: '',
            expireDate: ''
        },
        errors: {

        }
    }

    validate = () => {

        const errors = {};

        const { coupon } = this.state;
        if (coupon.title.trim() === '')
            errors.title = "Title is required."
        if (coupon.token.trim() === '')
            errors.token = "Token is required."
        if (coupon.discount.trim() === '')
            errors.discount = "Discount is required."
        if (coupon.minTotal.trim() === '')
            errors.minTotal = "Minimum Total is required."
        if (coupon.expireDate.trim() === '')
            errors.expireDate = "Expire Date is required."

        return Object.keys(errors).length === 0 ? null : errors;
    }


    handleCreateCoupon = e => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;
    }
    handleChange = e => {
        const coupon = { ...this.state.coupon };
        coupon[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ coupon });
    }

    render() {
        const { coupon, errors } = this.state;
        return (
            <div>
                <div>
                    <Navbars />
                </div>
                <div className='writeMessageBox'>
                    <div className='writeMessageBoxHeader'>
                        <>Create Coupon</>
                    </div>

                    <form onSubmit={this.handleCreateCoupon}>
                        <InputForm
                            name="title"
                            value={coupon.title}
                            label="Title"
                            placeholder="Enter Title"
                            onChange={this.handleChange}
                            error={errors.title}
                        />
                        <InputForm
                            name="token"
                            value={coupon.token}
                            label="Token"
                            placeholder="Enter Token"
                            onChange={this.handleChange}
                            error={errors.token}
                        />
                        <InputForm
                            name="discount"
                            value={coupon.discount}
                            label="Discount"
                            placeholder="Enter Discount"
                            onChange={this.handleChange}
                            error={errors.discount}
                        />
                        <InputForm
                            name="minTotal"
                            value={coupon.minTotal}
                            label="Minimum Total"
                            placeholder="Enter Minimum Total"
                            onChange={this.handleChange}
                            error={errors.minTotal}
                        />
                        <InputForm
                            name="expireOn"
                            value={coupon.expireDate}
                            label="Expire On"
                            placeholder="Enter Expire Date"
                            onChange={this.handleChange}
                            error={errors.expireDate}
                        />
                        <button
                            onClick={() => this.handleSendMessage}
                            type="submit" className="btn btn sendCouponButton">Create Coupon</button>
                    </form>


                </div>
                <div>
                    <Footer />
                </div>
            </div>



        );
    }
}

export default CreateCoupon;