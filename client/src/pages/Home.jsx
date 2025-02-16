import React, { useEffect, useState } from "react";
import axios from "axios";

import productData from "../data/products_200_final.json";
import AddProductModal from "../components/AddProductModal.jsx";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [sortedProducts, setSortedProducts] = useState(productData);
  const [filterProducts, setFilterProducts] = useState("");
  const [filterMaterials, setFilterMaterials] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [editProduct, setEditProduct] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProducts([...new Set(productData.map((item) => item.product))].sort());
    setMaterials([...new Set(productData.map((item) => item.material))].sort());

    setFilterProducts("");
    setFilterMaterials("");
    axios
      .get("http://localhost:3001/getdata")
      .then((res) => setSortedProducts(res.data.filter((item) => item.added)));
    setLoading(false);
  }, []);

  useEffect(() => {
    const filteredPs = [
      ...new Set(
        sortedProducts
          .filter((item) => item.product == filterProducts)
          .map((item) => item.material)
      ),
    ];
    setFilterMaterials(filteredPs);
  }, [filterProducts]);

  const searchFilter = () => {
    console.log(productData);
    const searchedProducts = productData.filter((item) =>
      item.grade.toLowerCase().includes(searchValue)
    );
    setSortedProducts(searchedProducts);
  };

  const sortBy = (type) => {
    let sortByProducts = [];
    if (type === "product") {
      sortByProducts = [...productData].sort((a, b) =>
        a.grade.localeCompare(b.grade)
      );
    } else {
      sortByProducts = [...productData].sort((a, b) => a.price - b.price);
    }
    setSortedProducts(sortByProducts);
    // do sort today
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="relative p-6 bg-gray-100 min-h-screen">
      {showModal && (
        <AddProductModal
          setShowModal={setShowModal}
          products={products}
          materials={materials}
          productData={productData}
        />
      )}
      <div className="flex flex-col space-y-4">
        {/* Add Products */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            + Add Products
          </button>
          <span className="text-lg font-semibold">
            {sortedProducts.length}/{productData.length} Products
          </span>
        </div>

        {/* Search */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search Products ..."
            className="w-full px-4 py-2 border rounded-lg"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={searchFilter}
          >
            Search
          </button>
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          <div className="flex gap-2 mb-4">
            <select
              className="p-2 border rounded"
              onChange={(e) => setFilterProducts(e.target.value)}
            >
              <option hidden>Products</option>
              {products.map((product) => {
                return (
                  <option value={product} key={product}>
                    {product}
                  </option>
                );
              })}
            </select>
            <select
              className={"p-2 border rounded"}
              onChange={(e) => {
                setSortedProducts((prev) =>
                  prev
                    .filter((item) => item.product === filterProducts)
                    .filter((item) => item.material === e.target.value)
                );
              }}
              disabled={!filterProducts}
            >
              <option hidden>Materials</option>
              {filterMaterials &&
                filterMaterials.map((material) => {
                  return (
                    <option value={material} key={material}>
                      {material}
                    </option>
                  );
                })}
            </select>
            <button
              className="bg-gray-300 px-4 py-2 rounded"
              disabled={!filterMaterials.length}
              onClick={() => {
                setFilterProducts("");
                setFilterMaterials("");
                setSortedProducts(productData.filter((item) => item.added));
              }}
            >
              Clear
            </button>
          </div>
          <div className="flex gap-2 mb-4">
            <select className="p-2 border rounded">
              <option>Bulk Actions</option>
            </select>
            <button className="bg-gray-300 px-4 py-2 rounded">Apply</button>
          </div>
        </div>

        {/* Products */}
        <div className="bg-white shadow rounded">
          <table className="w-full border-collapse">
            <thead className="bg-blue-200">
              <tr>
                <th
                  className="p-2 border cursor-pointer"
                  onClick={() => sortBy("product")}
                >
                  Products ^
                </th>
                <th className="p-2 border">Action</th>
                <th className="p-2 border">Product Details</th>
                <th
                  className="p-2 border cursor-pointer"
                  onClick={() => sortBy("price")}
                >
                  Price in Unit ^
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map((product, index) =>
                editProduct == product._id ? (
                  <tr key={index}>
                    <div>Hello</div>
                  </tr>
                ) : (
                  <tr key={index} className="border">
                    <td className="p-2 border">{product.grade}</td>
                    <td className="p-2 border">
                      <span
                        className="text-blue-600 cursor-pointer"
                        onClick={() => {
                          setEditProduct(product._id);
                        }}
                      >
                        Quick Edit
                      </span>
                    </td>
                    <td className="p-2 border">
                      Material: Stainless Steel
                      <br /> Unit Length: 6-12 meter
                      <br /> Shape: Round
                    </td>
                    <td className="p-2 border">{product.price}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Home;
