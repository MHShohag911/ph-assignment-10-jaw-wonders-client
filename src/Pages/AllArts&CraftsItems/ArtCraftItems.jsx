import React, { useEffect, useState } from "react";
import { StarTwoTone } from "@ant-design/icons";
import { Avatar, List, Space } from "antd";
import { useLoaderData } from "react-router-dom";
import { Fade, Slide } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";

const ArtCraftItems = () => {
  const products = useLoaderData();
  const [users, setUsers] = useState([]);
  // console.log(users);

  useEffect(() => {
    fetch("https://assignment-10-arts-and-crafts-server.vercel.app/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const data = products.map((product, i) => ({
    href: `/productDetails/${product._id}`,
    avatar: users.find((user) => user.email === product.user_email),
    title: `${product.item_name}`,
    description: `Added By: ${product.user_name}`,
    content: `${product.short_description}`,
    image: `${product.image}`,
    rating: `${product.rating}`,
    user_email: `${product.user_email}`,
  }));

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <div className="dark:bg-[#212121]">
      <Helmet>
        <title>JAW Wonders | Art & Craft Items</title>
      </Helmet>
      <h2 className="text-3xl md:text-5xl font-bold text-center text-primary py-10 dark:bg-[#212121]">
        <Fade>All Arts & Crafts</Fade>
      </h2>
      <div className="lg:container mx-auto">
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              // console.log(page);
            },
            pageSize: 6,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              className="mb-5 dark:bg-black/30"
              key={item.item_name}
              actions={[
                <IconText
                  icon={StarTwoTone}
                  text={
                    <h2 className="dark:text-white">Rating: {item.rating}</h2>
                  }
                  key="list-vertical-star-o"
                />,
              ]}
              extra={
                <Slide direction="right">
                  <img
                    className="md:max-w-[272px]"
                    alt="logo"
                    src={item.image}
                  />
                </Slide>
              }
            >
              <Fade>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar?.photoURL} />}
                  title={
                    <a href={item.href}>
                      {
                        <h2 className="text-primary font-bold hover:text-secondary">
                          {item.title}
                        </h2>
                      }
                    </a>
                  }
                  description={
                    <h2 className="dark:text-white">{item.description}</h2>
                  }
                />
              </Fade>
              <p className="dark:text-white">{item.content}</p>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default ArtCraftItems;
