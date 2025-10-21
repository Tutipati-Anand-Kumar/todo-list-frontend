import { createBrowserRouter} from "react-router-dom";
import RootLayout from "./RootLayout";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import AddTodo from "./components/AddTodo";
import About from "./components/About";
import PrivateRoute from "./helper/private/PrivateRoute";
import Dashboard from "./components/Dashboard";
import Update from "./components/Update";

const route = createBrowserRouter([
    {
        path:"/",
        element:<RootLayout></RootLayout>,
        children:[
            {
                index:true,
                element:<Home></Home>
            },
            {
                path:"login",
                element: <Login></Login>
            },
            {
                path:"register",
                element: <Register></Register>
            }, 
            {
                path:"update",
                element:<Update></Update>
            },
            {
                path:"dashboard",
                element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>
            }
            ,
            {
                path:"add-todo",
                element:<PrivateRoute><AddTodo></AddTodo></PrivateRoute>
            },
            {
                path:"about",
                element:<PrivateRoute><About></About> </PrivateRoute>
            }
        ]
    }
])

export default route;