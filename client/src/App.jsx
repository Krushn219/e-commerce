import "./assets/css/style.css"
import "./assets/css/all.min.css"
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Mainlayout from './Components/Mainlayout';
import Home from './pages/Home';
import Checkout from './pages/Checkout'
import MyAccount from './pages/MyAccount'
import Wishlist from './pages/Wishlist'
import Categories from './pages/Categories';
import NewAddress from './pages/NewAddress'
import UpdateAddress from './pages/UpdateAddress'
import ContactUs from './pages/ContactUs'
import OrderHistory from './pages/OrderHistory'
import AboutUs from './pages/AboutUs';
import ShippingPolicy from './pages/ShippingPolicy'
import OnlineSupport from './pages/OnlineSupport'
import ReturnPolicy from './pages/ReturnPolicy'
import PrivacyPolicy from './pages/PrivacyPolicy'
import SpecificCategory from './pages/SpecificCategory'
import Information from './pages/Information'
import Cart from './pages/Cart'
import TermsCondition from './pages/TermsCondition'
import SubCategory from './pages/SubCategory';
import Products from './pages/Products';
import Blog from "./pages/Blog";
import OnlyAllowedNotAuth from "./Utils/ProtectedRoutes/OnlyAllowedNotAuth";
import RequireAuth from "./Utils/ProtectedRoutes/RequireAuth";
import ScrollToTop from "./Utils/scrolllToTop";
import BlogsTab from './pages/BlogsTab'
import Compare from './pages/Compare'
import Category from "./pages/Category";
import OrderHistoryDetail from "./pages/OrderHistoryDetail";
import WishlistReffered from "./pages/WishlistReffered";
import Vendor from "./pages/Vendor";
import StoreList from "./pages/StoreList";
import BecomeVendor from "./pages/BecomeVendor";
import VendorPannel from './pages/VendorPannel'
import DbProduct from "./pages/VendorPannel/DashboardPages/DbProduct";
import DbOrder from "./pages/VendorPannel/DashboardPages/DbOrder";
import Withdraw from "./pages/VendorPannel/DashboardPages/Withdraw";
import Settings from "./pages/VendorPannel/DashboardPages/Settings";
import Store from "./pages/VendorSettings/Store";
import Login from './pages/Login'
import Registration from './pages/Registration'
import Payment from "./pages/VendorSettings/Payment";
import EditAccount from "./Components/EditAccount";
import AddNewProduct from "./Components/AddNewProduct";
import VendorRegistration from './pages/VendorRegistration'
import ModifyProduct from "./Components/ModifyProduct";
import ViewProduct from "./Components/ViewProduct";
import ForgetPassword from "./Components/ForgetPassword";
import ResetPassword from "./Components/ResetPassword";
import ViewFeaturedProduct from "./Components/ViewFeaturedProduct";
import ErrorBoundary from "./ErrorBoundary";
import NewAddressDb from "./Components/NewAddressDb";
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import UpdateAddressDb from "./Components/UpdateAddressDb";

