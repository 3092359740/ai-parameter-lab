import { useState } from 'react';
import { Scale, X, Copy, Check } from 'lucide-react';

function ComparisonView({ comparison, onRemove, onClear }) {
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    });
  };

  if (comparison.length === 0) {
    return (
      <div className="panel h-[600px] flex flex-col items-center justify-center text-slate-400">
        <Scale className="w-12 h-12 mb-3 opacity-30" />
        <p className="text-sm">暂无对比数据</p>
        <p className="text-xs mt-1">在单参数实验中将结果加入对比，即可在此处并排比较</p>
      </div>
    );
  }

  return (
    <div className="panel">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Scale className="w-5 h-5 text-primary-600" />
          参数对比
        </h2>
        <button
          onClick={onClear}
          className="text-sm text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
        >
          清空对比
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {comparison.map((item) => (
          <div
            key={item.id}
            className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-white rounded border border-slate-200 text-slate-700">
                  T={item.params.temperature}
                </span>
                <span className="text-xs px-2 py-1 bg-white rounded border border-slate-200 text-slate-700">
                  topP={item.params.topP}
                </span>
                <span className="text-xs px-2 py-1 bg-white rounded border border-slate-200 text-slate-700">
                  max={item.params.maxTokens}
                </span>
                <span className="text-xs px-2 py-1 bg-white rounded border border-slate-200 text-slate-700">
                  fp={item.params.frequencyPenalty}
                </span>
                <span className="text-xs px-2 py-1 bg-white rounded border border-slate-200 text-slate-700">
                  pp={item.params.presencePenalty}
                </span>
              </div>
              <div className="flex items-center gap-1 ml-2">
                <button
                  onClick={() => copyToClipboard(item.content, item.id)}
                  className="p-1.5 text-slate-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  title="复制结果"
                >
                  {copied === item.id ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => onRemove(item.id)}
                  className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="移除"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mb-2 text-xs text-slate-500 font-medium">
              Prompt: {item.prompt}
            </div>
            <div className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed bg-white p-3 rounded-lg border border-slate-200 flex-1">
              {item.content}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-primary-50 rounded-lg border border-primary-100">
        <p className="text-xs text-primary-800">
          <strong>对比提示：</strong> 左侧参数相同时，可通过改变 Temperature / Top-p 等参数，直观观察模型输出的多样性、创造性与一致性差异。
        </p>
      </div>
    </div>
  );
}

export default ComparisonView;
