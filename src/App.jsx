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
        {
            id: 2,
            label: "Laboratorium 1",
            url: "/lab1",
            urlPattern: "/lab1",
            element: <Lab1 />,
        },
        {
            id: 3,
            label: "Laboratorium 2",
            url: "/lab2/:id",
            urlPattern: "/lab2/:id",
            element: <Lab2 />,
        },
        {
            id: 4,
            label: "Laboratorium 3",
            url: "/lab3",
            urlPattern: "/lab3",
            element: <Lab3Page />,
        },
        {
            id: 5,
            label: "Add Person",
            url: "/lab4/add",
            urlPattern: "/lab4/add",
            element: <AddForm />,
        },
        {
            id: 6,
            label: "Edit Person",
            url: "/lab4/edit/:id",
            urlPattern: "/lab4/edit/:id",
            element: <EditForm />,
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
