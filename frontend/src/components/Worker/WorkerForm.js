import { useState, useEffect } from "react";
import WorkerService from "../../services/WorkerService";

const WorkerForm = ({ onWorkerAdded, workerToEdit, onCancelEdit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");

  useEffect(() => {
    if (workerToEdit) {
      setFirstName(workerToEdit.firstName);
      setLastName(workerToEdit.lastName);
      setPosition(workerToEdit.position);
    } else {
      setFirstName("");
      setLastName("");
      setPosition("");
    } 
  }, [workerToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workerData = { firstName, lastName, position };

    try {
      if (workerToEdit) {
        await WorkerService.updateWorker(workerToEdit.id, workerData);
      } else {
        await WorkerService.addWorker(workerData);
      }

      onWorkerAdded();

      setFirstName("");
      setLastName("");
      setPosition("");
    } catch (error) {
      console.error("Błąd przy zapisie magazynu:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="worker-form">

      <h2 className="edit">
        {workerToEdit ? "Edytuj magazyn" : "Dodaj magazyn"}
      </h2>

      <input
        type="text"
        placeholder="Imię"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Nazwisko"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Stanowisko"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        required
      />

      <div className="action-buttons">
        <button className="submit">
          {workerToEdit ? "Zapisz zmiany" : "Dodaj"}
        </button>

        <button onClick={onCancelEdit} className="cancel">Anuluj</button>
      </div>
    </form>
  );
};

export default WorkerForm;