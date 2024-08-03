import { useEffect, useState } from "react";
import { fetchRecords } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { setRecords as setStoreRecords } from "../../store/slices/recordSlice";
import { MedicalRecord } from "../../models/record";
import { useParams, useNavigate } from "react-router-dom";
import "./RecordDetail.scss"; // Importa los estilos
import { Modal } from "../../components/Modal/Modal";
import { RecordForm } from "../../components/RecordForm/RecordForm";

export const RecordDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const recordStateById = useSelector((state: any) =>
    state.record.records.find((r: MedicalRecord) => r.id === id)
  );
  const dispatch = useDispatch();
  const { createdAt, name, avatar, description, website } = recordStateById || {};

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);

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

  const handleEdit = (record: MedicalRecord) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleSave = (updatedRecord: MedicalRecord) => {
    // Lógica para guardar el registro actualizado
    console.log('Record saved:', updatedRecord);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
        onClick={() => navigate('/records')}
      >
        &larr; Volver
      </button>
      <button
        className="edit-button"
        onClick={() => handleEdit(recordStateById)}
      >
        Editar
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <RecordForm
          record={selectedRecord || undefined}
          onSave={handleSave}
          onClose={handleCloseModal}
        />
      </Modal>
    </div>
  );
};
