import "./App.css";
import Header from "./components/Header/Header";
import Landing from "./components/Home/Landing";
import SideBarSocial from "./components/SidebarSocial/SideBarSocial";
import { Footer } from "./components/Footer/Footer";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import ProductList from "./components/ProductList/ProductList";
import { Routes, Route, useLocation } from "react-router-dom";
import CreateProduct from "./components/CreateProduct/CreateProduct";
import Dashboard from "./components/Admin/Dashboard";
import Login from "./components/Auth/Login";

function App() {
  const { pathname } = useLocation();

  return (

    
    <main className="min-h-screen font-montserrat">
    
      {pathname !== "/create" &&  pathname !=="/admin" &&  pathname!=="/login" && <Header />}

     
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/productos" element={<ProductList />} />
        <Route path="/create" element={<CreateProduct />} />
        <Route path="/admin" element={<Dashboard/>}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
      {pathname !== "/create" && <SideBarSocial />}
      {pathname !== "/create" && pathname!=="/login" && <Footer />}
    </main>
  );
}

export default App;
