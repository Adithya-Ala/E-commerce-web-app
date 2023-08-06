import React, { useState, useEffect } from "react";
import { isAutheticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import  StripeCheckoutButton  from "react-stripe-checkout";
import { API } from "../backend";

const StripeCheckout = ({
  products,
  setReload = f => f,
  reload = undefined
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: ""
  });

  const token = isAutheticated() && isAutheticated().token;
  const userId = isAutheticated() && isAutheticated().user._id;

  const getFinalAmount = () => {
    let amount = 0;
    products.map(p => {
      amount = amount + p.price;
    });
    return amount;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products
    }

    const headers = {
      "Content-Type": "application/json"
    }
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(response => {
      console.log(response)
      // //call further methods
      // const {status} = response;
      // console.log("STATUS:",status);
      cartEmpty();
      setReload(!reload);
    })
    .catch(err => {
      console.log(err)
      // cartEmpty();
    }) 
  }

  const showStripeButton = () => {
    if(isAutheticated()) {
      if(products.length == 0) {
        return (<div><button className="btn btn-md btn-success">Payment Disabled $0</button></div>)
      } else {
        return (
          <div>
            <StripeCheckoutButton
                stripeKey="pk_test_51MsjHtSIke8uAVv84onFkdIbNbbaQ82l9bqO2GIu3wROHUALPO6axtMPTThl2OiTZ6goOYzyniz56MQe6uRXKSfI00SPPxVRzx"
                token={makePayment}
                amount={getFinalAmount()*100}
                name="Buy Tshits"
                shippingAddress
                billingAddress

              >
            <button className="btn btn-success">Pay with stripe</button>
          </StripeCheckoutButton>
          </div>
        )
        
      }
    } else {
      return (
        <div>
          <Link to="/signin">
            <button className="btn btn-warning">Signin</button>
          </Link>
        </div>
      )
        
    }
  
  };

  return (
    <div>
      <h3 className="text-white">Stripe Checkout {getFinalAmount()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
