import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import PostById from './components/Posts/PostById';
import Navbar from "./components/Navbar";



export default function App() {
  return (
    <div>
      <Navbar/>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
          <Layout/>
          </Route>
          <Route path="/post/:id">
            <div className="flex justify-center">
            <PostById/>
            </div>
          </Route>
        </Switch>
        </BrowserRouter>
    </div>
  );
}