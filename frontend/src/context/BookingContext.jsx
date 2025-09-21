import React, { createContext, useState } from "react";


const BookingContext = createContext();

const BookingContextProvider = ({ children }) => {

    const [selectSeats, setSelectSeats] = useState([]);

    return (
        <BookingContext.Provider value={{ selectSeats, setSelectSeats }}>
            {children}
        </BookingContext.Provider>
    )
}


export { BookingContextProvider };  
export default BookingContext