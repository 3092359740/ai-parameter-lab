import { useState, useRef, useEffect } from 'react';
import { Send, Trash2, Scale, Sparkles, Loader2 } from 'lucide-react';
import { generateResponse } from '../utils/ai';

function ChatInterface({ model, params, messages, onAddMessage, onAddToComparison, onReset }) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const prompt = input.trim();
    setInput('');
    const userMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: prompt,
      params: { ...params },
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    };
    onAddMessage(userMessage);
    setIsLoading(true);

    try {
      const response = await generateResponse(prompt, model, params);
      const assistantMessage = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        role: 'assistant',
        content: response,
        params: { ...params },
        prompt,
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      };
      onAddMessage(assistantMessage);
    } catch (err) {
      const errorMessage = {
        id: `${Date.now()}-error`,
        role: 'assistant',
        content: `生成失败：${err.message}`,
        params: { ...params },
        prompt,
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        isError: true,
      };
      onAddMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const assistantMessages = messages.filter((m) => m.role === 'assistant');
  const userPrompts = messages.filter((m) => m.role === 'user');

  // Pair user prompts with assistant responses by index
  const pairs = [];
  const maxLen = Math.max(userPrompts.length, assistantMessages.length);
  for (let i = 0; i < maxLen; i++) {
    pairs.push({
      user: userPrompts[i],
      assistant: assistantMessages[i],
    });
  }

  return (
    <div className="panel flex flex-col h-[600px]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary-600" />
          单参数实验
        </h2>
        <button
          onClick={onReset}
          className="btn-secondary text-sm"
        >
          <Trash2 className="w-4 h-4 mr-1.5" />
          清空对话
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-5 pr-2 mb-4">
        {pairs.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-slate-400">
            <Sparkles className="w-12 h-12 mb-3 opacity-30" />
            <p className="text-sm">输入提示词，开始参数调优实验</p>
            <p className="text-xs mt-1">调整左侧参数，观察生成结果的变化</p>
          </div>
        )}

        {pairs.map((pair, idx) => (
          <div key={idx} className="space-y-3">
            {pair.user && (
              <div className="flex justify-end">
                <div className="max-w-[80%] bg-primary-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm">
                  {pair.user.content}
                </div>
              </div>
            )}
            {pair.assistant && (
              <div className="flex justify-start">
                <div className="max-w-[90%] w-full bg-slate-100 border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-slate-500">Assistant</span>
                    <span className="text-xs text-slate-400">{pair.assistant.timestamp}</span>
                  </div>
                  <div className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                    {pair.assistant.content}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 bg-white rounded border border-slate-200 text-slate-600">
                      T={pair.assistant.params.temperature}
                    </span>
                    <span className="text-xs px-2 py-1 bg-white rounded border border-slate-200 text-slate-600">
                      topP={pair.assistant.params.topP}
                    </span>
                    <span className="text-xs px-2 py-1 bg-white rounded border border-slate-200 text-slate-600">
                      max={pair.assistant.params.maxTokens}
                    </span>
                    <button
                      onClick={() => onAddToComparison(pair.assistant)}
                      className="text-xs px-2 py-1 bg-primary-50 hover:bg-primary-100 text-primary-700 rounded border border-primary-200 transition-colors flex items-center gap-1"
                    >
                      <Scale className="w-3 h-3" />
                      加入对比
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-primary-600" />
              <span className="text-sm text-slate-600">AI 正在生成...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入提示词，例如：写一首关于人工智能的诗..."
          className="input-field flex-1"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="btn-primary"
        >
          <Send className="w-4 h-4 mr-1.5" />
          发送
        </button>
      </form>
    </div>
  );
}

export default ChatInterface;
