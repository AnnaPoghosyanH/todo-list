import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ToDo from "./pages/todo/ToDo";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import NavBar from "./components/navBar/NavBar";
import SingleTask from "./pages/singleTask/SingleTask";
import NotFound from "./pages/notFound/NotFound";

const pages = [
  {
    path: "/",
    element: <ToDo />,
  },
  {
    path: "/todo",
    element: <ToDo />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/task/:taskId",
    element: <SingleTask />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
          {pages.map((page) => (
            <Route key={page.path} path={page.path} element={page.element} />
          ))}
        </Routes>
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
