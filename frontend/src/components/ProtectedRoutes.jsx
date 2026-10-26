
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await fetch(
                    "http://localhost:1000/api/v1/auth/profile",
                    {
                        method: "GET",
                        credentials: "include"
                    }
                );

                const data = await response.json();

                console.log("Profile status:", response.status);
                console.log("Profile response:", data);

                setAuthenticated(
                    response.ok && data.status === true
                );
            } catch (error) {
                console.error("Auth error:", error);
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, []);

    if (loading) {
        return <p>Checking authentication...</p>;
    }

    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoutes;
