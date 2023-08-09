import React, { lazy, Suspense } from "react";
import "./App.css";
import AppLayoutContextWrapper from "./components/AppLayoutContextWrapper";
import HomePageWrappper from "./components/HomePageWrapper";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import MoviePage from './components/MoviePage';

const MoviePage = lazy(() => import("./components/MoviePage"));
import ShowPage from "./components/ShowPage";
import TrendingPage from "./components/TrendingPage";
// import SearchResultsWrapper from './components/SearchResultsWrapper';
const SearchResultsWrapper = lazy(() =>
  import("./components/SearchResultsWrapper")
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
