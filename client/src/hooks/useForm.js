import { useReducer, useEffect } from 'react';
import reducer, { initialState } from '../reducer/Reducer';
import { UPDATE_FORM, SUBMIT_FORM, SET_ERROR_MESSAGE, UPDATE_WEATHER } from '../reducer/ActionsTypes';
import getWeather from '../getWeather';

const useForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    loading,
    formValues,
  } = state;

  useEffect(() => {
    if (!loading) {
      return;
    }

    const fetchData = async () => {
      const { city } = formValues;
      const { success, message } = await getWeather(formValues);
      if (!success) {
        dispatch({
          type: SET_ERROR_MESSAGE,
          message,
        });
      } else {
        dispatch({
          type: UPDATE_WEATHER,
          city,
          message,
        });
      }
    };

    fetchData();
  }, [loading, formValues]);

  const onFieldChange = (e) => dispatch({
    type: UPDATE_FORM,
    name: e.target.name,
    value: e.target.value,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: SUBMIT_FORM,
    });
  }

  return { state, onFieldChange, onSubmit };
}

export default useForm;
