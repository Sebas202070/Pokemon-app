import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import PokemonPage from "../Pages/PokemonPage";
import Navigation from "./Navigation";
import SearchPage from "../Pages/SearchPage";

function Router() {
  return (
    <div>
      <Navigation />
      <Routes>
        {/*         <Route path="/" element={<Navigation />}> */}
        <Route index element={<Home />} />
        <Route path="/Pokemonpage/:id" element={<PokemonPage />} />
        <Route path="/Search" element={<SearchPage />} />
        {/*  </Route> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default Router;
