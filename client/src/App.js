import React from 'react';
import { Stack, Text, PrimaryButton, TextField, FontWeights, MessageBar, MessageBarType } from '@fluentui/react'
import useForm from './hooks/useForm';

const boldStyle = { root: { fontWeight: FontWeights.semibold } };

function App() {
  const { state, onFieldChange, onSubmit } = useForm();

  const {
    formValues,
    errorMessage,
    weather,
    loading,
  } = state;

  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      verticalFill
      styles={{
        root: {
          maxWidth: '960px',
          margin: '0 auto',
          color: '#605e5c'
        }
      }}
      tokens={{ childrenGap: 15 }}
    >
      {errorMessage &&
        <MessageBar
          messageBarType={MessageBarType.error}
          isMultiline={false}
        >
          {errorMessage}
        </MessageBar>
      }
      <Text variant="xxLarge" as="h1" styles={boldStyle}>
        Weather app
      </Text>
      <Text variant="large">To get the current weather enter the City, Country and API Key</Text>
      <form onSubmit={onSubmit}>
        <Stack tokens={{ childrenGap: 15 }}>
          <Stack horizontal tokens={{ childrenGap: 15 }} horizontalAlign="left">
            <TextField
              name="city"
              label="City"
              required
              value={formValues.city}
              onChange={onFieldChange}
            />
            <TextField
              value={formValues.country}
              onChange={onFieldChange}
              required
              name="country"
              label="Country"
            />
            <TextField
              value={formValues.apiKey}
              onChange={onFieldChange}
              required
              name="apiKey"
              label="API Key"
            />
          </Stack>
          <Stack.Item align="start">
            <PrimaryButton disabled={loading} type="submit">Submit</PrimaryButton>
          </Stack.Item>
        </Stack>
      </form>
      
      {weather &&
        <Text variant="large" role="status" aria-live="assertive">{weather}</Text>
      }
    </Stack>
  );
}

export default App;
