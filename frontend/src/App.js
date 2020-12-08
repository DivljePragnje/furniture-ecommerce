import { useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductItemScreen from "./screens/ProductItemScreen/ProductItemScreen";
import ProductsScreen from "./screens/ProductsScreen";
import SignInScreen from "./screens/SigninScreen/SignInScreen";

function App() {
  const userDetails = useSelector((state) => state.userDetails);
  const { userInfo } = userDetails;
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
            <Link to="/cart">Cart</Link>
            <Link to="/signin">
              {userInfo ? userInfo.data.name : "Sign-in"}
            </Link>
          </div>
        </header>
        <main>
          <Route
            path="/collection/:category"
            component={ProductsScreen}
            exact
          />
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
