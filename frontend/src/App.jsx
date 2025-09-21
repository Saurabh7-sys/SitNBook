import React from "react";
import SitNBook from "./SitNBook";
import { BookingContextProvider } from "./context/bookingContext";

function App() {
  return (
    <BookingContextProvider>
      <SitNBook />
    </BookingContextProvider>
  );
}

export default App;
