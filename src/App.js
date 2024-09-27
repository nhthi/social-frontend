import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Authentication from './pages/Authentication/Authentication';
import HomePage from './pages/HomePage/HomePage';
import Message from './pages/Message/Message';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProfileAction } from './Redux/Auth/auth.action';
import { ThemeProvider } from '@mui/material';
import { darkTheme } from './Theme/DarkTheme';

function App() {
  const auth = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const jwt = localStorage.getItem('jwt')
  useEffect(() => {
    dispatch(getProfileAction(jwt))
  }, [jwt])
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <div className="App">
          <Routes>
            <Route path='/*' element={auth.user ? <HomePage /> : <Authentication />} />
            <Route path='/message' element={<Message />} />
            {/* <Route path='/*' element={<Authentication />} /> */}
          </Routes>
        </div>
      </Router>
    </ThemeProvider>

  );
}

export default App;
