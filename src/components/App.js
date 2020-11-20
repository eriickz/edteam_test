import { Switch, Route } from 'react-router-dom';
import routes from '../routes';

function App() {
    const appRoutes = routes.map(( route, index ) => (
        <Route
            key={index}
            path={route.path}
            exact={route.exact}
            render={props => (
                <route.component {...props} />
            )} />
    ));

    return(
        <Switch>
            {appRoutes}
        </Switch>
    )
}

export default App;
