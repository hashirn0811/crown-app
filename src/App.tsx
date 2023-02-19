import "./App.scss"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./routes/Home/"
import Navigation from "./components/Navigation/"
import Signin from "./routes/signin"
import SignUp from "./routes/signup/"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      {
        element: <Home />,
        index: true,
      },
    ],
  },
  {
    path: "login",
    element: <Signin />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
