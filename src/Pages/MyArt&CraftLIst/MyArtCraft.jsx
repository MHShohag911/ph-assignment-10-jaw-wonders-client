import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import MyItemCard from "../../Components/ItemCard/MyItemCard";
import { useLoaderData } from "react-router-dom";
import { Dropdown } from "antd";
import { Fade } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";

const MyArtCraft = () => {
  const loadedData = useLoaderData();
  const { user } = useContext(AuthContext);
  const [userProducts, setUserProducts] = useState([]);
  // console.log(user?.photoURL);

  useEffect(() => {
    const specificData = loadedData.filter(
      (product) => product.user_email === user?.email
    );
    setUserProducts(specificData);
  }, []);

  const onMenuClick = (e) => {
    // console.log("click", e);
    if (e.key === "1") {
      const filterYes = loadedData.filter(
        (product) => product.customization === "Yes"
      );
      setUserProducts(filterYes);
      // console.log(filterYes);
    } else if (e.key === "2") {
      const filterYes = loadedData.filter(
        (product) => product.customization === "No"
      );
      setUserProducts(filterYes);
      // console.log(filterYes);
    }
  };
  const items = [
    {
      key: "1",
      label: "Yes",
    },
    {
      key: "2",
      label: "No",
    },
  ];

  return (
    <div className="dark:bg-[#212121]">
      <Helmet>
        <title>JAW Wonders | My Arts & Craft</title>
      </Helmet>
      <h2 className="text-3xl md:text-5xl font-bold text-center text-primary py-5">
        <Fade direction="down">My Art & Craft</Fade>
      </h2>
      <div className="flex justify-center">
        <div className="inline-block">
          <Dropdown.Button
            className="btn-dropdown"
            menu={{
              items,
              onClick: onMenuClick,
            }}
          >
            Sort By
          </Dropdown.Button>
        </div>
      </div>
      <div className="lg:container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-10 my-10 p-5 md:p-0">
        {userProducts.map((product) => (
          <MyItemCard
            key={product._id}
            product={product}
            userProducts={userProducts}
            setUserProducts={setUserProducts}
          ></MyItemCard>
        ))}
      </div>
    </div>
  );
};

export default MyArtCraft;
