import { useEffect, useState } from "react";
import { MedicalRecord } from "../../models/record";
import { fetchRecords } from "../../services/api";
import { RecordCard } from "../../components/Card/RecordCard";
import "./MedicalRecords.scss"; 

export const MedicalRecords = () => {
    const [records, setRecords] = useState<MedicalRecord[]>();
    let loading:boolean = false;

    useEffect(() => {
        if(!loading && !records){
            loading = true;
            fetchRecords("users").then((data) => {
                setRecords(data);
                loading = false;
            }).catch((r)=> {
                console.log(r)
                // * TODO MOSTRAR ERROR EN PANTALLA
                loading = false;
            });
        }
      });

    return(
        <>
        <h1>Medical records</h1>
        <div className="container">
            {loading ? <h1>loading</h1>:
            records?.map((r)=> (
                <RecordCard record={r} key={r?.id}/>
            ))
            }
        </div>
    </>
    )
}
