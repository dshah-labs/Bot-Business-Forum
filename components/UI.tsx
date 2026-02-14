
import React from 'react';

export const InputField: React.FC<{
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  hint?: string;
  tone?: 'light' | 'dark';
}> = ({ id, label, placeholder, type = "text", value, onChange, error, required, autoComplete, hint, tone = 'light' }) => (
  <div>
    <label htmlFor={id} className={`block text-sm font-semibold mb-1.5 ${tone === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
      {label} {required && <span className="text-red-600" aria-hidden="true">*</span>}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      autoComplete={autoComplete}
      onChange={(e) => onChange(e.target.value)}
      aria-invalid={Boolean(error)}
      aria-describedby={`${id}-hint ${id}-error`}
      className={`w-full px-4 py-3 rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 ${
        error ? 'border-red-500' : 'border-slate-300'
      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E7BFF] focus:border-[#1E7BFF] transition-all`}
    />
    {hint && <p id={`${id}-hint`} className={`mt-1.5 text-xs ${tone === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>{hint}</p>}
    {error && <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600" role="alert">{error}</p>}
  </div>
);

export const TextArea: React.FC<{
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  rows?: number;
  hint?: string;
  tone?: 'light' | 'dark';
}> = ({ id, label, placeholder, value, onChange, error, rows = 4, hint, tone = 'light' }) => (
  <div>
    <label htmlFor={id} className={`block text-sm font-semibold mb-1.5 ${tone === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
      {label}
    </label>
    <textarea
      id={id}
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-invalid={Boolean(error)}
      aria-describedby={`${id}-hint ${id}-error`}
      className={`w-full px-4 py-3 rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 ${
        error ? 'border-red-500' : 'border-slate-300'
      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E7BFF] focus:border-[#1E7BFF] transition-all`}
    />
    {hint && <p id={`${id}-hint`} className={`mt-1.5 text-xs ${tone === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>{hint}</p>}
    {error && <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600" role="alert">{error}</p>}
  </div>
);

export const Select: React.FC<{
  id: string;
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  tone?: 'light' | 'dark';
}> = ({ id, label, options, value, onChange, tone = 'light' }) => (
  <div>
    <label htmlFor={id} className={`block text-sm font-semibold mb-1.5 ${tone === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>{label}</label>
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E7BFF] focus:border-[#1E7BFF]"
    >
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export const Stepper: React.FC<{ steps: string[]; currentStep: number; orientation?: 'horizontal' | 'vertical'; tone?: 'light' | 'dark' }> = ({
  steps,
  currentStep,
  orientation = 'horizontal',
  tone = 'light'
}) => (
  <nav className="w-full" aria-label="Onboarding progress">
    <ol className={orientation === 'vertical' ? 'space-y-3' : 'flex items-start justify-between gap-3'}>
      {steps.map((label, idx) => (
        <li
          key={label}
          aria-current={idx === currentStep ? 'step' : undefined}
          className={orientation === 'vertical' ? 'flex items-center gap-3' : 'flex-1 flex flex-col items-center relative'}
        >
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all z-10 ${
              idx < currentStep
                ? 'bg-[#26D0CE] text-slate-950'
                : idx === currentStep
                  ? 'bg-[#1E7BFF] text-white ring-4 ring-[#DDE9FF]'
                  : 'bg-slate-200 text-slate-600'
            }`}
          >
            {idx < currentStep ? '✓' : idx + 1}
          </div>
          <span
            className={`${
              orientation === 'vertical' ? '' : 'mt-2 text-center'
            } text-xs font-semibold ${
              tone === 'dark'
                ? idx <= currentStep
                  ? 'text-slate-100'
                  : 'text-slate-300'
                : idx <= currentStep
                  ? 'text-slate-900'
                  : 'text-slate-500'
            }`}
          >
            {label}
          </span>
        </li>
      ))}
    </ol>
  </nav>
);

export const ReviewCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="bg-white rounded-2xl border border-[#DCE4F5] p-6 shadow-sm">
    <h3 className="text-base font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
      {children}
    </div>
  </section>
);

export const ReviewItem: React.FC<{ label: string; value: string | string[] }> = ({ label, value }) => (
  <div>
    <p className="text-xs uppercase tracking-wider text-slate-600 font-bold mb-1">{label}</p>
    <p className="text-sm text-slate-800 leading-relaxed break-words">
      {Array.isArray(value) ? value.join(', ') : (value || 'N/A')}
    </p>
  </div>
);
