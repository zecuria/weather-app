import {
    UPDATE_FORM,
    SUBMIT_FORM,
    UPDATE_WEATHER,
    SET_ERROR_MESSAGE,
} from "./ActionsTypes";

export const initialState = {
    formValues: {
        city: '',
        country: '',
        apiKey: ''
    },
    weather: '',
    errorMessage: '',
    loading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_FORM: {
            const formValues = {
                ...state.formValues,
                [action.name]: action.value,
            };

            return {
                ...state,
                formValues,
            };
        }
        case SUBMIT_FORM:
            return {
                ...state,
                loading: true,
            };
        
        case UPDATE_WEATHER:
            return {
                ...state,
                weather: `The weather in ${action.city} is currently ${action.message}`,
                errorMessage: '',
                loading: false
            };
        
        case SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.message,
                weather: '',
                loading: false
            }
        
        default:
            return state;
    }
};

export default reducer;