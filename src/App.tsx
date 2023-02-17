import "./App.scss"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./routes/Home/"
import Navigation from "./components/Navigation/"
import Signin from "./routes/signin"

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
])

function App() {
  return <RouterProvider router={router} />
}

export default App
