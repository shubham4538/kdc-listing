import React, { useEffect, useState } from "react";

function AddProductModal({ products, materials, productData, setShowModal }) {
  const [productCount, setProductCount] = useState(0);
  const [materialCount, setMaterialCount] = useState({});
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedGrades, setSelectedGrades] = useState("");

  useEffect(() => {
    if (selectedProduct) {
      const filteredMaterials = [
        ...new Set(
          productData.filter((item) => item.product === selectedProduct)
        ),
      ];
      setProductCount(filteredMaterials.length);

      const materialCount = filteredMaterials
        .map((item) => item.material)
        .reduce((acc, material) => {
          acc[material] = (acc[material] || 0) + 1;
          return acc;
        }, {});
      setMaterialCount(materialCount);
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (selectedMaterial) {
      const filteredProducts = productData
        .filter((item) => item.product === selectedProduct)
        .filter((item) => item.material === selectedMaterial);
      setSelectedGrades(filteredProducts);
    }
  }, [selectedMaterial]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-10 bg-[#090909c7] backdrop-blur-[2px]">
      <div className="flex flex-col mt-10 w-max h-[80vh] mx-auto bg-white">
        <div className="p-2 flex justify-between text-xl font-semibold">
          <span className="">Add Products</span>
          <span
            className="px-2 border border-gray-600 cursor-pointer rounded-full"
            onClick={() => setShowModal(false)}
          >
            X
          </span>
        </div>
        <hr />
        <div className="flex overflow-hidden gap-2 p-2">
          <div className="app-product-section">
            <div className="add-product-headers">Products</div>
            <div className="add-product-items">
              {products.map((product) => {
                return (
                  <div
                    className={`${
                      selectedProduct == product && "bg-gray-200"
                    } add-product-item`}
                    key={product}
                    onClick={() => setSelectedProduct(product)}
                  >
                    <span>{product}</span>
                    <span>
                      {selectedProduct == product && `(${productCount})`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="app-product-section">
            <div className="add-product-headers">Materials</div>
            <div className="add-product-items">
              {materials.map((material) => {
                return (
                  <div
                    className={`${
                      selectedMaterial == material && "bg-gray-200"
                    } add-product-item`}
                    key={material}
                    onClick={() => setSelectedMaterial(material)}
                  >
                    <span>{material}</span>
                    <span>
                      {materialCount[material] &&
                        `(${materialCount[material]})`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="app-product-section">
            <div className="add-product-headers">Grades</div>
            <div className="add-product-items">
              {selectedGrades.length > 0 ? (
                selectedGrades.map(({ grade, added }) => {
                  console.log(added);
                  return (
                    <div key={grade} className="add-product-item">
                      <span className="mr-10">{grade}</span>
                      <span>
                        <input
                          className="h-5 w-5"
                          type="checkbox"
                          name={grade}
                          id={grade}
                          defaultChecked={added}
                        />
                      </span>
                    </div>
                  );
                })
              ) : (
                <div>Select Product and Material</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProductModal;
