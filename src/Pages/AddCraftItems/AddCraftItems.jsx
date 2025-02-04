import { Button, Checkbox, Form, Input, Select } from "antd";
import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import { Bounce } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
("./AddCraftItems.css");

const onFinishFailed = (errorInfo) => {
  // console.log("Failed:", errorInfo);
};

const AddCraftItems = () => {
  const {user} = useContext(AuthContext)
  const handleAddProduct = (values) => {
    // console.log("Success:", values);

    fetch(`https://assignment-10-arts-and-crafts-server.vercel.app/products`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Congrats!!!",
            text: "Successfully Added Product",
            icon: "success",
          });
        }
      });
  };

  return (
    <div className="lg:container mx-auto p-5 dark:bg-[#212121]">
      <Helmet>
        <title>JAW Wonders | Add Items</title>
      </Helmet>
      <h2 className="text-5xl text-primary font-bold text-center py-10 ">
        <Bounce>Add Items</Bounce>
      </h2>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 20,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleAddProduct}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="">
            <Form.Item
              className=""
              label={<h2 className="dark:text-white">Image Url</h2>}
              name="image"
              rules={[
                {
                  required: true,
                  message: "Please input image url!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={<h2 className="dark:text-white">Item Name</h2>}
              name="item_name"
              rules={[
                {
                  required: true,
                  message: "Please input item name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="">
            <Form.Item
              name="subcategory_name"
              label={<h2 className="dark:text-white">Sub Category</h2>}
              rules={[
                {
                  required: true,
                  message: "Please input item name!",
                },
              ]}
            >
              <Select>
                <Select.Option value="Wooden Furniture & Sculptures">
                  Wooden Furniture & Sculptures
                </Select.Option>
                <Select.Option value="Wooden Home Decor">
                  Wooden Home Decor
                </Select.Option>
                <Select.Option value="Wooden Utensils and Kitchenware">
                  Wooden Utensils and Kitchenware
                </Select.Option>
                <Select.Option value="Jute Home Decor">
                  Jute Home Decor
                </Select.Option>
                <Select.Option value="Jute Kitchenware & Utensils">
                  Jute Kitchenware & Utensils
                </Select.Option>
                <Select.Option value="Jute and Wooden Jewellery">
                  Jute and Wooden Jewellery
                </Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={<h2 className="dark:text-white">Description</h2>}
              name="short_description"
              rules={[
                {
                  required: true,
                  message: "Please input description",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="">
            <Form.Item
              label={<h2 className="dark:text-white">Price</h2>}
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input price",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={<h2 className="dark:text-white">Rating</h2>}
              name="rating"
              rules={[
                {
                  required: true,
                  message: "Please input rating",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="">
            <Form.Item
              name="customization"
              label={<h2 className="dark:text-white">Customization</h2>}
              rules={[
                {
                  required: true,
                  message: "Please input Customization!",
                },
              ]}
            >
              <Select>
                <Select.Option value="Yes">
                  Yes
                </Select.Option>
                <Select.Option value="No">
                  No
                </Select.Option>
                
              </Select>
            </Form.Item>
            <Form.Item
              name="processing_time"
              label={<h2 className="dark:text-white">Processing Time</h2>}
              rules={[
                {
                  required: true,
                  message: "Please input processing time!",
                },
              ]}
            >
              <Select>
                <Select.Option value="2-4 days">
                  2 to 4 days
                </Select.Option>
                <Select.Option value="3-5 days">
                3 to 5 days
                </Select.Option>
                <Select.Option value="5-7 days">
                5 to 7 days
                </Select.Option>
                <Select.Option value="7-10 days">
                7 to 10 days
                </Select.Option>
                <Select.Option value="10-15 days">
                10 to 15 days
                </Select.Option>
                
              </Select>
            </Form.Item>
          </div>
          <div className="">
            <Form.Item
              name="stock_status"
              label={<h2 className="dark:text-white">Stock</h2>}
              rules={[
                {
                  required: true,
                  message: "Please input Customization!",
                },
              ]}
            >
              <Select>
                <Select.Option value="Made to Order">
                  Made to Order
                </Select.Option>
                <Select.Option value="In stock">
                In stock
                </Select.Option>
                
              </Select>
            </Form.Item>

            <Form.Item
              name="user_email"
              label={<h2 className="dark:text-white">User Email</h2>}
              rules={[
                {
                  required: true,
                  message: "Please input email!",
                },
              ]}
            >
              <Select>
                <Select.Option value={user?.email}>
                  {user?.email}
                </Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className="">
            <Form.Item
              label={<h2 className="dark:text-white">User Name</h2>}
              name="user_name"
              rules={[
                {
                  required: true,
                  message: "Please input user name",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
        </div>
        <Form.Item label={null} className="md:w-1/2 mx-auto md:text-center">
          <Button
            className="btn-primary w-32 font-bold"
            htmlType="submit"
          >
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCraftItems;