const App = () => {

  const [isScrollValueMoreThanHeaderHeight, setIsScrollValueMoreThanHeaderHeight] = useState(false);
  const [search, setsearch] = useState("")
  const [cartUpdated, setcartUpdated] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrollValueMoreThanHeaderHeight(window.scrollY > 152);
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  useEffect(() => {
    const header = document.getElementsByClassName('header-menu')
    const headerspace = document.getElementsByClassName('main-header')
    if(isScrollValueMoreThanHeaderHeight){
      if(header && header[0] && header[0]?.classList){
        header[0].classList.add('sticky-header')
      }
      headerspace[0]?.classList.add('header-space')
    }
    else {
      if (header && header[0] && header[0]?.classList) {
        header[0].classList.remove('sticky-header')
      }
      headerspace[0]?.classList.remove('header-space')
    }
  }, [isScrollValueMoreThanHeaderHeight])

  useEffect(() => {
    const header = document.getElementsByClassName('main-header-sm-navbar')
    const headerspace = document.getElementsByClassName('main-header')
    if(isScrollValueMoreThanHeaderHeight){
      if(header && header[0] && header[0]?.classList){
        header[0].classList.add('sticky-header')
      }
      headerspace[0]?.classList.add('header-space')
    }
    else {
      if (header && header[0] && header[0]?.classList) {
        header[0].classList.remove('sticky-header')
      }
      headerspace[0]?.classList.remove('header-space')
    }
  }, [isScrollValueMoreThanHeaderHeight])

  

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
      />
      <ScrollToTop />
          <ErrorBoundary>
      <Mainlayout setsearch={setsearch} search={search} cartUpdated={cartUpdated}>
        <Routes>
          <Route path="/" element={<Home search={search} />} />
          <Route element={<OnlyAllowedNotAuth />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/forgotPassword" element={<ForgetPassword />} />
            <Route path="/reset-password/:email" element={<ResetPassword />} />
            <Route path="/vendor-register" element={<VendorRegistration />} />
          </Route>
          <Route path="/vendor-dashboard" element={<VendorPannel />} />
          <Route path="/vendor-products" element={<VendorPannel><DbProduct /></VendorPannel>} />
          <Route path="/vendor-orders" element={<VendorPannel><DbOrder /></VendorPannel>} />
          <Route path="/vendor-withdraw" element={<VendorPannel><Withdraw /></VendorPannel>} />
          <Route path="/edit-account-details" element={<VendorPannel><EditAccount /></VendorPannel>} />
          <Route path="/profile" element={<MyAccount><Store /></MyAccount>} />
          <Route path="/order-history" element={<MyAccount><OrderHistory /></MyAccount>} />
          <Route path="/orderhistory-detail/:orderid" element={<MyAccount><OrderHistoryDetail /></MyAccount>} />
          <Route path="/edit-account" element={<MyAccount><EditAccount /></MyAccount>} />
          <Route path="/update-address/:addressid" element={<MyAccount><UpdateAddress /></MyAccount>} />
          <Route path="/newproduct" element={<AddNewProduct />} />
          <Route path="/store" element={<Settings><Store /></Settings>} />
          <Route path="/payment" element={<Settings><Payment /></Settings>} />
          <Route path="/vendor-settings" element={<Settings />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:maincategoryid" element={<Category />} />
          <Route path="/category/:maincategoryid/:categoryid" element={<SpecificCategory />} />
          <Route path="/category/:maincategoryid/:categoryid/:subcategoryid" element={<SubCategory />} />
          <Route path="/subcategory/:id" element={<SubCategory />} />
          <Route path="/products/:id" element={<Products />} />
          <Route path="/editproduct/:editproduct" element={<ModifyProduct />} />
          <Route path="/productlist/:productinfo" element={<ViewProduct />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/vendor/:id" element={<Vendor search={search} />} />
          <Route path="/storelist" element={<StoreList />} />
          <Route path="/become-a-vendor" element={<BecomeVendor />} />
          <Route path="/online-support" element={<OnlineSupport />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/compare/:id" element={<Compare />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/terms-condition" element={<TermsCondition />} />
          <Route path="/blogs" element={<BlogsTab />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/viewFeatured-product" element={<ViewFeaturedProduct />} />
          <Route path="/wishlist-reffered/:id" element={<WishlistReffered />} />
          <Route element={<RequireAuth />}>
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/cart" element={<Cart cartUpdated={cartUpdated} setcartUpdated={setcartUpdated} />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/information" element={<Information />} />
            <Route path="/new-address" element={<NewAddress />} />
            <Route path="/newaddress-db" element={<NewAddressDb />} />
            <Route path="/update-addressdb/:id" element={<UpdateAddressDb />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Route>
        </Routes>
      </Mainlayout>
      <TawkMessengerReact 
        propertyId={process.env.REACT_APP_TWAKTO_PROPERTY_ID}
        widgetId={process.env.REACT_APP_TWAKTO_WIDGET_ID}/>
          </ErrorBoundary>
    </>
  );
}

export default App;
