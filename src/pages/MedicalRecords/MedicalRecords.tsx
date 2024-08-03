// MedicalRecords.tsx
import { useEffect, useState } from "react";
import { fetchRecords } from "../../services/api";
import { RecordCard } from "../../components/Card/RecordCard";
import "./MedicalRecords.scss"; 
import { useDispatch, useSelector } from "react-redux";
import { setRecords as setStoreRecords } from "../../store/slices/recordSlice";
import { MedicalRecord } from "../../models/record";
import { RecordForm } from "../../components/RecordForm/RecordForm";
import { Modal } from "../../components/Modal/Modal";


export const MedicalRecords = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const recordState = useSelector((state: any) => state.record.records); // Asegúrate de tipar correctamente
  const dispatch = useDispatch();

  useEffect(() => {
    const getRecordsApi = async () => {
      const records = await fetchRecords("users");
      dispatch(setStoreRecords(records));
    };
    getRecordsApi();
  }, [dispatch]);

  const handleCreate = () => {
    setSelectedRecord(null);
    setIsModalOpen(true);
  };

  const handleSave = (updatedRecord: MedicalRecord) => {
    // Lógica para guardar el registro
    console.log('Record saved:', updatedRecord);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <h1>Medical Records</h1>
      <button className="create-button" onClick={handleCreate}>
        + Crear registro médico
      </button>
      <div className="container">
        {recordState?.map((r: MedicalRecord) => (
          <RecordCard
            record={r}
            key={r.id}
            // onEdit={() => handleEdit(r)} // Añade una prop onEdit si necesitas una funcionalidad de edición en el componente RecordCard
          />
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <RecordForm  record={selectedRecord || undefined} onSave={handleSave} onClose={handleCloseModal}/>
      </Modal>
    </>
  );
};
