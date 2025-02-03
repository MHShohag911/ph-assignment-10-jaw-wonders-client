import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, message, Rate } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Fade } from "react-awesome-reveal";
const { Meta } = Card;
// import "./ItemCard.css";

const ItemCard = ({ product, initialProducts, setInitialProducts, users }) => {
  const navigate = useNavigate();
  const {
    _id,
    image,
    item_name,
    subcategory_name,
    short_description,
    price,
    rating,
    customization,
    processing_time,
    stock_status,
    user_email,
    user_name,
  } = product;

  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useContext(AuthContext);

  const error = () => {
    if (user === null) {
      messageApi.open({
        type: "error",
        content: "Please Login First",
      });
    } else if (user?.email !== user_email) {
      messageApi.open({
        type: "error",
        content: "You cannot edit other's product",
      });
    } else if (customization === "No") {
      messageApi.open({
        type: "error",
        content: "Not Customizable",
      });
    }
  };

  const editProduct = () => {
    if (customization === "Yes" && user?.email === user_email) {
      navigate(`/editProduct/${_id}`);
    } else {
      error();
    }
  };

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://assignment-10-arts-and-crafts-server.vercel.app/products/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            const remaining = initialProducts.filter((pro) => pro._id !== _id);
            setInitialProducts(remaining);
          });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <Fade>
      <Card
        className="mx-auto dark:bg-black/20 w-full md:max-w-96"
        cover={<img alt="example" src={image} />}
        actions={[
          <DeleteOutlined key="setting" onClick={() => handleDelete(_id)} />,
          <EditOutlined key="edit" onClick={() => editProduct()} />,
        ]}
      >
        {contextHolder}
        <Meta
          avatar={
            <Avatar
              src={users.find((user) => user.email === user_email)?.photoURL}
            />
          }
          title={<p className="text-primary font-bold">{item_name}</p>}
          description={<p className="text-secondary">Added by {user_name}</p>}
        />
        <div className="mt-5 space-y-5 flex flex-col">
          <div className="min-h-[50px]">
            <p className="text-justify text-gray-400">{short_description}</p>
          </div>
          <div className="">
            <p className="font-bold text-gray-500 min-h-[50px]">
              Sub-Category: <Link to={`/mySubArt&CraftList/${_id}`} className="hover:text-primary">{subcategory_name}</Link>
            </p>
            <div className="flex justify-between mt-2">
              <p className="dark:text-white"><span>Availability: </span><span>{stock_status}</span></p>
              <p className="dark:text-white"><span>Delivery:</span> <span>{processing_time}</span></p>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="font-bold text-secondary"><span>Price:</span> <span className="dark:text-white">{price}$</span></p>
            <div className="font-bold">
              <Rate className="text-xs" allowHalf defaultValue={rating} />
              <span className="dark:text-white">({rating})</span>
            </div>
          </div>
          <div className="flex justify-between">
            <Link>
              <Button className="btn-primary rounded-none font-bold">
                Buy Now
              </Button>
            </Link>
            <Link to={`/productDetails/${_id}`}>
              <Button className="btn-secondary">view details</Button>
            </Link>
          </div>
        </div>
      </Card>
    </Fade>
  );
};

export default ItemCard;
