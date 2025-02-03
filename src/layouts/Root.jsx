import { Outlet } from "react-router-dom";
import Header from "../Components/Headers/Header";
import Footer from "../Components/Footer/Footer";
import { Layout } from "antd";

const Root = () => {
  return (
    <Layout className="dark:bg-[#212121]">
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </Layout>
  );
};

export default Root;
