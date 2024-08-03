import { useEffect } from "react";
import { fetchRecords } from "../../services/api";
import { RecordCard } from "../../components/Card/RecordCard";
import "./MedicalRecords.scss"; 
import { useDispatch, useSelector } from "react-redux";
import { setRecords as setStoreRecords } from "../../store/slices/recordSlice";
import { MedicalRecord } from "../../models/record";


export const MedicalRecords = () => {
    const recordState = useSelector((state) => state.record.records);
    const dispatch = useDispatch();

      useEffect(() => {
        const getRecordsApi = async () => {
          const records = await fetchRecords("users");
          dispatch(setStoreRecords(records));

          // * TODO: catchear errores
        };
        getRecordsApi();
      }, []);

    return(
        <>
        <h1>Medical records</h1>
        <div className="container">
            {
            recordState?.map((r: MedicalRecord)=> (
                <RecordCard record={r} key={r?.id}/>
            ))
            }
        </div>
    </>
    )
}
