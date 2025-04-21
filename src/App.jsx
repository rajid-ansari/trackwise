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
import { Helmet } from "react-helmet"; //seo optimization

function App() {
    return (
        <AuthProvider>
            {/* seo start */}
            <Helmet>
                <title>TrackWise - Smart & Simple Expense Tracker</title>
                <meta
                    name="description"
                    content="TrackWise helps you manage your daily expenses and budget efficiently."
                />
                <meta
                    name="keywords"
                    content="expense tracker, budget app, money management, TrackWise app, daily expenses, budget planner"
                />
                <meta name="author" content="Rajid" />
            </Helmet>
            {/* seo end */}
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
    const { user } = useAuth();
    return user ? <Navigate to="/dashboard" replace /> : <Welcome />;
}

export default App;
