export const getCurrentUser = () => {
	const token = localStorage.getItem("accessToken");
	if (!token) return null;

	try {
		const payload = JSON.parse(atob(token.split(".")[1]));
		return {
			id: payload.id,
			firstName: payload.firstName,
			lastName: payload.lastName,
			role: payload.role,
		};
	} catch (err) {
		return err;
	}
};

export const getUsers = () => {
	return [
		{
			id: 1,
			firstName: "Admin",
			lastName: "User",
			role: "admin",
		},
		{
			id: 2,
			firstName: "Warehouseman",
			lastName: "User",
			role: "magazynier",
		},
		{
			id: 3,
			firstName: "Forwarder",
			lastName: "User",
			role: "spedytor",
		},
        {
			id: 4,
			firstName: "Driver",
			lastName: "User",
			role: "kierowca",
		},
	];
};