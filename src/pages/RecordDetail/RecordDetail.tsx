import { useEffect, useState } from "react";
import { fetchRecords, editRecord as editRecordApi } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { setRecords as setStoreRecords, editRecord } from "../../store/slices/recordSlice";
import { MedicalRecord } from "../../models/record";
import { useParams, useNavigate } from "react-router-dom";
import "./RecordDetail.scss";
import { Modal } from "../../components/Modal/Modal";
import { RecordForm } from "../../components/RecordForm/RecordForm";
import { Snackbar } from "../../components/SnackBar/SnackBar";
import { State } from "../../models/store";

export const RecordDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const recordStateById = useSelector((state: State) =>
    state.record.records.find((r: MedicalRecord) => r.id === id)
  );
  const dispatch = useDispatch();
  const { createdAt, name, avatar, description, website } = recordStateById || {};

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');


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

  const recordEdit = (record: MedicalRecord) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const saveEditRecord = (updatedRecord: MedicalRecord) => {
    setIsModalOpen(false);
    editRecordApi("users", updatedRecord).then(response =>{
      dispatch(editRecord(response));
      setSnackbarMessage('Success: Record has been successfully edited.')

    }).catch(err => setSnackbarMessage(err.message));

  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const closeSnackbar = () => {
    setSnackbarMessage('');
  }

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
        &larr; Back
      </button>
      <button
        className="edit-button"
        onClick={() => recordStateById && recordEdit(recordStateById)}
      >
        Edit
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <RecordForm
          record={selectedRecord || undefined}
          onSave={saveEditRecord}
          onClose={handleCloseModal}
        />
      </Modal>

      {snackbarMessage && <Snackbar message={snackbarMessage} onClose={closeSnackbar} />}
    </div>
  );
};
