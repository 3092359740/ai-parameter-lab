import { useState } from 'react';
import { User, Edit2, Check, X, GraduationCap } from 'lucide-react';

function Header({ studentInfo, onStudentInfoChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(studentInfo);

  const handleSave = () => {
    if (draft.id.trim() && draft.name.trim()) {
      onStudentInfoChange(draft);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setDraft(studentInfo);
    setIsEditing(false);
  };

  return (
    <header className="bg-gradient-to-r from-primary-900 to-primary-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur">
              <GraduationCap className="w-7 h-7 text-primary-100" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">AI Parameter Lab</h1>
              <p className="text-primary-100 text-xs">大模型参数调优实验室</p>
            </div>
          </div>

          {isEditing ? (
            <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center bg-white/10 p-3 rounded-lg backdrop-blur">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary-100" />
                <input
                  type="text"
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  placeholder="姓名"
                  className="px-2 py-1 bg-white text-slate-900 rounded text-sm w-24"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary-100 text-sm">学号</span>
                <input
                  type="text"
                  value={draft.id}
                  onChange={(e) => setDraft({ ...draft, id: e.target.value })}
                  placeholder="学号"
                  className="px-2 py-1 bg-white text-slate-900 rounded text-sm w-36"
                />
              </div>
              <div className="flex items-center gap-1">
                <button onClick={handleSave} className="p-1 hover:bg-white/20 rounded" title="保存">
                  <Check className="w-4 h-4 text-green-200" />
                </button>
                <button onClick={handleCancel} className="p-1 hover:bg-white/20 rounded" title="取消">
                  <X className="w-4 h-4 text-red-200" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-lg backdrop-blur">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary-100" />
                <span className="font-medium">{studentInfo.name}</span>
              </div>
              <div className="h-4 w-px bg-white/30" />
              <div className="text-sm text-primary-100">
                学号：<span className="font-mono text-white">{studentInfo.id}</span>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 hover:bg-white/20 rounded ml-1"
                title="编辑信息"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
