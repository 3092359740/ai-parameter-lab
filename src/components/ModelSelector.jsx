import { Bot, Cpu, Wifi, WifiOff } from 'lucide-react';
import { MODELS } from '../utils/ai';

function ModelSelector({ model, onModelChange }) {
  const selected = MODELS.find((m) => m.id === model) || MODELS[0];

  return (
    <div className="panel">
      <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
        <Bot className="w-5 h-5 text-primary-600" />
        模型选择
      </h2>

      <div className="space-y-3">
        {MODELS.map((m) => (
          <label
            key={m.id}
            className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
              model === m.id
                ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <input
              type="radio"
              name="model"
              value={m.id}
              checked={model === m.id}
              onChange={() => onModelChange(m.id)}
              className="mt-1 accent-primary-600"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm text-slate-900">{m.name}</span>
                {m.mock ? (
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                    <WifiOff className="w-3 h-3" />
                    本地模拟
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                    <Wifi className="w-3 h-3" />
                    API
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">{m.description}</p>
            </div>
          </label>
        ))}
      </div>

      <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
        <div className="flex items-center gap-2 text-xs text-slate-600 mb-1">
          <Cpu className="w-4 h-4" />
          <span className="font-medium">当前模型</span>
        </div>
        <p className="text-sm font-medium text-primary-700">{selected.name}</p>
        <p className="text-xs text-slate-500 mt-1">{selected.description}</p>
      </div>
    </div>
  );
}

export default ModelSelector;
