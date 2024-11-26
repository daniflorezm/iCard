const PRODUCT_CART = "productsCart"

export function getProductsCart() {
    const response = localStorage.getItem(PRODUCT_CART);
    return JSON.parse(response || "[]")
}

export function addProductCart(id) {
    const products = getProductsCart();
    products.push(id)
    localStorage.setItem(PRODUCT_CART, JSON.stringify(products))
}
export function removeProductCartApi(index) {
    const idProduct = getProductsCart();
    idProduct.splice(index, 1);
    localStorage.setItem(PRODUCT_CART, JSON.stringify(idProduct));

}

export function cleanProductCartApi() {
    localStorage.removeItem(PRODUCT_CART);
}