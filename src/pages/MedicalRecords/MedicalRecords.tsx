import { useEffect, useState } from "react";
import { fetchRecords, postRecord } from "../../services/api";
import { RecordCard } from "../../components/Card/RecordCard";
import "./MedicalRecords.scss";
import { useDispatch, useSelector } from "react-redux";
import { setRecords as setStoreRecords, addRecord } from "../../store/slices/recordSlice";
import { MedicalRecord } from "../../models/record";
import { RecordForm } from "../../components/RecordForm/RecordForm";
import { Modal } from "../../components/Modal/Modal";
import { Snackbar } from "../../components/SnackBar/SnackBar";
import loadingSpinner from "../../assets/hospital.png"
import { State } from "../../models/store";


export const MedicalRecords = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const recordState = useSelector((state: State) => state.record.records);
  const dispatch = useDispatch();
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const getRecordsApi =  () => {
      fetchRecords("users").then(response => {
        dispatch(setStoreRecords(response));
        setLoading(false);
      }).catch(err => {
        setSnackbarMessage(err.message)
        setLoading(false);
      });
    };
      getRecordsApi();
  },[]);

  const createRecord = () => {
    setIsModalOpen(true);
  };

  const saveRecord = (newRecord: MedicalRecord) => {
    setIsModalOpen(false);
    postRecord("users", newRecord).then(response => {
      dispatch(addRecord(response));
      setSnackbarMessage('Success: Record has been successfully created.')
    }).catch(err => {
      setSnackbarMessage(err.message)
    });

  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeSnackbar = () => {
    setSnackbarMessage('')
  }

  return (
    <>
      {loading ?
      <div>
        <img className="spinner" src={loadingSpinner} alt="Spinner"/>
        <p><b>Loading...</b></p>
      </div>

      :
        <>
              <h1>Medical Records</h1>
              <button className="create-button" onClick={createRecord}>
                + Create medical record
              </button>
              <div className="container">
                {recordState?.map((r: MedicalRecord) => (
                  <RecordCard
                    key={r.id}
                    record={r}
                  />
                ))}
              </div>
        </>
      }

      <Modal isOpen={isModalOpen} onClose={closeModal}>
            <RecordForm onSave={saveRecord} onClose={closeModal}/>
      </Modal>

      {snackbarMessage && <Snackbar message={snackbarMessage} onClose={closeSnackbar} />}
    </>
  );
};
