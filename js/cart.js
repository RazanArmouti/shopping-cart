/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
let cart;
let cartList=[];

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  let rowCount = table.rows.length;
  for (let x=rowCount-1; x>0; x--) {
    table.deleteRow(x);
  }
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  // TODO: Find the table body
  let tableBody = table.getElementsByTagName('tbody')[0];
  cartList= JSON.parse(localStorage.cart);

  // TODO: Iterate over the items in the cart
  // TODO: Create a TR
  // TODO: Create a TD for the delete link, quantity,  and the item
  // TODO: Add the TR to the TBODY and each of the TD's to the TR
  for (let i=0; i<JSON.parse(localStorage.cart).length; i++){
    let tr = document.createElement('tr');
    tableBody.appendChild(tr);

    for (let j=0; j<3; j++){
      let td = document.createElement('td');
      td.width='75px';
      if(j===0){
        td.appendChild(document.createTextNode('Remove Item'));

      }else if(j===1){
        td.appendChild(document.createTextNode(cartList[i][1]));

      }else if(j===2){
        td.appendChild(document.createTextNode(cartList[i][0]));

      }

      tr.appendChild(td);
    }
  }

}

function removeItemFromCart(event) {
  let trIndex =0;
  cartList= JSON.parse(localStorage.cart);
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  let td = event.target.parentNode;
  let tr = td.parentNode; // the row to be removed
  trIndex= tr.rowIndex;
  tr.parentNode.removeChild(tr);

  // TODO: Save the cart back to local storage
  let storage = window.localStorage;
  storage.clear();


  cartList.splice(cart.indexOf(trIndex), 1);
  storage.setItem('cart', JSON.stringify(cartList));


  // TODO: Re-draw the cart table
  showCart();

}

// This will initialize the page and draw the cart on screen
renderCart();
