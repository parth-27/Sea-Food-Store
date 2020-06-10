import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import './css/style.css';   // importing css from other files.
import App from './components/App';
import StorePicker from "./components/StorePicker";
import NotFound from './components/NotFound';

class Root extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                        <div>
                            <Switch>
                                {/* In new versions match is changed to route and miss had been discarded.
                                    So use switch instead of miss and write the Route which is return at the last.
                                    Use path instead of pattern to avoid errors.
                                    
                                */}
                                <Route exact path="/" component={StorePicker} />
                                <Route path="/store/:storeId" component={App} />
                                <Route component={NotFound} />
                            </Switch>
                        </div>
                </BrowserRouter>
            </div>
        );
    }
}

// first argument is the compontent to be render
render(<Root/>, document.querySelector("#main"));
