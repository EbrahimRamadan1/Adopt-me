import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SearchParams from './pages/SearchParams';
import Details from './pages/Details';
import NotFound from './pages/NotFound';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ErrorBoundary from './components/ErrorBoundary';
import { useState } from 'react';
import AdoptedPetContext from './contexts/adoptedPetContext';
// import { StrictMode } from 'react';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      casheTime: Infinity,
    },
  },
});
const App = () => {
  const adoptedPet = useState(null);
  return (
    // <StrictMode>
    //   {' '}
    <BrowserRouter>
      <ErrorBoundary>
        <AdoptedPetContext.Provider value={adoptedPet}>
          <QueryClientProvider client={queryClient}>
            <header>
              <Link to="/">Adopt Me!</Link>
            </header>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </AdoptedPetContext.Provider>
      </ErrorBoundary>
    </BrowserRouter>
    // </StrictMode>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
