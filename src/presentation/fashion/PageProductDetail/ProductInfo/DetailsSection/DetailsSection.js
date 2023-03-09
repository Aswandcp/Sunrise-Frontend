import { computed, shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  getAttributeValue,
  productAttributes,
} from 'containers/lib';
import useLocale from 'hooks/useLocale';
import { CUSTOMER } from '../../../../../constants';
import { axiosInstance } from '../../../../../sharedaxios/axiosConfig';
// import axios from 'axios';
export default {
  props: {
    currentVariant: {
      type: Object,
      required: true,
    },
  },

  data(){
    return{
      reviews:{
        firstName:'',
        lastName:'',
        customerId:'',
        productId:'',
        rating:'',
        review:'',

      },
      user:{},
      tabs:['Reviews'],
            selectedTabs:'Reviews'
    } 
  },

  methods:{
    addReview(){
      let customerDetails = JSON.parse(localStorage.getItem(CUSTOMER));
      console.log(customerDetails);
      let productId = localStorage.getItem('PRODUCT');
      
      axiosInstance(
        "https://reviewmanagementsystem-production.up.railway.app/reviews/add",

        {

          firstName:customerDetails.firstName,
          lastName:customerDetails.lastName,
          customerId:customerDetails.customerId,
          productId: productId,
          rating:`${this.reviews.rating}`,
          review:this.reviews.review,
        },
        "POST"
      ).then((response)=>{
        console.log(response);
      }).catch((error)=>{
        console.log(error);
      })
    },
    
  },
  mounted(){
    let productId = localStorage.getItem('PRODUCT');
    axiosInstance(`https://reviewmanagementsystem-production.up.railway.app/reviews/getAllReviews/${productId}`,{},"GET")
    .then((response)=>{
      console.log(response.data);
      this.user=response.data;
    })
    .catch((error)=>{
      console.log(error)
    })
  },
  setup(props) {
    const { t } = useI18n();
    const expanded = shallowRef([true, false]);
    const { locale } = useLocale();
    const attributes = computed(() => {
      const attributes =
        props.currentVariant.attributesRaw.map(
          ({ name, value }) => [
            name,
            getAttributeValue(value, locale.value),
          ]
        );
      return productAttributes(attributes, locale.value);
    });
    const openAccordion = (e) => {
      const contextPanelGroup = window
        .$('.pdp-accord-toggle')
        .parents('.panel-group-pdp');
      const contextPanel = window
        .$(e.target)
        .parents('.panel-default');
      const contextButton = window.$(
        '.accordion-plus',
        contextPanel
      );
      contextButton.toggleClass('accordion-minus');
      // Remove minus class on all other buttons
      contextPanelGroup
        .find('.accordion-plus')
        .not(contextButton)
        .removeClass('accordion-minus');
    };
    const toggle = (index) => {
      const copy = [...expanded.value];
      copy[index] = !copy[index];
      expanded.value = copy;
    };

   
    
    // const handler = ()=>{
    //   let customerDetails = JSON.parse(localStorage.getItem(CUSTOMER));
    //   console.log(customerDetails?.customerId);
    // };
    return {
      expanded,
      attributes,
      openAccordion,
      toggle,
      t,
      
      // handler
    };
  },
};
