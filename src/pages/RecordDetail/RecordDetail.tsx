// RecordDetail.tsx
import { useEffect } from "react";
import { fetchRecords } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { setRecords as setStoreRecords } from "../../store/slices/recordSlice";
import { MedicalRecord } from "../../models/record";
import { useParams, useNavigate } from "react-router-dom";
import "./RecordDetail.scss"; // Importa los estilos

export const RecordDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const recordStateById = useSelector((state: any) =>
    state.record.records.find((r: MedicalRecord) => r.id === id)
  );
  const dispatch = useDispatch();
  const { createdAt, name, avatar, description, website } = recordStateById || {};

  useEffect(() => {
    const getRecordsApi = async () => {
      const records = await fetchRecords("users");
      dispatch(setStoreRecords(records));

      // * TODO: catchear errores
    };
    if (!recordStateById) {
      getRecordsApi();
    }
  }, [dispatch, recordStateById]);

  return (
    <div className="record-detail">

      <div className="record-info">
        <img src={avatar} alt="avatar" className="record-avatar" />
        <div className="record-content">
          <h1 className="record-title">{name}</h1>
          <p className="record-date">{createdAt}</p>
          <p className="record-description">{description}</p>
          <a href={website} target="_blank" rel="noopener noreferrer" className="record-website">
            {website}
          </a>
        </div>
      </div>
      <button
        className="back-button"
        onClick={() => navigate('/records')} // Navega a /records
      >
        &larr; Volver
      </button>
    </div>
  );
};
