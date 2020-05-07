import { renderHook, act } from '@testing-library/react-hooks';
import useForm from './useForm';

import getWeather from '../getWeather';
let weatherResponse;
jest.mock('../getWeather');

beforeEach(() => {
    weatherResponse = { success: true, message: 'cloudy' };
    getWeather.mockImplementation(jest.fn(() => Promise.resolve(weatherResponse)));
});

const getEvent = (name, value) => ({
    target: {
        name,
        value,
    }
});

test('calling update field should update the field state', () => {
    const { result } = renderHook(() => useForm());

    act(() => {
        result.current.onFieldChange(getEvent('city', '-val-city'));
    });

    const { formValues } = result.current.state;
    expect(formValues.city).toBe('-val-city')
});

test('submitting the form should fetch the weather', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useForm());

    act(() => {
        result.current.onFieldChange(getEvent('city', '-val-city'));
        result.current.onFieldChange(getEvent('country', '-val-country'));
        result.current.onFieldChange(getEvent('apiKey', '-val-apiKey'));
    });

    act(() => {
        result.current.onSubmit({ preventDefault: () => {} });
    });

    expect(result.current.state.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.state.loading).toBe(false);
    expect(result.current.state.weather).toMatch('cloudy');
    expect(getWeather).toHaveBeenCalledWith({
        city: '-val-city',
        country: '-val-country',
        apiKey: '-val-apiKey',
    });
});

test('error from weather should provide error in state', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useForm());
    weatherResponse = { success: false, message: 'City not found' };

    act(() => {
        result.current.onSubmit({ preventDefault: () => {} });
    });

    expect(result.current.state.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.state.loading).toBe(false);
    expect(result.current.state.weather).toBe('');
    expect(result.current.state.errorMessage).toBe(weatherResponse.message);
});
