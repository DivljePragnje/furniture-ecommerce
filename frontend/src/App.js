import { BrowserRouter as Router, Route } from "react-router-dom";
import CartScreen from "./screens/CartScreen/CartScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import Placeorder from "./screens/Placeorder/Placeorder";
import ProductItemScreen from "./screens/ProductItemScreen/ProductItemScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ShippingScreen from "./screens/ShippingScreen/ShippingScreen";
import SignInScreen from "./screens/SigninScreen/SignInScreen";
import ConfirmationScreen from "./screens/ConfirmationScreen/ConfirmationScreen";
import Contact from "./components/Contact/Contact";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import Navbar from "./components/Navbar/Navbar";

function App(props) {
  return (
    <Router>
      <div className="grid-container">
        <Navbar history={props.history} />
        <main>
          <Route
            path="/collection/:category"
            component={ProductsScreen}
            exact
          />
          <Route path="/confirmation" component={ConfirmationScreen} />
          <Route path="/placeorder" component={Placeorder} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/cart" component={CartScreen} />
          <Route path="/signin" component={SignInScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/product/:id" component={ProductItemScreen} />
          <Route path="/" component={HomeScreen} exact />
        </main>

        <footer>
          <Contact />© 2020. All rights reserved by Divlje Pragnje
        </footer>
      </div>
    </Router>
  );
}

export default App;
