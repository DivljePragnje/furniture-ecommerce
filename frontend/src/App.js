import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { signOut } from "./actions/userActions";
import CartScreen from "./screens/CartScreen/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductItemScreen from "./screens/ProductItemScreen/ProductItemScreen";
import ProductsScreen from "./screens/ProductsScreen";
import SignInScreen from "./screens/SigninScreen/SignInScreen";

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
            {userInfo ? (
              <div className="dropdown">
                <div className="dropdown-header">
                  <Link className="dropdown-header-link" to="/collection/all">
                    {userInfo.data.name}
                  </Link>
                  <i className="fa fa-caret-down"></i>
                </div>
                <div className="dropdown-content right">
                  <Link className="navlink" to="#signout" onClick={onSignOut}>
                    Sign Out
                  </Link>
                </div>
              </div>
            ) : (
              <Link to="/signin">Sign-in</Link>
            )}
          </div>
        </header>
        <main>
          <Route
            path="/collection/:category"
            component={ProductsScreen}
            exact
          />
          <Route path="/cart" component={CartScreen}></Route>
          <Route path="/signin" component={SignInScreen} />
          <Route path="/product/:id" component={ProductItemScreen} />
          <Route path="/" component={HomeScreen} exact />
        </main>
        <footer>© 2020. All rights reserved by Divlje Pragnje</footer>
      </div>
    </Router>
  );
}

export default App;
