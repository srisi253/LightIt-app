import { createSlice } from '@reduxjs/toolkit';
import { MedicalRecord } from "../../models/record";

export interface RecordState {
    records: MedicalRecord[],
  }

const initialState: RecordState = {
  records: [],
};

const recordSlice = createSlice({
  name: 'recordSlice',
  initialState,
  reducers: {
    setRecords: (state, action) => {
      const { payload } = action;
      state.records = payload;
    }
  },
});

export const {
  setRecords,
} = recordSlice.actions;
export default recordSlice.reducer;
