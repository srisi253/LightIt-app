import { MedicalRecord } from "./record";

export interface RecordState {
    records: MedicalRecord[],
  }

export interface State {
    record : RecordState
}