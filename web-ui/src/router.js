import React from 'react';
import { Route, Redirect, HashRouter, Switch, useHistory } from 'react-router-dom';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

//const Login = React.lazy(() => import('./js/views/Login'));
//const Dashboard = React.lazy(() => import('./js/views/Dashboard'));


const Home = React.lazy(() => import('./views/Home'))
const Upload = React.lazy(() => import('./views/Upload'))

const Router = (props) => {
  

  return (
    <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            {/* <WithAuth exact path="/Dashboard" name="Dashboard" component={Dashboard} /> */}
            {/* <Route exact path="/StripePayment" name="Checkout API" render={props => <StripePayment {...props}/>} /> */}
{/*             
            <WithAuth exact path="/upload" name="Upload" component={Upload} />
            <WithAuth exact path="/home" name="Home" component={Home} />
            <WithAuth exact path="/dashboard" name="Home" component={Home} /> */}
            <Route exact path="/upload" name="Upload" component={Upload} />
            <Route path="/" name="Home" render={props => <Home {...props}/>} />
          </Switch>
        </React.Suspense>
    </HashRouter>
  );
}

export default Router;
