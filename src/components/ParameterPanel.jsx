import { Sliders, RotateCcw, BookOpen } from 'lucide-react';
import { PARAM_RANGES } from '../utils/ai';

function ParameterPanel({ params, onParamsChange }) {
  const handleChange = (key, value) => {
    onParamsChange({ ...params, [key]: value });
  };

  const resetParams = () => {
    onParamsChange({
      temperature: 0.7,
      topP: 0.9,
      maxTokens: 256,
      frequencyPenalty: 0,
      presencePenalty: 0,
    });
  };

  const presets = [
    { name: '创意写作', params: { temperature: 1.0, topP: 1.0, maxTokens: 512, frequencyPenalty: 0.3, presencePenalty: 0.3 } },
    { name: '代码生成', params: { temperature: 0.2, topP: 0.1, maxTokens: 512, frequencyPenalty: 0, presencePenalty: 0 } },
    { name: '精确问答', params: { temperature: 0.1, topP: 0.1, maxTokens: 256, frequencyPenalty: 0, presencePenalty: 0 } },
  ];

  const applyPreset = (preset) => {
    onParamsChange(preset.params);
  };

  return (
    <div className="panel">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Sliders className="w-5 h-5 text-primary-600" />
          参数调优
        </h2>
        <button
          onClick={resetParams}
          className="p-1.5 text-slate-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          title="重置参数"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2 text-xs text-slate-600">
          <BookOpen className="w-4 h-4" />
          <span className="font-medium">快速预设</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className="px-2.5 py-1 text-xs font-medium bg-slate-100 hover:bg-primary-100 text-slate-700 hover:text-primary-700 rounded-md transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        {PARAM_RANGES.map((param) => (
          <div key={param.key}>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                {param.label}
              </label>
              <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                {params[param.key]}
              </span>
            </div>
            <input
              type="range"
              min={param.min}
              max={param.max}
              step={param.step}
              value={params[param.key]}
              onChange={(e) => handleChange(param.key, Number(e.target.value))}
              className="slider"
            />
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{param.hint}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100">
        <div className="text-xs text-slate-500 space-y-1">
          <p><strong>Temperature:</strong> 控制输出随机性</p>
          <p><strong>Top-p:</strong> 核采样阈值</p>
          <p><strong>Max Tokens:</strong> 最大生成长度</p>
          <p><strong>Penalty:</strong> 抑制重复与主题偏离</p>
        </div>
      </div>
    </div>
  );
}

export default ParameterPanel;
