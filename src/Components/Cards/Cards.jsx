import { useEffect, useState } from "react";
import ItemCard from "../ItemCard/ItemCard";
import { Dropdown } from "antd";
import './Cards.css';

const Cards = ({ products, setProducts }) => {
  const [initialProducts, setInitialProducts] = useState([]);
  const [users, setUsers] = useState([]);

  const handleShowAll = () => {
    setInitialProducts(products);
  };

  useEffect(() => {
    const slicedProducts = products.slice(0, 6);
    setInitialProducts(slicedProducts);
  }, []);

  useEffect(() => {
    fetch('https://assignment-10-arts-and-crafts-server.vercel.app/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  }, []);

  const onMenuClick = (e) => {
    // console.log("click", e);
    if(e.key === '1'){
        const filterProducts = products.filter(
            (product) => product.subcategory_name === 'Wooden Furniture & Sculptures'
          );
          setInitialProducts(filterProducts);
          // console.log(filterProducts)
    } else if(e.key === '2'){
        const filterYes = products.filter(
            (product) => product.subcategory_name === 'Wooden Home Decor'
          );
          setInitialProducts(filterYes);
          // console.log(filterYes)
    }else if(e.key === '3'){
        const filterYes = products.filter(
            (product) => product.subcategory_name === 'Wooden Utensils and Kitchenware'
          );
          setInitialProducts(filterYes);
          // console.log(filterYes)
    }else if(e.key === '4'){
        const filterYes = products.filter(
            (product) => product.subcategory_name === 'Jute Home Decor'
          );
          setInitialProducts(filterYes);
          // console.log(filterYes)
    }else if(e.key === '5'){
        const filterYes = products.filter(
            (product) => product.subcategory_name === 'Jute Kitchenware & Utensils'
          );
          setInitialProducts(filterYes);
          // console.log(filterYes)
    }else if(e.key === '6'){
        const filterYes = products.filter(
            (product) => product.subcategory_name === 'Jute and Wooden Jewellery'
          );
          setInitialProducts(filterYes);
          // console.log(filterYes)
    }
  };
  const items = [
    {
      key: "1",
      label: "Wooden Furniture & Sculptures",
    },
    {
      key: "2",
      label: "Wooden Home Decor",
    },
    {
      key: "3",
      label: "Wooden Utensils and Kitchenware",
    },
    {
      key: "4",
      label: "Jute Home Decor",
    },
    {
      key: "5",
      label: "Jute Kitchenware & Utensils",
    },
    {
      key: "6",
      label: "Jute and Wooden Jewellery",
    },
  ];

  return (
    <div className="lg:container mx-auto">
      <div className="flex justify-center my-10">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 p-5 md:p-0">
        {initialProducts?.map((product, idx) => (
          <ItemCard
            key={idx}
            product={product}
            initialProducts={initialProducts}
            setInitialProducts={setInitialProducts}
            users={users}
          ></ItemCard>
        ))}
      </div>
      <div className="text-center py-5">
        {initialProducts.length < 7 && (
          <button
            onClick={handleShowAll}
            className="btn-primary px-4 py-2 font-bold mt-10"
          >
            Show All
          </button>
        )}
      </div>
    </div>
  );
};

export default Cards;
