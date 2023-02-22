import "./App.scss"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./routes/Home/"
import Navigation from "./components/Navigation/"
import Auth from "./routes/auth"
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
    path: "auth",
    element: <Auth />,
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
