import { createContext, useContext, useState, useEffect } from "react";

const StoreContext = createContext();

export const StoreContextProvider = ({ children, currentUser }) => {
  const userKey = currentUser?.email || "guest"; // use email or id
  const [cartItems, setCartItems] = useState({});

  // Load cart for logged-in user from localStorage
  useEffect(() => {
    const storedCart =
      JSON.parse(localStorage.getItem(`cart_${userKey}`)) || {};
    setCartItems(storedCart);
  }, [userKey]);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(`cart_${userKey}`, JSON.stringify(cartItems));
  }, [cartItems, userKey]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existingItem = prev[item.id];
      if (existingItem) {
        return {
          ...prev,
          [item.id]: {
            ...existingItem,
            quantity: existingItem.quantity + 1,
          },
        };
      } else {
        return {
          ...prev,
          [item.id]: { ...item, quantity: 1 },
        };
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[itemId];
      return updated;
    });
  };

  const incrementQuantity = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], quantity: prev[itemId].quantity + 1 },
    }));
  };

  const decrementQuantity = (itemId) => {
    setCartItems((prev) => {
      if (prev[itemId].quantity > 1) {
        return {
          ...prev,
          [itemId]: { ...prev[itemId], quantity: prev[itemId].quantity - 1 },
        };
      }
      return prev;
    });
  };

  const getTotalCartAmount = () => {
    return Object.values(cartItems).reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0
    );
  };

  return (
    <StoreContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        getTotalCartAmount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => useContext(StoreContext);
