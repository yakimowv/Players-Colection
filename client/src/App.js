import { Routes, Route } from 'react-router-dom'
import { lazy,Suspense } from 'react';
import './App.css'

import { AuthProvider } from "./contexts/AuthContext";
import { PlayersProvider } from "./contexts/PlayersContext";


import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import Create from "./components/create/Create";
import NotFound from "./components/404/NotFound";
import Logout from "./components/logout/Logout";
import GuardesForNotLogin from "./components/common/guardes/GuardesForNotLogin";
import GuardesForLogin from "./components/common/guardes/GuardesForLogin";
import ErrorBoundary from './components/common/notificAndError/ErrorBoundary';
import { NotificationProvider } from './contexts/NotificationContext';
import Notification from './components/common/notificAndError/Notification';
import GameOwnerGard from './components/common/guardes/GameOwnerGard';
import Loading from './components/common/Loading';

const Register = lazy(() => import('./components/register/Register')); 
const Catalog = lazy(() => import('./components/catalog/Catalog')); 
const Login = lazy(() => import('./components/login/Login')); 
const Details = lazy(() => import('./components/details/Details')); 
const Search = lazy(() => import('./components/search/Search')); 
const Edit = lazy(() => import('./components/edit/Edit')); 
const MyProfile = lazy(() => import('./components/my-profile/MyProfile')); 


function App() {

    return (
        <ErrorBoundary>
            <AuthProvider>
                <NotificationProvider>
                    <div>
                        <Navbar />
                        <Notification />
                        <PlayersProvider>                           
                            <main id='main'>                      
                    <Routes>
                                    <Route path="/" element={<Home />} />

                                    <Route path="/best-players" element={
                                        <Suspense fallback={<Loading/>}>
                                                   <Catalog />
                                        </Suspense>} />
                                        
                                    <Route path="/search" element={
                                        <Suspense fallback={<Loading/>}>
                                                   <Search />
                                        </Suspense>} />
                                    
                                    <Route path='/details/:playerId' element={
                                        <Suspense fallback={<Loading/>}>
                                                   <Details />
                                        </Suspense>} />

                            <Route element={<GuardesForLogin />}>

                                    <Route path="/login" element={
                                        <Suspense fallback={<Loading/>}>
                                            <Login />
                                        </Suspense>} 
                                    />

                                        <Route path="/register" element={
                                        <Suspense fallback={<Loading/>}>
                                                   <Register />
                                        </Suspense>} />

                            </Route>

                            <Route element={<GuardesForNotLogin />}>
                                    <Route element={<GameOwnerGard />}>
                                        <Route path='/edit/:playerId' element={
                                        <Suspense fallback={<Loading/>}>
                                                   <Edit />
                                        </Suspense>} />

                                    </Route>
                            </Route>

                            <Route element={<GuardesForNotLogin />}>
                                        <Route path="/logout" element={<Logout />} />
                                        <Route path="/add" element={<Create />} />
                                        <Route path="/my-profile" element={
                                        <Suspense fallback={<Loading/>}>
                                                   <MyProfile />
                                        </Suspense>} />
                            </Route>
                                    <Route path="/404" element={<NotFound />} />
                                    <Route path="*" element={<NotFound />} />
                    </Routes>
                            </main>
                        </PlayersProvider>

                        <div id="content-wrap">
                            <Footer />
                        </div>
                    </div>
                </NotificationProvider>
            </AuthProvider>
        </ErrorBoundary>
    );
}

export default App;
