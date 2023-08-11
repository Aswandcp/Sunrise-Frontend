<!-- import { useMutation, gql } from '@apollo/client';

const CREATE_CHECKOUT_SESSION = gql`
  mutation CreateCheckoutSession($cart: [CartItemInput], $customer: ID!) {
    createCheckoutSession(cart: $cart, customer: $customer) {
      sessionId
      url
    }
  }
`;

export default {
  
  setup() {
    const [createCheckoutSession] = useMutation(CREATE_CHECKOUT_SESSION);

    const placeOrder = () => {
      // Prepare cart and customer data
      const cart = []; // Populate with the cart items
      const customer = ""; // Provide the customer ID

      createCheckoutSession({
        variables: { cart, customer },
      })
        .then((response) => {
          const session = response.data.createCheckoutSession;
          // Redirect to the session URL
          window.location.href = session.url;
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle error, show error message, etc.
        });
    };

    return {
      placeOrder,
    };
  },
}; -->
