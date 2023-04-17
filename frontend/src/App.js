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
      </main>
      <Footer/>
    
    </BrowserRouter>
  );
}

export default App;
