export const PRODUCT_CATEGORIES = [
  "Elektronika",
  "Materiały budowlane",
  "Narzędzia",
  "Chemia",
  "Meble",
  "Odzież",
  "Spożywcze",
  "Napoje",
  "Inne",
];

export const PRODUCT_PACKAGING_TYPES = [
  "Karton",
  "Paleta",
  "Skrzynia",
  "Worek",
  "Inne"
];

export const PRODUCT_UNITS = ["sztuka", "kg", "m", "butelek", "pojedynczych opakowań"];

export const PRODUCT_STATUSES = ["Do załadunku", "W magazynie", "Załadowano"];

export const getProducts = () =>
  JSON.parse(localStorage.getItem("products") || "[]");

export const saveProducts = (products) =>
  localStorage.setItem("products", JSON.stringify(products));

export const addProduct = (product) => {
  const products = getProducts();
  products.push(product);
  saveProducts(products);
};

export const updateProduct = (updatedProduct) => {
  const products = getProducts().map(p =>
    p.id === updatedProduct.id ? updatedProduct : p
  );
  saveProducts(products);
};

export const deleteProduct = (id) => {
  const products = getProducts().filter(p => p.id !== id);
  saveProducts(products);
};