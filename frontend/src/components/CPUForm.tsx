import React, { useEffect } from 'react';
import type { Socket, CPURequest, CPU } from '../utils';
import { fetchSockets } from '../utils';
import { useForm } from 'react-hook-form';

interface Props {
  initial?: CPU;
  onCancel: () => void;
  onSubmit: (data: CPURequest) => Promise<void>;
}

export const CPUForm: React.FC<Props> = ({ initial, onCancel, onSubmit }) => {
  const [sockets, setSockets] = React.useState<Socket[]>([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CPURequest>({
    defaultValues: initial ? {
      brand: initial.brand,
      model: initial.model,
      clockspeed: initial.clockspeed,
      numberOfCores: initial.numberOfCores,
      numberOfThreads: initial.numberOfThreads,
      tdp: initial.tdp,
      priceEur: initial.priceEur,
      socketId: initial.socket.id,
    } : {}
  });

  useEffect(() => {
    fetchSockets()
      .then(data => {
        setSockets(data);
        // ensure socket select is pre-populated after options load
        if (initial) {
          reset({
            brand: initial.brand,
            model: initial.model,
            clockspeed: initial.clockspeed,
            numberOfCores: initial.numberOfCores,
            numberOfThreads: initial.numberOfThreads,
            tdp: initial.tdp,
            priceEur: initial.priceEur,
            socketId: initial.socket.id,
          });
        }
      })
      .catch(() => {});
  }, [initial, reset]);

  useEffect(() => {
    if (initial) reset({
      brand: initial.brand,
      model: initial.model,
      clockspeed: initial.clockspeed,
      numberOfCores: initial.numberOfCores,
      numberOfThreads: initial.numberOfThreads,
      tdp: initial.tdp,
      priceEur: initial.priceEur,
      socketId: initial.socket.id,
    });
  }, [initial, reset]);

  const onSubmitForm = async (data: CPURequest) => {
    await onSubmit(data);
  };

  return (
    <div className="overlay">
      <form className="modal" onSubmit={handleSubmit(onSubmitForm)}>
        <h2>{initial ? 'Edit CPU' : 'Add New CPU'}</h2>
        <label>Brand
          <input {...register('brand', { required: 'Brand is required' })} />
          {errors.brand && <span className="error">{errors.brand.message}</span>}
        </label>
        <label>Model
          <input {...register('model', { required: 'Model is required' })} />
          {errors.model && <span className="error">{errors.model.message}</span>}
        </label>
        <label>Clock Speed
          <input type="number" step="0.1" {...register('clockspeed', { required: 'Clock speed is required', valueAsNumber: true })} />
          {errors.clockspeed && <span className="error">{errors.clockspeed.message}</span>}
        </label>
        <label>Cores
          <input type="number" {...register('numberOfCores', { required: 'Cores is required', valueAsNumber: true })} />
          {errors.numberOfCores && <span className="error">{errors.numberOfCores.message}</span>}
        </label>
        <label>Threads
          <input type="number" {...register('numberOfThreads', { required: 'Threads is required', valueAsNumber: true })} />
          {errors.numberOfThreads && <span className="error">{errors.numberOfThreads.message}</span>}
        </label>
        <label>TDP
          <input type="number" {...register('tdp', { required: 'TDP is required', valueAsNumber: true })} />
          {errors.tdp && <span className="error">{errors.tdp.message}</span>}
        </label>
        <label>Price (EUR)
          <input type="number" step="0.01" {...register('priceEur', { required: 'Price is required', valueAsNumber: true })} />
          {errors.priceEur && <span className="error">{errors.priceEur.message}</span>}
        </label>
        <label>Socket
          <select {...register('socketId', { required: 'Socket is required', valueAsNumber: true })}>
            <option value="">Select socket</option>
            {sockets.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          {errors.socketId && <span className="error">{errors.socketId.message}</span>}
        </label>
        <div className="buttons">
          <button type="button" onClick={onCancel}>Cancel</button>
          <button type="submit">{initial ? 'Save' : 'Create'}</button>
        </div>
      </form>
    </div>
  );
};