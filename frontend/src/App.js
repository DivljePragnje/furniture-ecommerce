import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { signOut } from "./actions/userActions";
import CartScreen from "./screens/CartScreen/CartScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import Placeorder from "./screens/Placeorder/Placeorder";
import ProductItemScreen from "./screens/ProductItemScreen/ProductItemScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ShippingScreen from "./screens/ShippingScreen/ShippingScreen";
import SignInScreen from "./screens/SigninScreen/SignInScreen";
import _ from "lodash";
import ConfirmationScreen from "./screens/ConfirmationScreen/ConfirmationScreen";
import Contact from "./components/Contact/Contact";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
function App() {
  const userDetails = useSelector((state) => state.userDetails);
  const cartItems = useSelector((state) => state.cartItems);
  const { userInfo } = userDetails;
  const dispatch = useDispatch();
  const onSignOut = () => {
    dispatch(signOut());
  };
  return (
    <Router>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link to="/">Home</Link>

            <div className="dropdown">
              <div className="dropdown-header">
                <Link className="dropdown-header-link" to="/collection/all">
                  Collection
                </Link>
                <i className="fa fa-caret-down"></i>
              </div>

              <div className="dropdown-content">
                <Link className="navlink" to="/collection/chair">
                  Chairs
                </Link>
                <Link className="navlink" to="/collection/bench">
                  Benches
                </Link>
              </div>
            </div>
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && <span> ( {cartItems.length} ) </span>}
            </Link>
            {_.isEmpty(userInfo) ? (
              <Link to="/signin">Sign-in</Link>
            ) : (
              <div className="dropdown">
                <div className="dropdown-header">
                  <Link className="dropdown-header-link" to="/collection/all">
                    {userInfo.name}
                  </Link>
                  <i className="fa fa-caret-down"></i>
                </div>
                <div className="dropdown-content right">
                  <Link className="navlink" to="/profile">
                    Profile
                  </Link>
                  <Link className="navlink" to="#signout" onClick={onSignOut}>
                    Sign Out
                  </Link>
                </div>
              </div>
            )}
          </div>
        </header>
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
