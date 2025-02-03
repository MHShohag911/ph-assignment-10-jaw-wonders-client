import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import SubCatItemCard from "../../Components/ItemCard/SubCatItemCard";
import { Fade } from "react-awesome-reveal";
import { Typewriter } from "react-simple-typewriter";
import { AuthContext } from "../../provider/AuthProvider";
import { Helmet } from "react-helmet-async";

const MySubCatArtCraftLIst = () => {
  const loadedData = useLoaderData();
  const { user } = useContext(AuthContext);
  const params = useParams();
  const [userProducts, setUserProducts] = useState(null);
  const [userCategoryProducts, setUserCategoryProducts] = useState([]);
  // console.log(userProducts?.subcategory_name);

  useEffect(() => {
    const specificData = loadedData.find(
      (product) =>
        product._id === params.id && product.user_email === user?.email
    );
    setUserProducts(specificData);
  }, [params._id]);

  useEffect(() => {
    // console.log(loadedData);
    // console.log(userProducts?.subcategory_name);
    const subCatProduct = loadedData.filter(
      (product) => product.subcategory_name === userProducts?.subcategory_name
    );
    setUserCategoryProducts(subCatProduct);
  }, [userProducts]);

  return (
    <div>
      <Helmet>
        <title>JAW Wonders | My Subcategory Items</title>
      </Helmet>
      {userProducts === undefined ? (
        <h2 className="text-3xl md:text-5xl font-bold text-center text-primary my-10 h-10">
          You haven't add any product yet!!!
        </h2>
      ) : (
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-center text-primary my-10 h-10">
            <Fade direction="down">
              <Typewriter
                loop={false}
                words={[`${userProducts?.subcategory_name}`]}
              ></Typewriter>
            </Fade>
          </h2>
          <div className="lg:container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-10 my-10 p-5 md:p-0">
            {userCategoryProducts.map((product) => (
              <SubCatItemCard
                key={product._id}
                product={product}
                userCategoryProducts={userCategoryProducts}
                setUserCategoryProducts={setUserCategoryProducts}
              ></SubCatItemCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MySubCatArtCraftLIst;
