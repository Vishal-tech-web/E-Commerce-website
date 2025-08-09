let productsWrapper = document.getElementById("productsWrapper");
let cart = document.getElementById("cart")
let cartItems=[];

window.addEventListener("load" , displayCartItems);


async function fetchProducts() {
  try {
    let response = await fetch("https://fakestoreapi.com/products");
    let data = await response.json();
    console.log(data);
    displayProducts(data);
  } catch (error) {
    console.log(error);
    productsWrapper.innerHTML = `<h2>Something went wrongðŸ¤ª</h2>`;
  }
}
fetchProducts();

function displayProducts(allproducts) {
  allproducts.map((product) => {
    //! creating elements dynamically
    let card = document.createElement("article");
    let productImage = document.createElement("img");
    let productTitle = document.createElement("h3");
    let productPrice = document.createElement("p");
    let btn = document.createElement("button");

    productTitle.textContent = product.title;
    productPrice.textContent = `Rs.${product.price}`;
    btn.textContent = "add to cart";

    //! setting attribute dynamically
    card.setAttribute("class", "productCard");
    card.setAttribute("data-aos","fade-up")
    card.setAttribute("data-aos-duration","3000");
    productImage.setAttribute("src", product.image);

    btn.addEventListener("click",()=>{
      console.log("add to cart");

      let existingProduct=cartItems.find((ele) =>{
        return ele.id === product.id;
      })
      
      if (existingProduct){
        existingProduct.quantity +=1;

      }else{

        cartItems.push({...product,quantity:1});
      }

      console.log(cartItems);
      localStorage.setItem("cart",JSON.stringify(cartItems))
      displayCartItems()
      
    })
    card.append(productImage, productTitle, productPrice, btn);
    productsWrapper.append(card);
  });
}

//display cart items

function displayCartItems(){

cart.innerHTML="";

let cartproducts= JSON.parse( localStorage.getItem("cart"))
console.log(cartproducts);
cartproducts?.map((item)=>{
  
  let cartCard = document.createElement("article")
  let cartImg = document.createElement("img")
  let cartTitle = document.createElement("h3");
  let cartPrice = document.createElement("p");
  let cartQuantity = document.createElement("p");
  

cartCard.setAttribute("class", "cartCard")
cartImg.setAttribute("src",item.image)
cartTitle.textContent= item.title
cartQuantity.textContent= `Qty: ${item.quantity}`
cartPrice.textContent= `Rs ${item.quantity*item.price}`


cartCard.append(cartImg,cartTitle,cartQuantity,cartPrice);

cart.append(cartCard);

})

}