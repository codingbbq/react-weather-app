import { useTheme } from '@/context/theme-provider';
import { Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CitySearch } from './CitySearch';
const Header = () => {
	const { theme, setTheme } = useTheme();
	const isDark = theme === 'dark';
	return (
		<>
			<header className='sticky top-0 z-50 w-full border-b bg-background/95 background-blur py-2 supports-[backdrop-filter]:bg-background/60'>
				<div className='container mx-auto flex h-16 items-center justify-between px-4'>
					<Link to={'/'}>React climate App</Link>

					<div className="flex gap-4">
						<CitySearch />
						<div onClick={() => setTheme(isDark ? 'light' : 'dark')} className={`flex items-center cursor-pointer transition-transform duration-500 ${isDark ? "rotate-180": "rotate-0"}`}>
                            { isDark? <Sun className='w-6 h-6 text-yellow-500 rotate-0 transition-all' />
                            : <Moon className='w-6 h-6 text-blue-500 transition-all' />}
                        </div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
