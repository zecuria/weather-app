import reducer from './Reducer';
import {
    UPDATE_FORM,
    SUBMIT_FORM,
    UPDATE_WEATHER,
    SET_ERROR_MESSAGE,
    LOAD_WEATHER_DATA
} from "./ActionsTypes";


describe('reducer', () => {
    it('should update form when an UPDATE_FORM action is provided', () => {
        const action = { type: UPDATE_FORM, name: 'city', value: '-val-city' };
        let state = reducer(undefined, action);
        state = reducer(state, {...action, name: 'country', value: '-val-country' });
        state = reducer(state, {...action, name: 'apiKey', value: '-val-api-key' });
        expect(state.formValues).toEqual({
            city: '-val-city',
            country: '-val-country',
            apiKey: '-val-api-key',
        });
    });

    it('should set the loading state when SUBMIT_FORM action provided', () => {
        const action = { type: SUBMIT_FORM };
        let state = reducer(undefined, action);
        expect(state.loading).toBe(true);
    });

    it('should set the weather when UPDATE_WEATHER action provided', () => {
        const action = { type: UPDATE_WEATHER, message: 'cloudy', city: 'melbourne' };
        let state = reducer(undefined, action);
        expect(state.weather).toMatch('cloudy');
        expect(state.weather).toMatch('melbourne');
    });

    it('should set the errorMessage when SET_ERROR_MESSAGE action provided', () => {
        const action = { type: SET_ERROR_MESSAGE, message: '-val-error' };
        let state = reducer(undefined, action);
        expect(state.errorMessage).toBe('-val-error');
    });
});