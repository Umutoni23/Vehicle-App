import { useState } from 'react';

export default function Tabs({ tabs }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Tab Headers */}
      <div className="flex gap-1 border-b border-slate-200 mb-6 overflow-x-auto">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-150 border-b-2 -mb-px
              ${active === i
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>{tabs[active].content}</div>
    </div>
  );
}