import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductItemScreen from "./screens/ProductItemScreen/ProductItemScreen";
import ProductsScreen from "./screens/ProductsScreen";

function App() {
  return (
    <Router>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link to="/">Home</Link>
            <div className="dropdown">
              <p>Collection</p>
              <div className="dropdown-content">
                <Link
                  className="navlink"
                  to={{ pathname: "/collection", state: { category: "chair" } }}
                >
                  Chairs
                </Link>
                <Link
                  className="navlink"
                  to={{ pathname: "/collection", state: { category: "bench" } }}
                >
                  Benches
                </Link>
              </div>
            </div>
          </div>
          <div>
            <Link to="/cart">Cart</Link>
            <Link to="/signin">Sign-in</Link>
          </div>
        </header>
        <main>
          <Route path="/collection" component={ProductsScreen} />
          <Route path="/product/:id" component={ProductItemScreen} />
          <Route path="/" component={HomeScreen} exact />
        </main>
        <footer>© 2020. All rights reserved by Divlje Pragnje</footer>
      </div>
    </Router>
  );
}

export default App;
