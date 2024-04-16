import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <>
    <Routes>
        {/* Public Routes */}
        <Route
          path="/auth/login"
          exact
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/auth/register"
          exact
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        

        {/* unknown Routes */}
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
