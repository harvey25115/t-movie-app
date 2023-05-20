import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/**
 * components
 */
import Layout from "./components/Layout.tsx";
import MovieList, {
  loader as movieListLoader,
} from "./pages/MovieList/MovieList.tsx";
import MovieDetail, {
  loader as movieLoader,
} from "./pages/MovieDetail/MovieDetail.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";

// // router path
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MovieList />,
        loader: movieListLoader,
      },
      {
        path: "/movie/:id",
        element: <MovieDetail />,
        loader: movieLoader,
      },
      {
        path: "/not-found",
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
