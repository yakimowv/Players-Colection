import { Routes, Route } from 'react-router-dom'
import './App.css'

import { AuthProvider } from "./contexts/AuthContext";
import { PlayersProvider } from "./contexts/PlayersContext";


import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Footer from "./components/footer/Footer";
import Create from "./components/create/Create";
import Catalog from "./components/catalog/Catalog";
import NotFound from "./components/404/NotFound";
import MyProfile from "./components/my-profile/MyProfile";
import Search from "./components/search/Search";
import Logout from "./components/logout/Logout";
import GuardesForNotLogin from "./components/common/guardes/GuardesForNotLogin";
import GuardesForLogin from "./components/common/guardes/GuardesForLogin";
import Details from './components/details/Details';
import Edit from './components/edit/Edit';
import ErrorBoundary from './components/common/notificAndError/ErrorBoundary';
import { NotificationProvider } from './contexts/NotificationContext';
import Notification from './components/common/notificAndError/Notification';
import GameOwnerGard from './components/common/guardes/GameOwnerGard';


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
                                    <Route path="/best-players" element={<Catalog />} />
                                    <Route path="/search" element={<Search />} />
                                    <Route path='/details/:playerId' element={<Details />} />

                                    <Route element={<GuardesForLogin />}>
                                        <Route path="/login" element={<Login />} />
                                        <Route path="/register" element={<Register />} />
                                    </Route>

                                    <Route element={<GuardesForNotLogin />}>
                                    <Route element={<GameOwnerGard />}>
                                        <Route path='/edit/:playerId' element={<Edit />} />
                                    </Route>
                                    </Route>

                                    <Route element={<GuardesForNotLogin />}>
                                        <Route path="/logout" element={<Logout />} />
                                        <Route path="/add" element={<Create />} />
                                        <Route path="/my-profile" element={<MyProfile />} />
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
