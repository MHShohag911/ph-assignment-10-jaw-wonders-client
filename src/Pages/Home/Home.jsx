import { useLoaderData } from "react-router-dom";
import Banner from "../../Components/Banner/Banner";
import Cards from "../../Components/Cards/Cards";
import { useState } from "react";
import { Zoom } from "react-awesome-reveal";
import ArtCraftSubCategory from "../../Components/ArtCraftSubCategory/ArtCraftSubCategory";
import CustomersReviews from "../../Components/Reviews/CustomersReviews";
import ArtGallery from "../../Components/ArtGallery/ArtGallery";
import { Helmet } from "react-helmet-async";
const Home = () => {
  const loadedProducts = useLoaderData();
  const [products, setProducts] = useState(loadedProducts);

  return (
    <div>
      <Helmet>
        <title>JAW Wonders | Home</title>
      </Helmet>
      <div className="dark:bg-[#212121]">
        <div className="md:-mt-[100px]">
          <Banner></Banner>
        </div>
        <div className="">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-primary my-10">
            <Zoom>Products</Zoom>
          </h2>
          <Cards products={products} setProducts={setProducts}></Cards>
        </div>
        <div>
          <ArtCraftSubCategory></ArtCraftSubCategory>
        </div>
        <div className="lg:container mx-auto">
          <CustomersReviews></CustomersReviews>
        </div>
        <div className="lg:container mx-auto">
          <ArtGallery></ArtGallery>
        </div>
      </div>
    </div>
  );
};

export default Home;
