export default function AppReducer(state, action) {
    switch (action.type) {
        case 'add':
           return [...state, { id: state.length + 1, ...action.newItem }];
        case "edit": {
            return state.map(item =>
                item.id === action.id ? { ...item, ...action.updatedData } : item
            );
        }
        case "rate": {
            // Find the item by id and update its rating
            return state.map(item =>
                item.id === action.id
                    ? { ...item, rating: action.newRating }
                    : item
            );
        }
        case "delete": {
            // Remove the item with the matching id
            return state.filter(item => item.id !== action.id);
        }
        // case "setCurrentPerson": {
        //     return {
        //         ...state,
        //         currentPerson: action.payload, // Store the current person for editing
        //     }
        // }
        default:
            return state;
    }
}
