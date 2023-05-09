import Header from "./component/Header";
import Footer from "./component/Footer";
import HomeScreen from "./screen/HomeScreen"
import {BrowserRouter, Route} from "react-router-dom";
import ProductScreen from "./screen/ProductScreen"
import { CartScreen } from "./screen/CartScreen";
import { LoginScreen } from "./screen/LoginScreen";
import { RegisterScreen } from "./screen/RegisterScreen";
import { ProfileScreen } from "./screen/ProfileScreen";
import { ShippingScreen } from "./screen/ShippingScreen";
import { PaymentScreen } from "./screen/PaymentScreen";
import { PlaceOrderScreen } from "./screen/PlaceOrderScreen";
import { OrderScreen } from "./screen/OrderScreen";
import { UserListScreen } from "./screen/UserListScreen";
import { UserEditScreen } from "./screen/UserEditScreen";
import {ProductListScreen} from "./screen/ProductListScreen";
import { ProductEditScreen } from "./screen/ProductEditScreen";
import { OrderListScreen } from "./screen/OrderListScreen";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <main className="container">

{/* {        if(path=="/"){
          <HomeScreen />
        }else if(path=="/header"){
          <Header />
        }
} */}
        <Route path="/" component={HomeScreen} exact/>
        <Route path="/product/:yu" component={ProductScreen}/>
        <Route path="/cart/:yu?" component={CartScreen} />
        <Route path="/login" component={LoginScreen}/>
        <Route path="/register" component={RegisterScreen}/>
        <Route path="/profile" component={ProfileScreen}/>
        <Route path="/shipping" component={ShippingScreen}/>
        <Route path="/payment" component={PaymentScreen}/>
        <Route path="/placeOrder" component={PlaceOrderScreen}/>
        <Route path="/order/:id" component={OrderScreen}/>
        <Route path="/admin/user/:id/edit" component={UserEditScreen}/>
        <Route path="/admin/product/:id/edit" component={ProductEditScreen}/>
        <Route path="/admin/userlist" component={UserListScreen}/>
        <Route path="/admin/productlist" component={ProductListScreen}/>
        <Route path="/admin/orderlist" component={OrderListScreen}/>

      </main>
      <Footer/>
    
    </BrowserRouter>
  );
}

export default App;
