import Header from "./component/header";
import Footer from "./component/footer";
import HomeScreen from "./screen/HomeScreen"
import {BrowserRouter, Route} from "react-router-dom";
import ProductScreen from "./screen/ProductScreen"
import { CartScreen } from "./screen/CartScreen";

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
      </main>
      <Footer/>
    
    </BrowserRouter>
  );
}

export default App;
