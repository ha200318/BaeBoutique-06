$(document).ready(function () {
    // Khi di chuột vào ảnh sản phẩm
    $(".product-image, .buy-now-btn").mouseover(function () {
        $(this)
            .closest(".product-card")
            .find(".product-image")
            .css("filter", "brightness(70%)"); // Giảm độ sáng
        $(this).siblings(".card-body").find(".buy-now-btn").fadeIn(); // Hiện nút mua ngay
    });

    // Khi di chuột ra khỏi ảnh sản phẩm
    $(".product-image, .buy-now-btn").mouseleave(function () {
        $(this)
            .closest(".product-card")
            .find(".product-image")
            .css("filter", "brightness(100%)"); // Khôi phục độ sáng ban đầu
        $(this).siblings(".card-body").find(".buy-now-btn").fadeOut(); // Ẩn nút mua ngay
    });
});

/* -------------------------------------------------------------------------- */
/*                                  CODE MỚI                                  */
/* -------------------------------------------------------------------------- */
var products = [
    {
        name: "Bộ váy Giáng sinh",
        price: 600000,
        discount: 10,
        size: ["3-6M","9-12M"],
        gender: "girl",
        img: "images/c1/bộ_váy_giáng_sinh.jpg",
    },
    {
        name: "Set váy Giáng sinh",
        price: 590000,
        discount: 5,
        size: "18-24M",
        gender: "girl",
        img: "images/c1/set_váy_giáng_sinh.jpg",
    },
    {
        name: "Choàng tắm unicorn",
        price: 350000,
        discount: 0,
        size: "9-12M",
        gender: "unisex",
        img: "images/c1/choàng_tắm_unicorn.jpg",
    },
    {
        name: "Vòi sen mini",
        price: 1290000,
        discount: 0,
        size: "9-12M",
        gender: "unisex",
        img: "images/c1/vòi_sen_mini.jpg",
    },
    {
        name: "Bộ liền Giáng sinh",
        price: 390000,
        discount: 20,
        size: "9-12M",
        gender: "boy",
        img: "images/c1/bộ_liền_giáng_sinh.jpg",
    },
    {
        name: "Set cắt móng tay",
        price: 199000,
        discount: 0,
        size: "9-12M",
        gender: "unisex",
        img: "images/c1/set_cắt_móng_tay.jpg",
    },
    {
        name: "Yếm len Giáng sinh",
        price: 360000,
        discount: 0,
        size: "9-12M",
        gender: "unisex",
        img: "images/c1/yếm_len_giáng_sinh.jpg",
    },
    {
        name: "Xe tập đi",
        price: 1190000,
        discount: 0,
        size: "9-12M",
        gender: "unisex",
        img: "images/c1/xe_tập_đi.jpg",
    },
    {
        name: "Xe đẩy",
        price: 2390000,
        discount: 5,
        size: "9-12M",
        gender: "unisex",
        img: "images/c1/xe_đẩy.jpg",
    },
    // { name: "Choàng tắm gấu trắng", price: 350000, discount: 10, size: "9-12M", gender: "unisex", img: "images/c1/choàng_tắm_gấu_trắng.jpg" },
    // Có thể thêm sản phẩm tương tự nhé
];

/* ------------------------- Tạo các biến cần thiết ------------------------- */
var listProductElement = document.getElementById("listProduct");
var favoritesListElement = document.getElementById("favoritesList");
var searchInputElement = document.getElementById("searchInput");
var sizeFilterElement = document.getElementById("sizeFilter");
var priceFilterElement = document.getElementById("priceFilter");
var sortOrderElement = document.getElementById("sortOrder");
var genderFilterElement = document.getElementById("genderFilter");
/* ------------------------- Tạo các biến cần thiết ------------------------- */

/* ------------------------- Thêm sản phẩm yêu thích ------------------------ */
function addToFavorites(product) {
    var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.find((item) => item.name === product.name)) {
        favorites.push(product);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert("Đã thêm vào danh sách yêu thích!");
        displayFavorites();
    } else {
        alert("Sản phẩm đã có trong danh sách yêu thích!");
    }
}
/* ------------------------- Thêm sản phẩm yêu thích ------------------------ */

/* ------------------------- Xóa sản phẩm yêu thích ------------------------- */
function deleteFromFavorites(productName) {
    var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    var updatedFavorites = favorites.filter((item) => item.name !== productName);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    displayFavorites();
}
/* ------------------------- Xóa sản phẩm yêu thích ------------------------- */
/* ----------------------- Hiển thị sản phẩm yêu thích ---------------------- */
function displayFavorites() {
    var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favoritesListElement.innerHTML = ""; // Clear the list

    if (favorites.length === 0) {
        // Nếu ko có sp yêu thích nào
        favoritesListElement.innerHTML =
            "<p id='emptyFavoritesMessage'>Chưa có sản phẩm yêu thích nào.</p>";
    } else {
        // nếu có sp yêu thích thì hiển thị
        favorites.forEach(function (product) {
            var listItem = document.createElement("li");
            listItem.innerHTML = `
                    <img width="100px" src="${product.img}" alt="">
                    <span>${product.name}</span>
                    <span>${product.price.toLocaleString()}₫</span>
                    <button class="btn btn-danger delete-btn" onclick="deleteFromFavorites('${product.name
                }')">Xóa</button>
                    `;
            favoritesListElement.appendChild(listItem);
        });
    }
    // Cập nhật số lượng chỗ icon yêu thích trên header
    document.getElementById("favoritesCount").innerText = favorites.length;
}
/* ----------------------- Hiển thị sản phẩm yêu thích ---------------------- */

