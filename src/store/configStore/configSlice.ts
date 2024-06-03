import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ConfigState {
  analytics: {
    timePeriod: string
  };
}

const initialState: ConfigState = {
  analytics: {
    timePeriod: 'year'
  }
}

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setTimePeriod: (state, action: PayloadAction<string>) => {
      state.analytics.timePeriod = action.payload
    }
  }
})

export const { setTimePeriod } = configSlice.actions
export default configSlice.reducer
