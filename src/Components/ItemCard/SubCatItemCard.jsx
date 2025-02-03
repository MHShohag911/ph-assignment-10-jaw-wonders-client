import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, message, Rate } from "antd";
import { useContext } from "react";
import { Fade } from "react-awesome-reveal";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
const { Meta } = Card;
const SubCatItemCard = ({ product, userCategoryProducts, setUserCategoryProducts }) => {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);
  const [messageApi, contextHolder] = message.useMessage();
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

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Not Customizable",
    });
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
            const remaining = userCategoryProducts.filter((pro) => pro._id !== _id);
            setUserCategoryProducts(remaining);
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
    <Fade >
      <Card
        className="mx-auto dark:bg-black/20 w-full md:max-w-96"
        cover={<img alt="example" src={image} />}
        actions={[
          <DeleteOutlined key="setting" onClick={() => handleDelete(_id)} />,
          <EditOutlined
            key="edit"
            className=""
            onClick={() =>
              customization === "Yes"
                ? navigate(`/editProduct/${_id}`)
                : error()
            }
          />,
        ]}
      >
        {contextHolder}
        <Meta
          avatar={
            <Avatar
              src={user?.photoURL}
            />
          }
          title={<p className="text-primary font-bold">{item_name}</p>}
          description={<p className="text-secondary">Added by {user_name}</p>}
        />
        <div className="mt-5 space-y-5 flex flex-col">
          <div className="min-h-[50px]">
            <p className="text-justify text-gray-400">{short_description}</p>
          </div>
          <div className="flex-grow">
            <p className="font-bold text-gray-500">
              Sub-Category: {subcategory_name}
            </p>
            <div className="flex justify-between mt-2">
              <p className="dark:text-white">Availability: {stock_status}</p>
              <p className="dark:text-white">Delivery: {processing_time}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="font-bold text-secondary">Price: {price}$</p>
            <p className="font-bold">
              <Rate className="text-xs" allowHalf defaultValue={rating} />
              <span className="dark:text-white">({rating})</span>
            </p>
          </div>
          <div className="flex justify-between">
            <Link>
              <Button className="bg-primary uppercase font-bold text-xs rounded-none btn-primary">
                Buy Now
              </Button>
            </Link>
            <Link to={"/editProduct"}>
              <Button className="border border-primary rounded-none font-bold text-primary uppercase text-xs hover:bg-primary btn-secondary">
                view details
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </Fade>
  );
};

export default SubCatItemCard;
