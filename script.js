
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const pageStart = document.getElementById("page-start");
    const pageList = document.getElementById("page-list");
    const pageDetails = document.getElementById("page-details");
    const productList = document.getElementById("productList");
    const tryAgainLink = document.getElementById("tryAgainLink");
    const backToSearchLink = document.getElementById("backToSearchLink");

    searchButton.addEventListener("click", function () {
        const searchTerm = searchInput.value.trim();

        if (searchTerm !== "") {
            // Hier rufen Sie die Daten ab und zeigen die Suchergebnisse an
            fetchDataAndDisplayResults(searchTerm);
        } else {
            alert("Bitte geben Sie einen Suchbegriff ein.");
        }
    });


    function fetchDataAndDisplayResults(searchTerm) {
        // Daten von Ihrem JSON-Endpunkt abrufen
        fetch(`https://dummyjson.com/products/search?q=${searchTerm}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Ergebnisse löschen, falls bereits vorhanden
                productList.innerHTML = "";

                if (data.products.length > 0) {
                    // Anzeige der Suchergebnisse
                    data.products.forEach(product => {
                        const productLink = document.createElement("a");
                        productLink.href = `#${product.id}`;
                        productLink.textContent = product.title;
                        productLink.addEventListener("click", function (event) {
                            event.preventDefault();
                            showProductPage(product);
                        });

                        const productContainer = document.createElement("div");
                        productContainer.classList.add("product-container");
                        productContainer.appendChild(productLink);

                        productList.appendChild(productContainer);
                    });

                    // Zeige die Übersichtsseite an
                    showListPage();
                } else {
                    // Keine Ergebnisse gefunden
                    showNoResultsPage();
                }
            })
            .catch(error => {
                console.error('Fehler beim Abrufen der Daten:', error);
            });
    }

    function showListPage() {
        pageStart.style.display = "none";
        pageList.style.display = "block";
        pageDetails.style.display = "none";
    }

    function showNoResultsPage() {
        const pageStart = document.getElementById("page-start");
        const pageList = document.getElementById("page-list");
        const pageDetails = document.getElementById("page-details");
        const noResultPage = document.getElementById("NoResult");
    
        pageStart.style.display = "none";
        pageList.style.display = "none";
        pageDetails.style.display = "none";
        noResultPage.style.display = "block";
    }
    

    function showProductPage(product) {
        const productTitle = document.getElementById("productTitle");
        const productPrice = document.getElementById("productPrice");
        const productBrand = document.getElementById("productBrand");
        const productCategory = document.getElementById("productCategory");
        const productDescription = document.getElementById("productDescription");
        const productStock = document.getElementById("productStock");
        const productImage = document.getElementById("productImage");

        productTitle.textContent = product.title;
        productPrice.textContent = product.price;
        productBrand.textContent = product.brand;
        productCategory.textContent = product.category;
        productDescription.textContent = product.description;
        productStock.textContent = product.stock;
        productImage.src = product.thumbnail;
        productImage.alt = product.title;

        pageStart.style.display = "none";
        pageList.style.display = "none";
        pageDetails.style.display = "block";
    }
});