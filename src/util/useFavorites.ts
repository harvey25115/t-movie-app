import { useEffect, useReducer } from "react";

// reducer types
type Favorite = {
  [key: string]: string;
};

type AppState = {
  favorites: Favorite;
};

type Action =
  | { type: "ADD" | "SET"; payload: { favorite: Favorite } }
  | { type: "REMOVE"; payload: { id: string } };

/**
 * State management
 * @param state
 * @param action
 * @returns state
 */
function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "ADD": {
      // add new favorite
      const { favorite } = action.payload;
      const newData = { ...state.favorites, ...favorite };
      updateStorage(newData);
      return {
        favorites: newData,
      };
    }
    case "SET": {
      // set new state
      return {
        favorites: { ...action.payload.favorite },
      };
    }
    case "REMOVE": {
      // remove from favorites
      const { id } = action.payload;
      if (state.favorites && state.favorites[id]) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [id]: target, ...newFavorites } = state.favorites;
        updateStorage(newFavorites);
        return {
          favorites: { ...newFavorites },
        };
      }
      return state;
    }
    default:
      return state;
  }
}

/**
 * Update localStorage
 * @param favorites
 */
function updateStorage(favorites: Favorite) {
  try {
    localStorage.setItem("movie-favorites", JSON.stringify(favorites));
  } catch (error) {
    console.error(error);
  }
}

/**
 * Custom hook for favorites: managing state & localStorage
 * @returns state,dispatch
 */
export default function useFavorites() {
  const initialState: AppState = {
    favorites: {},
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // get existing data from localStorage
    const data = localStorage.getItem("movie-favorites");
    if (data) {
      try {
        const list = JSON.parse(data);
        dispatch({ type: "SET", payload: { favorite: list } });
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  return { state, dispatch };
}
