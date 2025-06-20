import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SessionProvider } from './context/SessionContext';
import GoogleLogin from './components/GoogleLogin';
import SessionInfo from './components/SessionInfo';
import LandingPage from './pages/LandingPage.jsx';
import ExplorePage from "./pages/ExplorePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ErrorPage from './pages/ErrorPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import CartPage from "./pages/CartPage.jsx";
import AddPage from "./pages/AddPage.jsx";
import RefreshHandler from './utils/RefreshHandler.jsx';
import BottomNavBar from './components/BottomNavBar.jsx';
import PrivateRoute from './utils/PrivateRoute';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { indigo } from '@mui/material/colors';
const getTheme = (mode) =>
    createTheme({
        palette: {
            mode,
            primary: {
                main: mode === 'light' ? '#0091ea' : '#039be5', // Button color
            },
            secondary: indigo,
            background: {
                default: mode === 'light' ? '#f4f6f8' : '#121212',
                paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
            },
        },
    });

// To fix authentication and /auth
const AppContent = ({ isAuthenticated, setIsAuthenticated, mode, setMode }) => {
    const location = useLocation();
    const theme = getTheme(mode);    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SessionInfo />
            <RefreshHandler setIsAuthenticated={setIsAuthenticated} />            <Routes>
                <Route path="/" element={<LandingPage />} />                <Route path="/auth" element={<GoogleLogin setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/add" element={<AddPage />} />

                <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/explore" element={<ExplorePage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/profile" element={<ProfilePage mode={mode} setMode={setMode} />} />
                </Route>                <Route path="*" element={<ErrorPage />} />
            </Routes>
            {location.pathname !== '/auth' && location.pathname !== "/" && <BottomNavBar />}
        </ThemeProvider>
    );
};

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [mode, setMode] = useState(() => localStorage.getItem('themeMode') || 'light');

    useEffect(() => {
        localStorage.setItem('themeMode', mode);
    }, [mode]);

    return (
        <SessionProvider>
            <BrowserRouter>
                <AppContent
                    isAuthenticated={isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated}
                    mode={mode}
                    setMode={setMode}
                />
            </BrowserRouter>
        </SessionProvider>
    );
};

export default App;

// If you want to disable /auth temporarily for testing, un-comment below code and comment above code, and at pr reverse the changes
// import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import LandingPage from './pages/LandingPage.jsx';
// import ExplorePage from "./pages/ExplorePage.jsx";
// import HomePage from "./pages/HomePage.jsx";
// import ErrorPage from './pages/ErrorPage.jsx';
// import ProfilePage from './pages/ProfilePage.jsx';
// import CartPage from "./pages/CartPage.jsx";
// import AddPage from "./pages/AddPage.jsx";
// import BottomNavBar from './components/BottomNavBar.jsx';

// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import { indigo } from '@mui/material/colors';

// const getTheme = (mode) =>
//     createTheme({
//         palette: {
//             mode,
//             primary: {
//                 main: mode === 'light' ? '#0091ea' : '#039be5', // Button color
//             },
//             secondary: indigo,
//             background: {
//                 default: mode === 'light' ? '#f4f6f8' : '#121212',
//                 paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
//             },
//         },
//     });

// // To fix authentication and /auth
// const AppContent = ({  mode, setMode }) => {
//     const location = useLocation();
//     const theme = getTheme(mode);

//     return (
//         <ThemeProvider theme={theme}>
//             <CssBaseline />
//             <Routes>
//                 <Route path="/" element={<LandingPage />} />

//                 <Route path="/home" element={<HomePage />} />
//                 <Route path="/explore" element={<ExplorePage />} />
//                 <Route path="/add" element={<AddPage />} />
//                 <Route path="/cart" element={<CartPage />} />
//                 <Route path="/profile" element={<ProfilePage mode={mode} setMode={setMode} />} />

//                 <Route path="*" element={<ErrorPage />} />
//             </Routes>
//             {location.pathname !== '/auth' && location.pathname !== "/" && <BottomNavBar />}
//         </ThemeProvider>
//     );
// };

// const App = () => {
//     const [mode, setMode] = useState(() => localStorage.getItem('themeMode') || 'light');

//     useEffect(() => {
//         localStorage.setItem('themeMode', mode);
//     }, [mode]);

//     return (
//         <BrowserRouter>
//             <AppContent
//                 mode={mode}
//                 setMode={setMode}
//             />
//         </BrowserRouter>
//     );
// };

// export default App;