import React, { useState, ChangeEvent, FormEvent } from 'react';
import { MedicalRecord } from '../../models/record';

interface RecordFormProps {
  record?: MedicalRecord;
  onSave: (updatedRecord: MedicalRecord) => void;
  onClose: () => void;
}

export const RecordForm: React.FC<RecordFormProps> = ({ record, onSave, onClose }) => {
  const [name, setName] = useState(record?.name || '');
  const [description, setDescription] = useState(record?.description || '');
  const [website, setWebsite] = useState(record?.website || '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const updatedRecord: MedicalRecord = {
      ...record,
      name,
      description,
      website
    };
    onSave(updatedRecord);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{record ? 'Edit medical record' : 'Create medical record'}</h2>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Website:
        <input
          type="url"
          value={website}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setWebsite(e.target.value)}
        />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};
