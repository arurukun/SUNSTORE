import Header from "./component/header";
import Footer from "./component/footer";
import HomeScreen from "./screen/homeScreen"
import {BrowserRouter, Route} from "react-router-dom";
import ProductScreen from "./screen/ProductScreen"

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
      </main>
      <Footer/>
    
    </BrowserRouter>
  );
}

export default App;
