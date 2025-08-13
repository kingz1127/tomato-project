import { createContext, useContext, useState } from "react";

const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [foodList, setFoodList] = useState([]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
      const item = foodList.find((product) => product._id === itemId);
      return total + (item?.price || 0) * quantity;
    }, 0);
  };

  return (
    <StoreContext.Provider
      value={{
        cartItems,
        food_list: foodList,
        setFoodList,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => useContext(StoreContext);
