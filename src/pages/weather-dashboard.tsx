import CurrentWeather from '@/components/CurrentWeather';
import HourlyTemprature from '@/components/HourlyTemprature';
import WeatherSkeleton from '@/components/loading-skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useGeoLocation } from '@/hooks/useGeoLocation';
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/useWeather';
import { AlertCircle, AlertTriangle, MapPin, RefreshCw } from 'lucide-react';

const WeatherDashboard = () => {
	const {
		coordinates,
		error: locationError,
		isLoading: locationLoading,
		getLocation,
	} = useGeoLocation();

	const weatherQuery = useWeatherQuery(coordinates);
	const forecastQuery = useForecastQuery(coordinates);
	const locationQuery = useReverseGeocodeQuery(coordinates);

	const handleRefresh = () => {
		getLocation();
		if (coordinates) {
			weatherQuery.refetch();
			forecastQuery.refetch();
			locationQuery.refetch();
		}
	};

	if (locationLoading) {
		return <WeatherSkeleton />;
	}

	if (locationError) {
		return (
			<Alert variant='destructive'>
				<AlertCircle className='h-4 w-4' />
				<AlertTitle>Location Error</AlertTitle>
				<AlertDescription className='flex flex-col gap-4'>
					<p>{locationError}</p>
					<Button variant={'outline'} onClick={getLocation} className='w-fit'>
						<MapPin className='mr-2 h-4 w-4' />
						Enable location
					</Button>
				</AlertDescription>
			</Alert>
		);
	}

	if (!coordinates) {
		return (
			<Alert variant='destructive'>
				<AlertCircle className='h-4 w-4' />
				<AlertTitle>Coordinates Error</AlertTitle>
				<AlertDescription className='flex flex-col gap-4'>
					<p>Coordinates not found</p>
					<Button variant={'outline'} onClick={getLocation} className='w-fit'>
						<MapPin className='mr-2 h-4 w-4' />
						Enable location
					</Button>
				</AlertDescription>
			</Alert>
		);
	}

	if (weatherQuery.error || forecastQuery.error) {
		return (
			<Alert variant='destructive'>
				<AlertTriangle className='h-4 w-4' />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription className='flex flex-col gap-4'>
					<p>Failed to fetch weather data. Please try again.</p>
					<Button variant='outline' onClick={handleRefresh} className='w-fit'>
						<RefreshCw className='mr-2 h-4 w-4' />
						Retry
					</Button>
				</AlertDescription>
			</Alert>
		);
	}

	if (!weatherQuery.data || !forecastQuery.data) {
		return <WeatherSkeleton />;
	}

	const locationName = locationQuery.data?.[0];

	return (
		<>
			{/* Favorite cities */}
			<div className='flex items-center justify-between'>
				<h1 className='text-xl font-bold tracking-tight'>My Location</h1>
				<Button
					variant={'outline'}
					size={'icon'}
					onClick={handleRefresh}
					disabled={weatherQuery.isFetching || forecastQuery.isFetching}
				>
					<RefreshCw size={4} className={weatherQuery.isFetching ? 'animate-spin' : ''} />
				</Button>
			</div>
			
            <div className='grid gap-6'>
                <div className='flex flex-col lg:flex-row gap-4'>
                    <CurrentWeather data={weatherQuery.data} locationName={locationName } />
                    <HourlyTemprature data={forecastQuery.data} />
                </div>

                <div>
                    
                </div>
            </div>
		</>
	);
};

export default WeatherDashboard;
