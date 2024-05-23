import Router from "./Components/Router";
import PokemonProvider from "./Context/PokemonProvider";
import Home from "./Pages/Home";

function App() {
  return (
    <div>
      <PokemonProvider>
        <Router />
      </PokemonProvider>
    </div>
  );
}

export default App;
