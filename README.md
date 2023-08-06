# E-Commerce-web-app-using-MERN
It is a E-commerce web application developed using React js, Node js, MongoDb and Express. It is functional with different views for admin and user and also integrated with payment gateways for checkout. It is deployed to heroku and you can check it out using the link given below.


# Features:
HomePage
Cart
Admin Dashboard
SignIn
SignUp
SignOut
Payment gateway (Stripe)
Private routes used for different roles. Authentication used JWT - 'Json Web Token' and stored the token in cache to easily login without entering login details everytime.

Implemented Add to cart and Remove from cart functinalities. Used conditional rendering for views and priviliges of different roles.

Password is encypted using crypto and salt using a private key and stored the encrypted password in MongoDb Atlas. Integrated the stripe payment gateway for the cart checkout.

