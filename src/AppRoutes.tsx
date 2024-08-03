import { Route, Routes, Navigate } from 'react-router-dom';
import { MedicalRecords } from './pages/MedicalRecords/MedicalRecords';
import { RecordDetail } from './pages/RecordDetail/RecordDetail';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/records" />} />
      <Route path="records" element={<MedicalRecords />} />
      <Route path="records/:id" element={<RecordDetail />} />
    </Routes>
  );
};

export default AppRoutes;
