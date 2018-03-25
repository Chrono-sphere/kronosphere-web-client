import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { createHttpLink  } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo';
import { HashRouter } from 'react-router-dom';

import App from 'Components/App';

const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
});

const client = new ApolloClient({
    dataIdFromObject: o => o.id,
    link,
    cache: new InMemoryCache(),
});

const Root = () => {
    return (
        <ApolloProvider client={ client }>
            <HashRouter>
                <App />
            </HashRouter>
        </ApolloProvider>
    );
}

ReactDOM.render(<Root />, document.querySelector('#root'));
