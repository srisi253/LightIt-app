import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.scss";
import { MedicalRecords } from "./pages/MedicalRecords/MedicalRecords";
import { RecordDetail } from "./pages/RecordDetail/RecordDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MedicalRecords />}>
          <Route path="records" element={<MedicalRecords />} />
          <Route path="records/:id" element={<RecordDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
