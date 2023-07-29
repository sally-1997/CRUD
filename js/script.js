var productNameInput = document.getElementById('productName')
var productPriceInput = document.getElementById('productPrice')
var productCategoryInput = document.getElementById('productCategory')
var productDescInput = document.getElementById('productDesc') ;
var addBtn=document.getElementById('addBtn') ;
var indexUpdate="" ;
var productsContainer ;
if(localStorage.getItem('products')==null){
    productsContainer =[] ;
}
else{
    // productsContainer =JSON.parse(localStorage.getItem(' products'));
    productsContainer = JSON.parse(localStorage.getItem('products'))
    displayProducts(productsContainer)
}

function testCapital(){
    if(productNameInput.value.charAt(0)==productNameInput.value.charAt(0).toUpperCase()){
        // productNameInput.setAttribute('class','form-control my-2 bg-outine-success')
        console.log('vary good')
    }
    else {
        console.log('bad')
    }
}
productNameInput.addEventListener('keyup',testCapital)

// Document.addEventListener(keyup,testCapital)


function addProduct(){
    if(addBtn.innerHTML=='Add Product'){
        var product = {
            name : productNameInput.value ,
            price : productPriceInput.value ,
            category : productCategoryInput.value ,
            desc : productDescInput.value
           }
           productsContainer.push(product) ;
           localStorage.setItem('products',JSON.stringify(productsContainer))
           displayProducts(productsContainer) ;
           clearForm() ;
    }
    else {
        // update ..
        function upProduct(indexItem){
            productsContainer[indexItem].name=productNameInput.value;
            productsContainer[indexItem].price=productPriceInput.value ;
            productsContainer[indexItem].category=productCategoryInput.value;
            productsContainer[indexItem].desc=productDescInput.value;
            localStorage.setItem('products',JSON.stringify(productsContainer)) ;
            displayProducts(productsContainer) ;
            clearForm() }
            
            upProduct(indexUpdate) ;
        }
  
}
function displayProducts(productsList){
    var cartoona=``;
    for(var i=0 ; i<productsList.length ; i++){
        cartoona += `
        <tr>
        <td>${i}</td>
        <td>${productsList[i].name}</td>
        <td>${productsList[i].price}</td>
        <td>${productsList[i].category}</td>
        <td>${productsList[i].desc}</td>
        <td><button onclick="updateProduct(${i})" class="btn btn-success">Update</button></td>
        <td><button onclick="deletProduct(${i})" class="btn btn-danger">Delete</button></td>
        
    </tr>
        `
        
    }
    document.getElementById('tableRow').innerHTML = cartoona
}
function searchProducts(term){
    var searchProducts=[] ;
    for(var i=0 ; i<productsContainer.length ; i++){
        if(productsContainer[i].name.toLowerCase().includes(term.toLowerCase())==true){
            // console.log(i)
            searchProducts.push(productsContainer[i])
        }
    }
    displayProducts(searchProducts)
    
}
function deletProduct(indexProduct){
    productsContainer.splice(indexProduct,1) ;
    localStorage.setItem('products',JSON.stringify(productsContainer)) ;
    displayProducts(productsContainer) ;
}
function updateProduct(indexItem){
    indexUpdate =indexItem ;
    productNameInput.value =productsContainer[indexItem].name;
    productPriceInput.value=productsContainer[indexItem].price;
    productCategoryInput.value=productsContainer[indexItem].category;
    productDescInput.value=productsContainer[indexItem].desc ;
    // addBtn = `<button onclick="addProduct()" class="btn btn-success" id="addBtn">Update Product</button>`
    // addBtn.style.backgroundColor="green" ;
    addBtn.innerHTML="Update Product";
    addBtn.setAttribute('class','btn btn-success')
    console.log(indexUpdate)
} 
function clearForm(){
    productNameInput.value ="";
    productPriceInput.value="";
    productCategoryInput.value="";
    productDescInput.value=""
}
