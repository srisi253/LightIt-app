import { createSlice } from '@reduxjs/toolkit';
import { RecordState } from '../../models/store';

const initialState: RecordState = {
  records: [],
};

const recordSlice = createSlice({
  name: 'recordSlice',
  initialState,
  reducers: {
    setRecords: (state, action) => {
      state.records = action.payload;
    },
    addRecord: (state, action) => {
      state.records.push(action.payload);
    },
    editRecord: (state, action) => {
      const idIndex = state.records.findIndex(r => r.id === action.payload.id);
      state.records[idIndex] = action.payload
    }
  },
});

export const {
  setRecords, addRecord, editRecord
} = recordSlice.actions;
export default recordSlice.reducer;
