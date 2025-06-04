import { useEffect, useState } from "react";
import { fetchUser, logout } from "../services/authService";

export const Navbar = () => {

  return (
    <nav className="bg-blue-600 dark:bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">CargoSmart</h1>
          {user ? (
            <>
              <p>
                Witaj, {user.firstName} {user.lastName} ({user.role})
              </p>
              {sessionTimeLeft && (
                <p className="text-sm text-white/80">
                  Sesja wygaśnie za: {sessionTimeLeft}
                </p>
              )}
            </>
          ) : (
            <p>Ładowanie użytkownika...</p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors">
            {isDark ? " Jasny" : " Ciemny"}
          </button>
          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
            Wyloguj
          </button>
        </div>
      </div>
    </nav>
  );
};