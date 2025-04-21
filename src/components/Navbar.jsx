import React, { useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "./ui/button";
import { Home, CreditCard, Menu, X } from "lucide-react";
import Logo from "./atoms/Logo";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null)

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Failed to log out:", error);
        }
    };

    const navigation = [
        { name: "Dashboard", href: "/dashboard", icon: Home },
        { name: "Expenses", href: "/expenses", icon: CreditCard },
    ];

    const userInitials = user?.email ? user.email : "Guest";


    return (
        <nav className="bg-gray-100 text-black shadow md:px-36">
            <div className="container mx-auto px-4"></div>
            <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                    <Link
                        to="/dashboard"
                        className="text-xl font-bold text-primary"
                    >
                        <Logo />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block ml-10">
                        <div className="flex items-center space-x-4">
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`
                        inline-flex items-center px-3 py-2 rounded-md text-sm font-medium
                        transition-colors duration-200
                        ${
                            location.pathname === item.href
                                ? "text-blue-400"
                                : "hover:text-blue-400"
                        }
                      `}
                                    >
                                        <Icon className="h-4 w-4 mr-2" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Desktop User Info */}
                <div className="hidden md:flex items-center gap-4">
                    <h2>Welcome - {userInitials}</h2>
                    <Button
                        variant="ghost"
                        className="relative text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-500 transition"
                        onClick={handleLogout}
                    >
                        Log Out
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-blue-400"
                    >
                        {isOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div 
                ref={menuRef}
                className=" md:hidden py-4 bg-gray-300 ">
                    <div className="flex flex-col space-y-2">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`
                      inline-flex items-center px-3 pt-2 rounded-md text-sm font-medium
                      ${
                          location.pathname === item.href
                              ? "text-blue-400"
                              : "hover:text-blue-400"
                      }
                    `}
                                >
                                    <Icon className="h-4 w-4 mr-2" />
                                    {item.name}
                                </Link>
                            );
                        })}
                        <div className="">
                            <h2 className="px-3 py-2 text-sm">
                                Welcome - {userInitials}
                            </h2>
                            <Button
                                variant="ghost"
                                className="ml-3 text-left px-3 py-2 text-white font-semibold rounded-lg hover:bg-blue-500 transition"
                                onClick={() => {
                                    handleLogout();
                                    setIsOpen(false);
                                }}
                            >
                                Log Out
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>  
    );
};

export default Navbar
