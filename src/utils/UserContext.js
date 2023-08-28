import { createContext } from "react";

const UserContext = createContext({
    user:{
        name:"dummy",
        email:"dummyEmail@gmail",
    }
})

export default UserContext;