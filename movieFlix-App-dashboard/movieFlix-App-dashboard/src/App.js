import React, { lazy, Suspense } from "react";
import "./App.css";
import AppLayoutContextWrapper from "./components/AppLayoutContextWrapper.tsx";
import HomePageWrappper from "./components/HomePageWrapper.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import MoviePage from './components/MoviePage';

const MoviePage = lazy(() => import("./components/MoviePage.tsx"));
import ShowPage from "./components/ShowPage.tsx";
import TrendingPage from "./components/TrendingPage.tsx";
// import SearchResultsWrapper from './components/SearchResultsWrapper';
const SearchResultsWrapper = lazy(() =>
  import("./components/SearchResultsWrapper.tsx")
);
// import NotFound from './components/NotFound';

const App = () => {
  return (
    <Router>
      <AppLayoutContextWrapper>
        <Suspense
          fallback={
            <div>
              <h1>Loading...</h1>
            </div>
          }
        >
          <Routes>
            <Route exact path="*" element={<HomePageWrappper />} />
            <Route path="/movie" element={<MoviePage movie="movie" />} />
            <Route path="/shows" element={<ShowPage tv="tv" />} />
            <Route
              path="/trending"
              element={<TrendingPage trending="trending" />}
            />
            <Route path="/search/:data" element={<SearchResultsWrapper />} />
            {/* <Route element={<NotFound/>} /> */}
          </Routes>
        </Suspense>
      </AppLayoutContextWrapper>
    </Router>
  );
};

export default App;
