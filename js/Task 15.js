// Compulsory Task Note: 
// Feel free to reuse any work you have already done for this project.

// Your online store is required to implement the following: 
// ● Within the entirety of your site, you should have the following JavaScript functionality:
//  ○ Create a functional shopping cart for your online store.
//  ○ Allow a “quick add to cart” from the catalogue page.
//  ○ Each product’s page must also have the option to “add to cart”.
//  ○ When an item is added, an alert should tell the user what the current total is.
//  ○ Create a new html page for the cart section which allows the user to see what is in their cart, each item’s price, and the total cost (remember to add VAT!)
//  ○ Create a form which allows for “discount coupons”.
//  ○ Create forms to allow a user to select “collection” or “delivery”.
//  ○ Create forms for different delivery options.
//  ○ Your total should change based on what delivery option is chosen and if a certain coupon is applied.
//  ○ Create a “confirm order” button which alerts the user that their order was successful and generates them a reference number (keyword: generate)
//  ○ Within the entirety of your site, you should have at least the following jQuery functionality:
//     ■ A function which contains hiding/showing.
//     ■ A drop-down menu.
//     ■ Animation effects.
//     ■ A function with chained effects.



// Load itmes in local storage
load_cart();
// Display items in cart
display_cart();

// Button to add itmes to cart
$(".add-to-cart").click(function(event) {
    // load_cart();
    alert("Item added" + " " + total_cart());
    // event.preventDefault();
    var name = $(this).attr("data-name");
    var price = Number($(this).attr("data-price"));
    add_item_to_cart(name, price, 1);
    display_cart()
});
// Button used to clear all items in cart
$("#clear-cart").click(function(event) {
    clear_cart();
    display_cart();
});

// Button linked to delivery modal that adds the delivery price to the total
$(".purchase-btn").click(function() {
    load_cart();
    // console.log(total_cart());
    var deliver_price = (parseInt(total_cart()) + 300);
    var hex = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F");
    // Variables made to generate a random number or letter accros the length of the array
    var a = hex[Math.floor(Math.random() * hex.length)] + hex[Math.floor(Math.random() * hex.length)];
    var b = hex[Math.floor(Math.random() * hex.length)] + hex[Math.floor(Math.random() * hex.length)];
    var c = hex[Math.floor(Math.random() * hex.length)] + hex[Math.floor(Math.random() * hex.length)];
    var d = hex[Math.floor(Math.random() * hex.length)] + hex[Math.floor(Math.random() * hex.length)];
    var e = hex[Math.floor(Math.random() * hex.length)] + hex[Math.floor(Math.random() * hex.length)];
    var f = hex[Math.floor(Math.random() * hex.length)] + hex[Math.floor(Math.random() * hex.length)];
    // Variable to generate a coupon colde
    var reference = "#" + a + b + c + d + e + f;
    // console.log(deliver_price);
    alert("Thank you for your purchase.\n The delivery cost is R300, therefore your total price is :\n R" + deliver_price.toFixed(2) + "\nYour reference number is : " + reference);
})

// Button linked to in store collections that also gives out a coupon and adds a discount
$("#collect-button").click(function() {
        $(this).remove();
        // An array 
        var hex = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F");
        // Variables made to generate a random number or letter accros the length of the array
        var r = hex[Math.floor(Math.random() * hex.length)] + hex[Math.floor(Math.random() * hex.length)];
        var g = hex[Math.floor(Math.random() * hex.length)] + hex[Math.floor(Math.random() * hex.length)];
        var b = hex[Math.floor(Math.random() * hex.length)] + hex[Math.floor(Math.random() * hex.length)];
        // Variable to generate a coupon colde
        var coupon = "#" + r + g + b;
        alert("This is your coupon number.\n Please record it somewhere" + ":\n " + coupon);


    })
    // Button that adds discount when clicked to collect in store
$("#purchase-collection").click(function() {
    load_cart();
    var discount = (total_cart() - 300);
    console.log(discount);
    alert("Thank you for your purchase.\n Your coupon code has given you a discount of R300.\nYour previous total was " + total_cart() + "\nYour new total is :\n" + "R" + discount.toFixed(2));
});



// Function used to display items in a div on html
function display_cart() {
    var cart_array = list_cart();
    var output = "";
    for (var i in cart_array) {
        output += "<div class='cart-items'>" + cart_array[i].name + "<br>" +
            cart_array[i].price + "<br>" +
            cart_array[i].count + "<br>";
    }
    // Append the items to the html 
    $("#show-cart").html(output);
    $("#total-cart").html(total_cart());
}

// Empty array 
var cart = [];

// Construct function to pass the items through
var Item = function(name, price, count) {
    this.name = name
    this.price = price
    this.count = count
};
// Function that adds items 
function add_item_to_cart(name, price, count) {
    // For each item in cart...
    for (var i in cart) {
        // If the name of item matches add to the count
        if (cart[i].name === name) {
            cart[i].count += count;
            // Save the cart
            save_cart()
            return
        }
    }
    // Variable to pass new items through
    var item = new Item(name, price, count);
    // Push items in empty array
    cart.push(item);
    // Save items in cart
    save_cart();
}

// Function used to clear all items in cart
function clear_cart() {
    cart = [];
    save_cart();

}
// Function used to count the items in cart 
function count_cart() {
    var total_count = 0;
    for (var i in cart) {
        total_count += cart[i].count;
    }
    return total_count;
}
// Functions used to calculate the total cost of all items
function total_cart() {
    var total_cost = 0;
    for (var i in cart) {
        // total cost with VAT
        total_cost += cart[i].price * cart[i].count * 1.2;
    }
    // Decimal to 2 decimal places
    return total_cost.toFixed(2);
}


// Function used to make a duplicate of each item in the cart
function list_cart() {
    var copy_of_cart = [];
    for (var i in cart) {
        var item = cart[i];
        var copy_of_item = {};
        for (var p in item) {
            copy_of_item[p] = item[p];
        }
        copy_of_item.total = item.price * item.count;
        copy_of_cart.push(copy_of_item);
    }
    return copy_of_cart;

}
// Function usde to save all items in cart
function save_cart() {
    localStorage.setItem("shopping_cart", JSON.stringify(cart));
}
// function used to load items in cart
function load_cart() {
    cart = JSON.parse(localStorage.getItem("shopping_cart"));

}


// Get the modal for Delivery
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}