/* ---------------------------- Hiển thị sản phẩm --------------------------- */
function displayProducts(filteredProducts) {
    listProductElement.innerHTML = ""; // Xóa danh sách sp hiện tại

    // Hiển thị từng sản phẩm
    filteredProducts.forEach(function (product) {
        var discountedPrice =
            product.price - product.price * (product.discount / 100);
        var productHtml = `
            <div class="col-6 col-md-4 col-xl-3">
            <div class="card product-card">
            <img src="${product.img}" class="card-img-top product-image" alt="${product.name
            }">
            <div class="card-body">
            <a href="./product-detail.html"><h5 class="card-title">${product.name
            }</h5></a>
            <div class="box-pro-prices">
            <p class="pro-price-highlight">
            <span style="font-weight: bold; font-size: large;">${discountedPrice.toLocaleString()}₫</span>
                ${product.discount
                ? `<span class="discount">${product.price.toLocaleString()}₫</span>`
                : ""
            }
            </p>
            </div>
            <button class="btn btn-primary buy-now-btn" onclick="addToCart(${JSON.stringify(
                product
            ).replace(/"/g, "&quot;")})">Thêm vào giỏ hàng</button>
            <button class="love" onclick="addToFavorites(${JSON.stringify(
                product
            ).replace(
                /"/g,
                "&quot;"
            )})"><i class="fa-regular fa-heart"></i></button>
            </div>
            </div>
            </div>
            `;
        listProductElement.innerHTML += productHtml;
    });
}
/* ---------------------------- Hiển thị sản phẩm --------------------------- */

/* ---------------------------- Hàm lọc và sắp xếp sản phẩm --------------------------- */
function filterAndSortProducts() {
    var searchQuery = searchInputElement.value.toLowerCase();
    var sizeFilter = sizeFilterElement.value;
    var priceFilter = priceFilterElement.value;
    var sortOrder = sortOrderElement.value;
    var genderFilter = genderFilterElement.value; // Thêm giới tính

    var filteredProducts = products.filter(function (product) {
        return (
            product.name.toLowerCase().includes(searchQuery) &&
            (!sizeFilter || product.size.includes(sizeFilter)) &&
            (priceFilter === "" || product.price <= parseInt(priceFilter)) &&
            (genderFilter === "" || product.gender === genderFilter)
        );
    });

    // Sắp xếp sản phẩm
    filteredProducts = sortProducts(filteredProducts, sortOrder);

    // Hiển thị sản phẩm đã lọc và sắp xếp
    displayProducts(filteredProducts);
}
/* ---------------------------- Hàm lọc và sắp xếp sản phẩm --------------------------- */

/* ---------------------------- Hàm sắp xếp sản phẩm --------------------------- */
function sortProducts(filteredProducts, sortOrder) {
    if (sortOrder === "az") {
        return filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "za") {
        return filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    }
    if (sortOrder === "asc") {
        return filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
        return filteredProducts.sort((a, b) => b.price - a.price);
    } else {
        return filteredProducts;
    }
}
/* ---------------------------- Hàm sắp xếp sản phẩm --------------------------- */
/* ---------------------------- Tìm kiếm sản phẩm --------------------------- */
function searchProducts() {
    filterAndSortProducts();
}
/* ---------------------------- Tìm kiếm sản phẩm --------------------------- */

/* ------------------------ Thêm sản phẩm vào giỏ hàng ----------------------- */
function addToCart(product) {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    var existingProduct = cart.find((item) => item.name === product.name);

    if (existingProduct) {
        // Nếu sản phẩm đã tồn tại, chỉ tăng số lượng
        existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
        // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng!");
    displayCart();
}
/* ------------------------ Thêm sản phẩm vào giỏ hàng ----------------------- */

// Hiển thị tất cả các sp khi trang được tải  (ko cần phải copy từng sp bên HTML, chạy vòng lặp và tải từng sp tương ứng với từng thông tin)
products.forEach(function (product) {
    var discountedPrice =
        product.price - product.price * (product.discount / 100);
    var productHtml = `
        <div class="col-6 col-md-4 col-xl-3">
        <div class="card product-card">
        <img src="${product.img}" class="card-img-top product-image" alt="${product.name
        }">
        <div class="card-body">
        <a href="./product-detail.html"><h5 class="card-title">${product.name
        }</h5></a>
        <div class="box-pro-prices">
        <p class="pro-price-highlight">
        <span style="font-weight: bold; font-size: large;">${discountedPrice.toLocaleString()}₫</span>
        ${product.discount
            ? `<span class="discount">${product.price.toLocaleString()}₫</span>`
            : ""
        }
                  </p>
              </div>
              <button class="btn btn-primary buy-now-btn" onclick="addToCart(${JSON.stringify(
            product
        ).replace(/"/g, "&quot;")})">Thêm vào giỏ hàng</button>
              <button class="love" onclick="addToFavorites(${JSON.stringify(
            product
        ).replace(
            /"/g,
            "&quot;"
        )})"><i class="fa-regular fa-heart"></i></button>
              </div>
              </div>
              </div>
      `;
    listProductElement.innerHTML += productHtml;
});

/* ----------------------- Hiển thị sản phẩm yêu thích ---------------------- */
displayFavorites();
/* ----------------------- Hiển thị sản phẩm yêu thích ---------------------- */
displayCart();
var cart = JSON.parse(localStorage.getItem("cart")) || [];
document.getElementById("cartsCount").innerText = cart.length;
/* -------------------------------------------------------------------------- */
/*                                  CODE MỚI                                  */
/* -------------------------------------------------------------------------- */
