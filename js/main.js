// Fetch Data
let ProductsContainer = document.getElementById("productsContainer");
fetch("https://6351a0c99d64d7c71304d214.mockapi.io/Products")
  .then((res) => res.json())
  .then((data) => addProduct(data));

// Add Product With DOM
function addProduct(value) {
  value.map((ele) => {
    let ProductDiv = document.createElement("div");
    ProductDiv.className = "col-md-4 item";
    let img = document.createElement("img");
    img.src = ele.image;
    img.alt = ele.name;
    img.className = "ProductImage";
    let ProName = document.createElement("h5");
    ProName.className = "ProductName";
    ProName.textContent = ele.name;
    let type = document.createElement("p");
    type.className = "type";
    type.textContent = ele.type;
    let Price = document.createElement("span");
    Price.className = "Price";
    Price.textContent = `${ele.price}EGP`;
    let StarDiv = document.createElement("div");
    StarDiv.className = "StarDiv";
    // star
    for (let i = 0; i < 5; i++) {
      if (ele.rate <= i) {
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
    Description.textContent = ele.description;
    let icon = document.createElement("i");
    icon.className = "fa-solid fa-cart-shopping icon";
    let Details = document.createElement("a");
    Details.className = "Details";
    Details.href = "/";
    Details.textContent = "Details";
    ProductDiv.appendChild(img);
    ProductDiv.appendChild(ProName);
    ProductDiv.appendChild(type);
    ProductDiv.appendChild(Price);
    ProductDiv.appendChild(Price);
    ProductDiv.appendChild(StarDiv);
    ProductDiv.appendChild(icon);
    ProductDiv.appendChild(Details);
    ProductsContainer.appendChild(ProductDiv);
  });
}

// Search Input
let searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", FilterProducts);
function FilterProducts() {
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

function RangeFilter() {
  let Range = parseInt(document.getElementById("Range").value);
  console.log(Range);
  let Prodcut = document.querySelectorAll(".item");
  for (let item of Prodcut) {
    let Price = item.querySelector(".Price");
    if (parseInt(Price.innerHTML) <= Range) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  }
}
// Get the checkbox
// Filter Categories
let checkBoxshoes = document.getElementById("shoes");
let checkBoxshirts = document.getElementById("shirt");
let listCheckArr = [];
// let ProductsArr = []
let checkBoxs = document.querySelectorAll(".checkFill");

for (const check of checkBoxs) {
  check.addEventListener("click", function () {
    let Prodcut = document.querySelectorAll(".item");
    for (let item of Prodcut) {
      let activeStar = item.querySelectorAll(".active_i");
      let ProductType = item.querySelector(".type");
      if (this.checked) {
        listCheckArr.push(this.value);
        if (!listCheckArr.includes(ProductType.innerHTML)) {
          item.style.display = "none";
          // console.log(listCheckArr.includes(ProductType.innerHTML));
          // if (listCheckArr.includes(`${activeStar.length}`)) {
          //   item.style.display = "block";
          // } else {
          //   item.style.display = "none";
          // }
        } else {
          // console.log(listCheckArr);
          // item.style.display = "block";
          if (
            !listCheckArr.includes(`${activeStar.length}`) &&
            listCheckArr.includes(ProductType.innerHTML)
          ) {
            item.style.display = "none";
          } else if (
            listCheckArr.includes(`${activeStar.length}`) &&
            listCheckArr.indexOf(ProductType.innerHTML) > -1
          ) {
            item.style.display = "block";
            console.log(listCheckArr);
          } else if (
            !listCheckArr.includes(`${activeStar.length}`) &&
            !listCheckArr.includes(ProductType.innerHTML)
          ) {
            item.style.display = "block";
          } else {
            item.style.display = "block";
          }
        }
        // listCheckArr.push(this.value);
      } else if (this.checked === false) {
        if (listCheckArr.length > 0) {
          if (
            parseFloat(this.value) === parseInt(activeStar.length) ||
            this.value === ProductType.innerHTML
          ) {
            item.style.display = "none";
          }
          listCheckArr = listCheckArr.filter((ele) => ele !== this.value);
        } else {
          item.style.display = "block";
          listCheckArr = listCheckArr.filter((ele) => ele !== this.value);
        }
      }
    }
  });
}
// function FilterCat() {
//   let Prodcut = document.querySelectorAll(".item");
//   for (let item of Prodcut) {
//     let ProductType = item.querySelector(".type");
//     let activeStar = item.querySelectorAll(".active_i");
//     if (
//       (checkBoxshoes.checked && checkBoxshirts.checked) ||
//       (!checkBoxshoes.checked && !checkBoxshirts.checked)
//     ) {
//       item.style.display = "block";
//     } else if (checkBoxshoes.checked === true) {
//       if (ProductType.innerHTML === "shoes") {
//         if (checkBoxrate1.checked) {
//           if (activeStar.length === 1) {
//             item.style.display = "block";
//           } else {
//             item.style.display = "none";
//           }
//         }
//       } else {
//         item.style.display = "none";
//       }
//     } else if (checkBoxshirts.checked && !checkBoxshoes.checked) {
//       if (ProductType.innerHTML === "shirt") {
//         item.style.display = "block";
//       } else {
//         item.style.display = "none";
//       }
//     }
//   }
// }

// // Get the output text
// // Rate
// let checkBoxrate1 = document.getElementById("rate1");
// let checkBoxrate2 = document.getElementById("rate2");
// let checkBoxrate3 = document.getElementById("rate3");
// let checkBoxrate4 = document.getElementById("rate4");
// let checkBoxrate5 = document.getElementById("rate5");
// function StarFilter() {
//   let Prodcut = document.querySelectorAll(".item");
//   for (let item of Prodcut) {
//     let activeStar = item.querySelectorAll(".active_i");
//     let ProductType = item.querySelector(".type");
//     if (
//       (checkBoxrate1.checked &&
//         checkBoxrate2.checked &&
//         checkBoxrate3.checked &&
//         checkBoxrate4.checked &&
//         checkBoxrate5.checked) ||
//       (!checkBoxrate1.checked &&
//         !checkBoxrate2.checked &&
//         !checkBoxrate3.checked &&
//         !checkBoxrate4.checked &&
//         !checkBoxrate5.checked)
//     ) {
//       item.style.display = "block";
//     } else if (checkBoxrate1.checked) {
//       if (activeStar.length === 1) {
//         item.style.display = "block";
//       } else {
//         item.style.display = "none";
//       }
//     } else if (checkBoxrate2.checked) {
//       if (activeStar.length === 2) {
//         item.style.display = "block";
//       } else {
//         item.style.display = "none";
//       }
//     } else if (checkBoxrate3.checked) {
//       if (activeStar.length === 3) {
//         item.style.display = "block";
//       } else {
//         item.style.display = "none";
//       }
//     } else if (checkBoxrate4.checked) {
//       if (activeStar.length === 4) {
//         item.style.display = "block";
//       } else {
//         item.style.display = "none";
//       }
//     } else if (checkBoxrate5.checked) {
//       if (activeStar.length === 5) {
//         item.style.display = "block";
//       } else {
//         item.style.display = "none";
//       }
//     }
//   }
// }

//  Range

// function myFunction() {
//   Result = Products.filter(
//     (ele) =>
//       ele.price <= parseFloat(Range) &&
//       ele.name.toLowerCase().includes(searchInput.toLowerCase())
//   );
//   // If the checkbox is checked, display the output text
//   if (checkBoxshoes.checked === true) {
//     if (Products) {
//       Result = Products.filter(
//         (ele) => ele.type === "shoes" && ele.price <= parseFloat(Range)
//       );
//     }
//   } else if (checkBoxshirts.checked === true) {
//     Result = Products.filter(
//       (ele) => ele.type === "shirt" && ele.price <= parseFloat(Range)
//     );
//   } else {
//     Result = Products.filter(
//       (ele) =>
//         ele.price <= parseFloat(Range) &&
//         ele.name.toLowerCase().includes(searchInput.toLowerCase())
//     );
//   }

//   // console.log();
//   if (checkBoxrate1.checked === true) {
//     console.log("checkBoxrate1");
//   } else if (checkBoxrate2.checked === true) {
//     console.log("checkBoxrate2");
//   } else if (checkBoxrate3.checked === true) {
//     console.log("checkBoxrate3");
//   } else if (checkBoxrate4.checked === true) {
//     console.log("checkBoxrate4");
//   } else if (checkBoxrate5.checked === true) {
//     console.log("checkBoxrate5");
//   } else {
//     console.log("checkBoxrate All ");
//   }
//   if (searchInput.length > 0) {
//     Result.map((ele) => {
//       let NameDiv = document.createElement("h5");
//       NameDiv.textContent = ele.name;
//       ProductsContainer.appendChild(NameDiv);
//     });
//   } else {
//     Result = Products.filter(
//       (ele) =>
//         ele.price <= parseFloat(Range) &&
//         ele.name.toLowerCase().includes(searchInput.toLowerCase())
//     ).map((ele) => {
//       let NameDiv = document.createElement("h5");
//       NameDiv.textContent = ele.name;
//       ProductsContainer.appendChild(NameDiv);
//     });
//   }
// }
