// Fetch Data
let ProductsContainer = document.getElementById("productsContainer");
let searchInput = document.getElementById("searchInput");
let RangeBtn = document.getElementById("Range");
// Get ALl Data
fetch("https://6351a0c99d64d7c71304d214.mockapi.io/Products/1")
  .then((res) => res.json())
  .then((json) => {
    prevPage(json.length);
    nextPage(json.length);
    getData(json.length);
    // iterating products
    for (let value of json.Products) {
      addElement(ProductsContainer, value);
    }
  });

//  search Products
searchInput.addEventListener("keyup", FilterSearch);
function FilterSearch() {
  let TextValue = searchInput.value.toLowerCase();
  let Prodcut = document.querySelectorAll(".item");
  for (let item of Prodcut) {
    let ProductName = item.querySelector(".ProductName");
    if (ProductName.innerHTML.toLowerCase().includes(TextValue)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  }
}

// RangeBtn.addEventListener("change", filterProducts);
document.querySelectorAll(".Fill").forEach((item) => {
  item.addEventListener(["change"], filterProducts);
});

// callback function
let listCheckArr = [];

function filterProducts(e) {
  let item = ProductsContainer.querySelectorAll(".item");
  let Range = parseInt(document.getElementById("Range").value);
  for (let pro of item) {
    let Price = pro.querySelector(".Price");
    if (parseInt(Price.innerHTML) <= Range) {
      if (e.target.checked === true) {
        // console.log(e.target);
        listCheckArr.push(e.target.value);
        if (
          listCheckArr.includes(`${pro.id}`) ||
          listCheckArr.includes(`${pro.getAttribute("rate")}`)
        ) {
          pro.style.display = "block";
        } else {
          pro.style.display = "none";
        }
      } else if (e.target.checked === false) {
        if (listCheckArr.length > 0) {
          if (parseInt(Price.innerHTML) <= Range) {
            if (e.target.value === pro.id) {
              console.log(e.target.value);
              console.log(pro.id);
              listCheckArr = listCheckArr.filter(
                (ele) => ele !== e.target.value
              );
              if (
                listCheckArr.includes(`${pro.id}`) &&
                listCheckArr.includes(`${pro.getAttribute("rate")}`)
              ) {
                pro.style.display = "block";
                listCheckArr = listCheckArr.filter(
                  (ele) => ele !== e.target.value
                );
              } else {
                pro.style.display = "none";
              }
            } else if (
              parseFloat(pro.getAttribute("rate")) ===
              parseFloat(e.target.value)
            ) {
              listCheckArr = listCheckArr.filter(
                (ele) => ele !== e.target.value
              );
              pro.style.display = "none";
              console.log("Remove initial");
            }
          } else {
            pro.style.display = "none";
            listCheckArr = listCheckArr.filter((ele) => ele !== e.target.value);
          }
        } else {
          pro.style.display = "block";
          listCheckArr = listCheckArr.filter((ele) => ele !== e.target.value);
        }
      }
    } else {
      pro.style.display = "none";
    }
  }
}

// get value from the api create dynamic element
function addElement(appendIn, value) {
  // let div = document.createElement("div");
  // div.className = "item justify-self-center";
  let { image, name, type, price, rate, description } = value;
  let ProductDiv = document.createElement("div");
  ProductDiv.className = "col-md-4 item";
  ProductDiv.id = type;
  ProductDiv.setAttribute("rate", rate);
  ProductDiv.setAttribute("filter", `${name} ${type} ${price} ${rate}`);
  let img = document.createElement("img");
  img.src = image;
  img.alt = name;
  img.className = "ProductImage";
  let ProName = document.createElement("h5");
  ProName.className = "ProductName";
  ProName.textContent = name;
  let Protype = document.createElement("p");
  Protype.className = "type";
  Protype.textContent = type;
  let Price = document.createElement("span");
  Price.className = "Price";
  Price.textContent = `${price}EGP`;
  let StarDiv = document.createElement("div");
  StarDiv.className = "StarDiv";
  // star
  for (let i = 0; i < 5; i++) {
    if (rate <= i) {
      let normalStar = document.createElement("i");
      normalStar.className = "fa-regular fa-star Normal_star";
      StarDiv.appendChild(normalStar);
    } else {
      let activeStar = document.createElement("i");
      activeStar.className = "fa-solid fa-star active_star active_i";
      StarDiv.appendChild(activeStar);
    }
  }
  let Description = document.createElement("p");
  Description.className = "Description";
  Description.textContent = description;
  let icon = document.createElement("i");
  icon.className = "fa-solid fa-cart-shopping icon";
  let Details = document.createElement("a");
  Details.className = "Details";
  Details.href = "/";
  Details.textContent = "Details";
  ProductDiv.appendChild(img);
  ProductDiv.appendChild(ProName);
  ProductDiv.appendChild(Protype);
  ProductDiv.appendChild(Price);
  ProductDiv.appendChild(Price);
  ProductDiv.appendChild(StarDiv);
  ProductDiv.appendChild(icon);
  ProductDiv.appendChild(Details);
  ProductsContainer.appendChild(ProductDiv);
  appendIn.appendChild(ProductDiv);
}

// Pagenation
let current_page = 1;
let records_per_page = 2;

function prevPage(data) {
  if (current_page > 1) {
    current_page--;
    changePage(current_page, data);
  }
}
function nextPage(data) {
  if (current_page < numPages()) {
    current_page++;
    changePage(current_page, data);
  }
}

function changePage(page, len) {
  let btn_next = document.getElementById("btn_next");
  let btn_prev = document.getElementById("btn_prev");
  let listing_table = document.getElementById("productsContainer");
  // let page_span = document.getElementById("page");
  console.log(page + len);
  // Validate page
  if (page < 1) page = 1;
  if (page > numPages()) page = numPages();

  listing_table.innerHTML = "";

  for (
    let i = (page - 1) * records_per_page;
    i < page * records_per_page && i < len.length;
    i++
  ) {
    listing_table.innerHTML += len[i].adName + "<br>";
  }
  console.log(page);
  // page_span.innerHTML = page + "/" + numPages();

  if (page == 1) {
    btn_prev.style.visibility = "hidden";
  } else {
    btn_prev.style.visibility = "visible";
  }

  if (page == numPages()) {
    btn_next.style.visibility = "hidden";
  } else {
    btn_next.style.visibility = "visible";
  }
}

function numPages(data) {
  return Math.ceil(data / records_per_page);
}

function getData(data) {
  numPages(data);
}
