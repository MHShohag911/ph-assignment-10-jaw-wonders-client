import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import ArtCraftItems from "../Pages/AllArts&CraftsItems/ArtCraftItems";
import MyArtCraft from "../Pages/MyArt&CraftLIst/MyArtCraft";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AddCraftItems from "../Pages/AddCraftItems/AddCraftItems";
import EditProduct from "../Pages/EditProduct/EditProduct";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import PrivateRoute from "./PrivateRoute";
import MySubCatArtCraftLIst from "../Pages/MySubCatArt&CraftLIst/MySubCatArt&CraftLIst";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: ()=> fetch('https://assignment-10-arts-and-crafts-server.vercel.app/products')
      },
      {
        path: "/arts&CraftsItems",
        element: <ArtCraftItems></ArtCraftItems>,
        loader: ()=> fetch('https://assignment-10-arts-and-crafts-server.vercel.app/products')
      },
      {
        path: "/addCraftItems",
        element: <PrivateRoute><AddCraftItems></AddCraftItems></PrivateRoute>,
      },
      {
        path: "/editProduct/:_id",
        element: <PrivateRoute><EditProduct></EditProduct></PrivateRoute>,
        loader: ({params})=>fetch(`https://assignment-10-arts-and-crafts-server.vercel.app/products/${params._id}`)
      },
      {
        path: "/productDetails/:_id",
        element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>,
        loader: ({params})=> fetch(`https://assignment-10-arts-and-crafts-server.vercel.app/products/${params._id}`)
      },
      {
        path: "/myArt&CraftList",
        element: <PrivateRoute><MyArtCraft></MyArtCraft></PrivateRoute>,
        loader: ()=> fetch('https://assignment-10-arts-and-crafts-server.vercel.app/products'),
      },
      {
        path: "/mySubArt&CraftList/:id",
        element: <PrivateRoute><MySubCatArtCraftLIst></MySubCatArtCraftLIst></PrivateRoute>,
        loader: ()=>fetch('https://assignment-10-arts-and-crafts-server.vercel.app/products')
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default routes;
