import { Button, Carousel } from "antd";
import { useContext, useEffect, useState } from "react";
import { Fade} from "react-awesome-reveal";
import ArtCategoryCard from "./ArtCategoryCard";

const ArtCraftSubCategory = () => {
  const [subcategoryData, setSubcategoryData] = useState([]);
  const [categoryProduct, setCategoryProduct] = useState(subcategoryData[0]);
  // console.log(subcategoryData)
  // console.log(categoryProduct)
  // console.log(subcategoryData[0])
  const handleSubcategory = (category) => {
    const product = subcategoryData.find(
      (cat) => cat.subcategory_name === category
    );
    setCategoryProduct(product);
  };

  useEffect(() => {
    fetch("https://assignment-10-arts-and-crafts-server.vercel.app/subcategoryData")
      .then((res) => res.json())
      .then((data) => setSubcategoryData(data));
  }, []);

  const groupCards = [];
  for (let i = 0; i < subcategoryData.length; i += 3) {
    groupCards.push(subcategoryData.slice(i, i + 3));
  }

  return (
    <div className="lg:container mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold text-center text-primary my-10 px-5">
        <Fade>Art and Craft Subcategory</Fade>
      </h2>
      <div className="my-10">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center">
          {subcategoryData.map((category, idx) => (
            <li key={idx}>
              <Button
                onClick={() => handleSubcategory(category?.subcategory_name)}
                className="btn-secondary font-bold mb-2 w-80"
              >
                {category?.subcategory_name}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      {categoryProduct !== undefined ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5">
            <ArtCategoryCard
              categoryProduct={categoryProduct}
            ></ArtCategoryCard>
          </div>
          <div className="text-center rounded-2xl">
            <h2 className="font-bold text-secondary w-80 mx-auto text-3xl mb-2 py-2 mt-12">
              Products
            </h2>
            <Carousel autoplay>
              {categoryProduct?.products?.map((product, index) => (
                <div key={index} className="">
                  <h2 className="font-bold text-primary text-2xl mb-5">
                    {product?.name}
                  </h2>
                  <img
                    className="mx-auto p-5 rounded-xl max-h-[300px]"
                    src={product?.image}
                    alt=""
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5">
            <ArtCategoryCard
              categoryProduct={subcategoryData[0]}
            ></ArtCategoryCard>
          </div>
          <div className="text-center rounded-2xl">
            <h2 className="font-bold text-secondary w-80 mx-auto text-3xl mb-2 py-2 mt-12">
              Products
            </h2>
            <Carousel autoplay>
              {subcategoryData[0]?.products?.map((product, index) => (
                <div key={index} className="">
                  <h2 className="font-bold text-primary text-2xl mb-5">
                    {product?.name}
                  </h2>
                  <img
                    className="mx-auto p-5 rounded-xl max-h-[300px]"
                    src={product?.image}
                    alt=""
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtCraftSubCategory;
