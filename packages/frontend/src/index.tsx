import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import './styles/index.css';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { AUTH_TOKEN } from './constants';
import { BrowserRouter } from 'react-router-dom';
// import {BrowserRouter as Router} from 'react-router-dom';
const httpLink = createHttpLink({
	uri: 'http://localhost:4000'
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem(AUTH_TOKEN);
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ''
		}
	};
});

const errorLink = onError(({ graphQLErrors }) => {
	if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const client = new ApolloClient({
	link: ApolloLink.from([ errorLink, authLink, httpLink ]),
	cache: new InMemoryCache()
});

const rootElement = document.getElementById('root');

ReactDOM.render(
	<BrowserRouter>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</BrowserRouter>,
	rootElement
);
