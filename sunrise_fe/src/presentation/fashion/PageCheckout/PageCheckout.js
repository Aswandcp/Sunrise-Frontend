import BillingDetails from './BillingDetails/BillingDetails.vue';
import OrderOverview from './OrderOverview/OrderOverview.vue';
import ServerError from 'presentation/components/ServerError/ServerError.vue';
// import useShippingMethods from './ct/useShippingMethods';
import { shallowRef, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import useCart from 'hooks/useCart';
import useCartTools from 'hooks/useCartTools';
// import {createCheckoutSession} from '../../../../composition/ct/usecheckoutmutation';
// import { useMutation, gql } from '@apollo/client';

import { loadStripe } from '@stripe/stripe-js';
import useCurrency from 'hooks/useCurrency';
import useCustomerTools from 'hooks/useCustomerTools';

export default {
  components: {
    // CheckoutTopSection,
    OrderOverview,
    BillingDetails,
    ServerError,
  },
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const shippingMethod = shallowRef(null);
    const billingAddress = shallowRef(null);
    const shippingAddress = shallowRef(null);
    const validBillingForm = shallowRef(false);
    const validShippingForm = shallowRef(true);
    const paymentMethod = shallowRef('card');
    const showError = shallowRef(false);
    const error = shallowRef(null);
    const { cart, loading } = useCart();
    const cartTools = useCartTools();

    const currency = useCurrency();
    const {     customer    } = useCustomerTools();
//     const CREATE_CHECKOUT_SESSION = gql`
//   mutation CreateCheckoutSession($cart: [CartItemInput], $customer: ID!) {
//     createCheckoutSession(cart: $cart, customer: $customer) {
//       sessionId
//       url
//     }
//   }
// `;

// const [createCheckoutSession] = useMutation(CREATE_CHECKOUT_SESSION);

// const placeOrders = () => {
  // Prepare cart and customer data
//   const cart = []; // Populate with the cart items
//   const customer = ""; // Provide the customer ID

//   createCheckoutSession({
//     variables: { cart, customer },
//   })
//     .then((response) => {
//       const session = response.data.createCheckoutSession;
//       // Redirect to the session URL
//       window.location.href = session.url;
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//       // Handle error, show error message, etc.
//     });
// };

// console.log("id is" ,customer);
    const goCheckout = async () => {
      try {
        const stripe = await loadStripe(`${process.env.VUE_APP_PK}`);
        // const { total } =
      // useShippingMethods(props.cart.cartId);
      //  console.log(total);
        // console.log(process.env.VUE_APP_CT_API_URL,"hallo");
        console.log(cart,"cart");
        const response = await fetch(`${process.env.VUE_APP_API_URL}/create-checkout-session`, {
          
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cart:{id: cart._rawValue.cartId,version: cart._rawValue.version,
              lineItems:cart._rawValue.lineItems.map((item)=>{return {
              price:{value:{centAmount:item.price.value.centAmount}},
              // productId:{value:{productId:item.productId.value.productId}},
              // product:{value:{name:item.name}},
              // images:{ images:item.variant.images[0].url},
              quantity: item.quantity,
              summary:{value:{summary :item.lineId + "  [" + item.name + "] "}},
              ...item



            }})},
            customer: customer._rawValue.customerId,
            currency: currency._rawValue, 
          }),
        });
        const session = await response.json();
        console.log(session);
         await stripe.redirectToCheckout({
          sessionId: session.sessionId,
        });
      } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error:', error);
      }
    };
    
    // const goCheckout = async () => {
    //   createCheckoutSession({cart,currency,customer})
    // };
    

    //@todo: what happened to the payment method passed to this?

    
    const placeOrder = () => {
      if (!validBillingForm.value) {
        showError.value = true;
        return Promise.resolve();
      }
      showError.value = false;
      return cartTools
        .setAddressForCart({
          billingAddress,
          shippingAddress,
        })
        .then(() => {
          router.push({
            name: 'pay',
            params: { method: paymentMethod.value },
          });
        })
        .catch((e) => {
          error.value = e;
        });
    };
    watch([cart, loading], ([cart, loading]) => {
      if (!cart && !loading) {
        router.replace({ path: '/' });
      }
    });
    const setValidBillingForm = (valid) => {
      validBillingForm.value = valid;
    };
    const setValidShippingForm = (valid) => {
      validShippingForm.value = valid;
    };
    const updateBilling = (billingDetails) => {
      billingAddress.value = JSON.parse(
        JSON.stringify(billingDetails)
      );
    };
    const updateShipping = (shippingDetails) => {
      shippingAddress.value = JSON.parse(
        JSON.stringify(shippingDetails)
      );
    };
    const updateShippingMethod = (shippingId) => {
      shippingMethod.value = shippingId;
    };
    const paymentChanged = (payment) => {
      paymentMethod.value = payment;
    };

    return {
      ...cartTools,
      placeOrder,
      shippingMethod,
      billingAddress,
      shippingAddress,
      validBillingForm,
      validShippingForm,
      showError,
      setValidBillingForm,
      setValidShippingForm,
      updateBilling,
      updateShipping,
      updateShippingMethod,
      paymentMethod,
      paymentChanged,
      error,
      cart,
      t,
      // placeOrders
      goCheckout
    };
  },
};
