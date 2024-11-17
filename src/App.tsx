import Layout from './components/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/theme-provider';
import WeatherDashboard from './pages/weather-dashboard';
import CityPage from './pages/city-page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 minutes
			gcTime: 1000 * 60 * 10, // 10 minutes
			retry: false,
			refetchOnWindowFocus: false,
		},
	},
});

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<ThemeProvider defaultTheme='dark'>
						<Layout>
							<Routes>
								<Route path='/' element={<WeatherDashboard />} />
								<Route path='/city/:citName' element={<CityPage />} />
							</Routes>
						</Layout>
					</ThemeProvider>
				</BrowserRouter>
			</QueryClientProvider>
		</>
	);
}

export default App;
