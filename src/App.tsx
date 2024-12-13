import ProductList from "./components/ProductList/ProductList";
import ProductCreate from "./components/ProductCreate/ProductCreate";
import Wrapper from "./components/Wrapper/Wrapper";
import "./App.css";

function App() {
  return (
    <Wrapper>
      <h2>Bestestest Products</h2>
      <ProductCreate />
      <ProductList />
    </Wrapper>
  );
}

export default App;
