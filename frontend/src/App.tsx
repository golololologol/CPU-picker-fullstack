import { useState, useEffect } from 'react';
import {
  CPU,
  CPURequest,
  fetchCPUs,
  createCPU,
  updateCPU,
  deleteCPU,
} from './utils';
import { CPUList, SortConfig } from './components/CPUList';
import { CPUForm } from './components/CPUForm';
import './App.css';

export default function App() {
  const [cpus, setCpus] = useState<CPU[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'brand', direction: null });
  const [showForm, setShowForm] = useState(false);
  const [editCpu, setEditCpu] = useState<CPU | undefined>(undefined);
  const [selectedCpu, setSelectedCpu] = useState<CPU | undefined>(undefined);

  const load = () => fetchCPUs().then(setCpus).catch(console.error);

  useEffect(() => {
    load();
  }, []);

  const handleSortChange = (config: SortConfig) => {
    setSortConfig(config);
  };

  const handleAdd = () => {
    setEditCpu(undefined);
    setShowForm(true);
  };

  const handleEdit = (cpu: CPU) => {
    setEditCpu(cpu);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    await deleteCPU(id);
    await load();
  };

  const handleSelect = (cpu: CPU) => {
    setSelectedCpu(cpu);
  };

  const handleModalEdit = () => {
    if (selectedCpu) {
      setSelectedCpu(undefined);
      handleEdit(selectedCpu);
    }
  };

  const handleModalDelete = async () => {
    if (selectedCpu) {
      await handleDelete(selectedCpu.id);
      setSelectedCpu(undefined);
    }
  };

  const handleCancel = () => setShowForm(false);

  const handleSubmit = async (data: CPURequest) => {
    if (editCpu) await updateCPU(editCpu.id, data);
    else await createCPU(data);
    setShowForm(false);
    await load();
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>CPU Picker</h1>
        <button onClick={handleAdd}>Add New CPU</button>
      </div>
      <CPUList
        cpus={cpus}
        sortConfig={sortConfig}
        onSortChange={handleSortChange}
        onSelect={handleSelect}
      />
      {selectedCpu && !showForm && (
        <div className="overlay">
          <div className="modal">
            <h2>CPU Details</h2>
            <p><strong>Brand:</strong> {selectedCpu.brand}</p>
            <p><strong>Model:</strong> {selectedCpu.model}</p>
            <p><strong>Socket:</strong> {selectedCpu.socket.name}</p>
            <p><strong>Clock Speed:</strong> {selectedCpu.clockspeed}</p>
            <p><strong>Cores:</strong> {selectedCpu.numberOfCores}</p>
            <p><strong>Threads:</strong> {selectedCpu.numberOfThreads}</p>
            <p><strong>TDP:</strong> {selectedCpu.tdp}</p>
            <p><strong>Price (EUR):</strong> {selectedCpu.priceEur.toFixed(2)}</p>
            <div className="buttons">
              <button className='editbtn' onClick={handleModalEdit}>Edit</button>
              <button className='closebtn' onClick={() => setSelectedCpu(undefined)}>Close</button>
              <button className='deletebtn' onClick={handleModalDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
      {showForm && (
        <CPUForm initial={editCpu} onCancel={handleCancel} onSubmit={handleSubmit} />
      )}
    </div>
  );
}
