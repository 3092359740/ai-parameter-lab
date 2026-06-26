import { useState, useEffect } from 'react';
import Header from './components/Header';
import ParameterPanel from './components/ParameterPanel';
import ChatInterface from './components/ChatInterface';
import ComparisonView from './components/ComparisonView';
import ModelSelector from './components/ModelSelector';
import { DEFAULT_PARAMS, MODELS } from './utils/ai';

function App() {
  const [studentInfo, setStudentInfo] = useState(() => {
    const saved = localStorage.getItem('aiLabStudentInfo');
    return saved ? JSON.parse(saved) : { id: '2024XXXXXX', name: '张三' };
  });

  const [params, setParams] = useState(DEFAULT_PARAMS);
  const [model, setModel] = useState(MODELS[0].id);
  const [messages, setMessages] = useState([]);
  const [comparison, setComparison] = useState([]);
  const [activeTab, setActiveTab] = useState('chat');

  useEffect(() => {
    localStorage.setItem('aiLabStudentInfo', JSON.stringify(studentInfo));
  }, [studentInfo]);

  const handleAddMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const handleAddToComparison = (message) => {
    setComparison((prev) => {
      if (prev.find((item) => item.id === message.id)) return prev;
      return [...prev, message].slice(-4);
    });
  };

  const handleRemoveFromComparison = (id) => {
    setComparison((prev) => prev.filter((item) => item.id !== id));
  };

  const resetChat = () => setMessages([]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        studentInfo={studentInfo}
        onStudentInfoChange={setStudentInfo}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside className="lg:col-span-3 space-y-6">
          <ModelSelector model={model} onModelChange={setModel} />
          <ParameterPanel params={params} onParamsChange={setParams} />
        </aside>

        <section className="lg:col-span-9 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-200">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'chat'
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              单参数实验
            </button>
            <button
              onClick={() => setActiveTab('compare')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'compare'
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              参数对比 {comparison.length > 0 && `(${comparison.length})`}
            </button>
          </div>

          {activeTab === 'chat' ? (
            <ChatInterface
              model={model}
              params={params}
              messages={messages}
              onAddMessage={handleAddMessage}
              onAddToComparison={handleAddToComparison}
              onReset={resetChat}
            />
          ) : (
            <ComparisonView
              comparison={comparison}
              onRemove={handleRemoveFromComparison}
              onClear={() => setComparison([])}
            />
          )}
        </section>
      </main>

      <footer className="text-center py-4 text-xs text-slate-500 border-t border-slate-200 bg-white">
        AI Parameter Lab · 大模型参数调优实验室 · Built with React + Vite
      </footer>
    </div>
  );
}

export default App;
