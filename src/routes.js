import ToDo from "./pages/todo/ToDo";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import SingleTask from "./pages/singleTask/SingleTask";
import NotFound from "./pages/notFound/NotFound";


const routes = [
  {
    path: "/",
    element: <ToDo />,
  },
  {
    path: "/todo",
    element: <ToDo/>,
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
    element: <NotFound/>,
  },
];

export { routes };
