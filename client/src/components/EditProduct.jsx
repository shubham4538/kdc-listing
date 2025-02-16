import React, { useState } from "react";
import axios from "axios";

function EditProduct({ product, setEditProduct }) {
  const [productDetails, setProductDetails] = useState(product);

  const updateProduct = () => {
    axios
      .post(`https://kdc-listing.vercel.app/edit/${product._id}`, {
        data: productDetails,
      })
      .then((res) => console.log(res));
    window.location.reload();
  };

  return (
    <div className="p-2 w-full">
      <h2 className="text-lg font-semibold">Quick Edit</h2>
      <div className="space-y-2">
        {/* Fixed */}
        <div className="flex gap-5">
          <div className="flex items-center space-x-4">
            <span className="font-medium">Title:</span>
            <span>{product.grade}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-medium">Material:</span>
            <span>{product.material}</span>
          </div>
        </div>
        <hr />
        {/* Edit */}
        <h2 className="text-lg font-semibold">Product Details</h2>

        {/* Product Details */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center">
            <span className="font-medium mr-2">Price:</span>
            <select name="currency" className="p-2 border rounded-md">
              <option>INR</option>
              <option>USD</option>
              <option>EUR</option>
            </select>
            <input
              type="number"
              name="price"
              defaultValue={product.price}
              onChange={(e) =>
                setProductDetails((prev) => ({
                  ...prev,
                  price: e.target.value,
                }))
              }
              className="w-20 p-2 border rounded-md"
            />
            <select name="unit" className="p-2 border rounded-md">
              <option>KG</option>
              <option>Ton</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Shape</label>
            <input
              type="text"
              name="shape"
              defaultValue={product?.shape}
              onChange={(e) =>
                setProductDetails((prev) => ({
                  ...prev,
                  shape: e.target.value,
                }))
              }
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Thickness</label>
            <input
              type="text"
              name="thickness"
              defaultValue={product?.thickness}
              onChange={(e) =>
                setProductDetails((prev) => ({
                  ...prev,
                  thickness: e.target.value,
                }))
              }
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Surface Finish</label>
            <input
              type="text"
              name="surfaceFinish"
              defaultValue={product?.finish}
              onChange={(e) =>
                setProductDetails((prev) => ({
                  ...prev,
                  finish: e.target.value,
                }))
              }
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Length</label>
            <input
              type="text"
              name="length"
              defaultValue={product?.length}
              onChange={(e) =>
                setProductDetails((prev) => ({
                  ...prev,
                  length: e.target.value,
                }))
              }
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Outside Dia.</label>
            <input
              type="text"
              name="outsideDia"
              defaultValue={product?.dia}
              onChange={(e) =>
                setProductDetails((prev) => ({
                  ...prev,
                  dia: e.target.value,
                }))
              }
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={updateProduct}
          >
            Update
          </button>
          <button
            className="px-4 py-2 bg-gray-300 rounded-md"
            onClick={() => setEditProduct("")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
