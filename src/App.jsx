import { Routes, Route } from "react-router-dom";


import Home from "./pages/Home";


function App() {
    const [state, appDispatch] = useReducer(AppReducer, data);

    const menuItems = [
        {
            id: 1,
            label: "Home",
            url: "/",
            urlPattern: "/",
            element: <Home />,
        },
    ];

    return (
        <AppContext.Provider value={{ items: state, dispatch: appDispatch }}>
            <RootLayout items={menuItems}>
                <Routes>
                    {menuItems.map((item) => (
                        <Route
                            path={item.urlPattern}
                            element={item.element}
                            key={item.id}
                        />
                    ))}
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </RootLayout>
        </AppContext.Provider>
    );
}

export default App;
