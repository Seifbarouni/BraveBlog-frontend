import { BrowserRouter, Route, Switch ,Link} from 'react-router-dom';
import Layout from './components/Layout';
import PostById from './components/Posts/PostById';
import Navbar from "./components/Navbar";



export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
        <Switch>
          <Route exact path="/">
          <Layout/>
          </Route>
          <Route path="/post/:id">
            <div className="flex justify-center">
            <PostById/>
            </div>
          </Route>
          <Route>
            <div className="text-center mt-12 text-xl font-bold">
              Page not found! <br />
            <Link to="/" className="text-center text-gray-700 text-lg hover:underline">
              Go home
            </Link>
            </div>
          </Route>
        </Switch>
        </BrowserRouter>
    </div>
  );
}