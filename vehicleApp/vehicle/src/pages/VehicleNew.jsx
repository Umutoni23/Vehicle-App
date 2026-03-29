import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { vehicleInfoSchema, ownerSchema, regInsuranceSchema } from '../schemas/vehicleSchema';
import { useCreateVehicle } from '../hooks/useVehicles';
import { showSuccess, show422Errors } from '../components/Toast';

const steps = ['Vehicle Info', 'Owner Info', 'Registration & Insurance'];
const schemas = [vehicleInfoSchema, ownerSchema, regInsuranceSchema];

export default function VehicleNew() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const createMutation = useCreateVehicle();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schemas[step]),
  });

  const onNext = (data) => {
    const updated = { ...formData, ...data };
    setFormData(updated);
    if (step < 2) {
      setStep(step + 1);
    } else {
      createMutation.mutate(updated, {
        onSuccess: () => { showSuccess('Vehicle registered!'); navigate('/dashboard'); },
        onError: (err) => show422Errors(err),
      });
    }
  };

  const Field = ({ name, label, type = 'text' }) => (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input
        type={type}
        {...register(name)}
        className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition
          ${errors[name]
            ? 'border-red-400 focus:ring-2 focus:ring-red-200 bg-red-50'
            : 'border-slate-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400'
          }`}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs">{errors[name].message}</p>
      )}
    </div>
  );

  const Select = ({ name, label, options }) => (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <select
        {...register(name)}
        className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition bg-white
          ${errors[name]
            ? 'border-red-400 focus:ring-2 focus:ring-red-200 bg-red-50'
            : 'border-slate-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400'
          }`}
      >
        <option value="">Select...</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      {errors[name] && (
        <p className="text-red-500 text-xs">{errors[name].message}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Register New Vehicle</h1>
          <p className="text-slate-400 text-sm mt-1">Fill in all details across the 3 steps</p>
        </div>

        {/* Step Indicators */}
        <div className="flex gap-2 mb-8">
          {steps.map((s, i) => (
            <div
              key={s}
              className={`flex-1 text-center py-2.5 px-3 rounded-lg text-xs font-semibold transition-all
                ${i === step
                  ? 'bg-blue-600 text-white shadow'
                  : i < step
                  ? 'bg-green-100 text-green-700'
                  : 'bg-slate-200 text-slate-500'
                }`}
            >
              <span className="mr-1">
                {i < step ? '✓' : i + 1}.
              </span>
              {s}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow p-8">

          <h2 className="text-lg font-semibold text-slate-700 mb-6 pb-3 border-b border-slate-100">
            Step {step + 1}: {steps[step]}
          </h2>

          <form onSubmit={handleSubmit(onNext)}>

            {/* Step 1 - Vehicle Info */}
            {step === 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field name="manufacture" label="Manufacturer" />
                <Field name="model" label="Model" />
                <Field name="bodyType" label="Body Type" />
                <Field name="color" label="Color" />
                <Field name="year" label="Year" type="number" />
                <Field name="engineCapacity" label="Engine Capacity (cc)" type="number" />
                <Field name="odometerReading" label="Odometer Reading" type="number" />
                <Field name="seatingCapacity" label="Seating Capacity" type="number" />
                <Select name="vehicleType" label="Vehicle Type" options={['ELECTRIC','SUV','TRUCK','MOTORCYCLE','BUS','VAN','PICKUP','OTHER']} />
                <Select name="fuelType" label="Fuel Type" options={['PETROL','DIESEL','ELECTRIC','HYBRID','GAS','OTHER']} />
                <Select name="vehiclePurpose" label="Purpose" options={['PERSONAL','COMMERCIAL','TAXI','GOVERNMENT']} />
                <Select name="vehicleStatus" label="Status" options={['NEW','USED','REBUILT']} />
              </div>
            )}

            {/* Step 2 - Owner Info */}
            {step === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field name="ownerName" label="Owner Name" />
                <Field name="address" label="Address" />
                <Field name="nationalId" label="National ID (16 digits)" />
                <Field name="mobile" label="Mobile Number (10 digits)" />
                <Field name="email" label="Email" type="email" />
                <Select name="ownerType" label="Owner Type" options={['INDIVIDUAL','COMPANY','NGO','GOVERNMENT']} />
                <Field name="companyRegNumber" label="Company Reg. Number (if COMPANY)" />
                <Field name="passportNumber" label="Passport Number (optional)" />
              </div>
            )}

            {/* Step 3 - Registration & Insurance */}
            {step === 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field name="plateNumber" label="Plate Number (e.g. RAB 123A)" />
                <Select name="plateType" label="Plate Type" options={['PRIVATE','COMMERCIAL','GOVERNMENT','DIPLOMATIC','PERSONALIZED']} />
                <Field name="registrationDate" label="Registration Date" type="date" />
                <Field name="expiryDate" label="Expiry Date" type="date" />
                <Select name="registrationStatus" label="Registration Status" options={['ACTIVE','SUSPENDED','EXPIRED','PENDING']} />
                <Field name="policyNumber" label="Policy Number" />
                <Field name="companyName" label="Insurance Company" />
                <Field name="insuranceType" label="Insurance Type" />
                <Field name="insuranceExpiryDate" label="Insurance Expiry Date" type="date" />
                <Select name="insuranceStatus" label="Insurance Status" options={['ACTIVE','SUSPENDED','EXPIRED']} />
                <Field name="roadworthyCert" label="Roadworthy Certificate" />
                <Field name="customsRef" label="Customs Reference" />
                <Field name="proofOfOwnership" label="Proof of Ownership" />
                <Field name="state" label="State" />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-2.5 rounded-lg border border-slate-300 text-slate-600 text-sm font-medium hover:bg-slate-50 transition"
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}

              <button
                type="submit"
                disabled={createMutation.isPending}
                className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {step < 2
                  ? 'Next →'
                  : createMutation.isPending
                  ? 'Submitting...'
                  : 'Submit Vehicle'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}