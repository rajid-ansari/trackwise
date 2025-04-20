import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./contexts/AuthContext"; // Make sure to import useAuth
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import NewExpense from "./pages/NewExpense";
import Welcome from "./components/organisms/Welcome";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/atoms/ProtectedRoute";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Toaster position="top-right" />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" element={<RootRedirect />} />
                    <Route path="/" element={<Layout />}>
                        <Route
                            path="dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="expenses"
                            element={
                                <ProtectedRoute>
                                    <Expenses />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="expenses/new"
                            element={
                                <ProtectedRoute>
                                    <NewExpense />
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

// New component to handle root route redirection
function RootRedirect() {
    const { currentUser } = useAuth();
    return currentUser ? <Navigate to="/dashboard" replace /> : <Welcome />;
}

export default App;
