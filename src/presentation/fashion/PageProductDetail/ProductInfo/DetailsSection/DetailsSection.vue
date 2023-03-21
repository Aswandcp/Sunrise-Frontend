
import { placeholder } from '@babel/types';


import { placeholder } from '@babel/types';



<style src="./DetailsSection.scss" lang="scss" scoped></style>
<i18n src="./DetailsSection.txt" lang="yaml"></i18n>
<script src="./DetailsSection.js">




</script>


<template>
  <div
    class="description-review-wrapper"
    v-if="currentVariant"
  >
    <div class="panel-group" id="accordion1">
      <div class="panel pro-dec-accordion">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a
              href="#"
              @click.prevent="toggle(0)"
              :class="{ collapsed: !expanded[0] }"
              data-test="product-attributes-accordion"
            >
              {{ t('productDetails') }}
            </a>
          </h4>
        </div>
        <div
          data-parent="#accordion1"
          id="pro-dec-accordion1"
          class="
            product-description-wrapper
            panel-collapse
            collapse
          "
          :class="{ show: expanded[0] }"
        >
          <div class="panel-body">
            <ul class="product-features-list">
              <li
                v-for="attribute in attributes"
                data-test="product-attributes-list"
                :key="attribute.name"
              >
                <span class="attribute-name">
                  {{ attribute.name }}:
                </span>
                <span>
                  {{ attribute.label || attribute.value }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="panel pro-dec-accordion">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a
              href="#"
              @click.prevent="toggle(1)"
              :class="{ collapsed: !expanded[1] }"
            >
              {{ t('deliveryReturns') }}
              
            </a>
          </h4>
        </div>
      <div>
        <div class="panel pro-dec-accordion">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a
              href="#" 
              @click.prevent="toggle(2)"
              :class="{ collapsed: !expanded[2] }"
              data-test="product-attributes-accordion"
            >
              {{ t('Reviews') }}
            </a>
          </h4>
        </div> 
        <div
          data-parent="#accordion1"
          id="pro-dec-accordion3"
          class="
            product-description-wrapper
            panel-collapse
            collapse 
          "
          :class="{ show: expanded[2] }"
        > 
        
          
            <div  class="review-item-container" v-for="item in user" :key="item.customerId">
            <div class="review-item-user"><div class="review-item-avatar"></div><div class="review-item-name">{{ item.firstName }}</div></div> 
             <!-- <div class="review-item-content"> <i class="dl-icon-star" v-for="index in parseInt( item.rating)" :key="index"></i> </div> -->
             <!-- <div class="review-item-content" >{{  item.rating }} </div> -->
             <!-- <star-rating >{{  item.rating }}</star-rating> -->
              <star-rating v-model="rating" :max-rating="5" :star-size="30" :active-color="'gold'" :inactive-color="'gray'"></star-rating>

             <div class="review-item-content"> {{ item.review }}</div>
             
             <!-- <button v-on:click="removeElement(item)">remove</button>
             <button @click="$delete(item)">remove</button> -->
             </div>

            <!-- <td>{{ user.review }}</td>
            <td>{{ user.rating }}</td> -->
          
        
         <!-- <div class="panel-body">
            <ul>
      <li v-for="reviews in reviews" :key="reviews.customerId">
        <div>Comment: {{ reviews.comment }}</div>
        <div>Rating: {{ reviews.rating }}</div>

      </li> 
    </ul> -->
<!--            
          </div> 
          <div class="tabs">
        <div class="tabLinks">
            <span class="tab" v-for="(tab,index) in tabs"
             :key="index"
             @click="selectedTabs = tab"
             :class="{activeTab: selectedTabs === tab}">
             {{ tab }}
            </span>
        </div>
        <div class="tabContent">
            <div class="reviews" v-show="selectedTabs === 'Reviews'">  -->
      <!-- <h2>Reviews</h2>  -->
      <!-- <p v-if="!reviews.length">There are no reviews yet....</p>
      <ul> 
        <li v-for="(user, index) in user" :key="index">
        <p>{{ user.reviews }}</p>
        <span>{{ this.user.review }} <strong>Rating:</strong>{{ this.user.rating }}</span>
        </li> 
      </ul>
    </div> -->
    <!-- <product-review v-show="selectedTabs === 'Make a Review' "></product-review> -->
            
        <!-- </div>
          
        </div>  -->
    </div>

 </div>
   
   <div class="panel pro-dec-accordion">
        <!-- <div class="panel-heading">
          <h4 class="panel-title">
            <a
              href="#"
              @click.prevent="toggle(3)"
              :class="{ collapsed: !expanded[3] }"
              data-test="product-attributes-accordion"
            > 
              {{ t('Add Reviews') }}
            </a>
          </h4>
        </div> -->
        <div
          data-parent="#accordion1"
          id="pro-dec-accordion3"
          class="
            product-description-wrapper
            panel-collapse
            collapse
          "
          :class="{ show: expanded[3] }"
        >
          <div class="panel-body">
            
          </div>
        </div>
      </div> 
        <div>
          <form class="review-form" >
            <div class="rows" > 
               <label for="review"  >Comment:</label>
              
              <textarea id="review" v-model="reviews.review"></textarea>
              
          </div>
          <div class="rows">
            <label for="rating">Rating:</label>
            <select id="rating"  v-model.number="reviews.rating">
              <option value="" disabled selected>Your Rating</option>
              <option>5</option>
              <option>4</option>
              <option>3</option>
              <option>2</option>
              <option>1</option>
            </select>
          </div>
          <br>
          <div class="rows">
            <button type="button" v-on:click="addReview" >Submit</button>
            <!-- @click="handler" // after button put this --> 
          </div>
          <div v-if="feedbackSubmitted" class="feedback-message">
           Thanks for your feedback!
          </div>
        </form>
    </div>  


  </div>

        <div
          data-parent="#accordion1"
          id="pro-dec-accordion2"
          class="
            product-description-wrapper
            panel-collapse
            collapse
          "
          :class="{ show: expanded[1] }"
        >
          <div class="panel-body">
            <ul class="product-delivery-list">
              <li>{{ t('freeReturns') }}</li>
              <li>{{ t('moreDeliveryInfo') }}</li>
            </ul>
          </div>
        </div>
        
      </div>
    </div>

  
  </div>


</template>
