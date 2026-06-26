export const MODELS = [
  {
    id: 'mock-llm',
    name: '本地模拟 LLM',
    description: '无需 API Key，在浏览器本地模拟参数对生成结果的影响，适合演示与离线使用',
    mock: true,
  },
  {
    id: 'openai-gpt-4',
    name: 'OpenAI GPT-4',
    description: '配置 VITE_OPENAI_API_KEY 后调用 OpenAI GPT-4 接口',
    mock: false,
  },
  {
    id: 'openai-gpt-3.5',
    name: 'OpenAI GPT-3.5',
    description: '配置 VITE_OPENAI_API_KEY 后调用 OpenAI GPT-3.5 接口',
    mock: false,
  },
  {
    id: 'claude',
    name: 'Anthropic Claude',
    description: '配置 VITE_ANTHROPIC_API_KEY 后调用 Claude 接口',
    mock: false,
  },
];

export const DEFAULT_PARAMS = {
  temperature: 0.7,
  topP: 0.9,
  maxTokens: 256,
  frequencyPenalty: 0,
  presencePenalty: 0,
};

export const PARAM_RANGES = [
  {
    key: 'temperature',
    label: 'Temperature',
    min: 0,
    max: 2,
    step: 0.1,
    hint: '值越高，输出越随机、有创意；值越低，输出越确定、保守。',
  },
  {
    key: 'topP',
    label: 'Top-p',
    min: 0,
    max: 1,
    step: 0.05,
    hint: '核采样阈值。模型只从累积概率达到 top-p 的 token 中选择。',
  },
  {
    key: 'maxTokens',
    label: 'Max Tokens',
    min: 64,
    max: 2048,
    step: 64,
    hint: '限制模型生成的最大 token 数，控制响应长度。',
  },
  {
    key: 'frequencyPenalty',
    label: 'Frequency Penalty',
    min: -2,
    max: 2,
    step: 0.1,
    hint: '抑制重复出现的 token，正值可减少重复措辞。',
  },
  {
    key: 'presencePenalty',
    label: 'Presence Penalty',
    min: -2,
    max: 2,
    step: 0.1,
    hint: '抑制已出现过的主题或 token，正值可提升话题多样性。',
  },
];

const MOCK_TEMPLATES = {
  '写一首': (prompt, params) => {
    const t = params.temperature;
    const creative = t > 0.7;
    return `【模拟生成 | temperature=${t}】\n\n${creative ? '在数字的海洋里，意识如潮水般涨落。' : '人工智能正在改变世界。'}\n${creative ? '算法编织着光的纹理，数据涌动着未知的节奏。' : '它通过学习数据，完成各种任务。'}\n${creative ? '每一行代码都是通往未来的钥匙。' : '未来，AI 将在医疗、教育等领域发挥作用。'}\n\n——参数：temperature 越高，句式与意象越丰富多变。`;
  },
  '解释': (prompt, params) => {
    const t = params.temperature;
    return `【模拟生成 | temperature=${t}】\n\n${t < 0.4 ? '这是一个精确解释：' : '让我用一种生动的方式来解释：'}\n\n${prompt.replace('解释', '')} 涉及到多个层面。${t > 0.7 ? '它像一座冰山，表面简单，深处却涌动着复杂的联系。' : '它的核心概念包括定义、原理、应用与限制。'}\n\n参数：top-p=${params.topP} 控制候选词范围，max_tokens=${params.maxTokens} 限制输出长度。`;
  },
  default: (prompt, params) => {
    const t = params.temperature;
    return `【模拟生成 | temperature=${t}】\n\n关于「${prompt}」：\n\n${t > 0.8 ? '这是一个充满可能性的主题！' : '这是一个值得深入探讨的主题。'}\n${t > 0.8 ? '我们可以从不同角度发散思考，发现意想不到的连接。' : '我们可以从定义、场景、优势与风险四个方面来分析。'}\n\n——temperature=${t} 使输出呈现 ${t > 0.8 ? '更开放、更具想象力' : '更集中、更确定'} 的风格。`;
  },
};

function getMockResponse(prompt, params) {
  const key = Object.keys(MOCK_TEMPLATES).find((k) => prompt.includes(k));
  const template = key ? MOCK_TEMPLATES[key] : MOCK_TEMPLATES.default;
  let response = template(prompt, params);

  // Truncate to maxTokens roughly (approx 1 token ≈ 1 Chinese char or 4 English chars)
  const limit = Math.max(64, Math.floor(params.maxTokens * 0.8));
  if (response.length > limit) {
    response = response.slice(0, limit) + '…';
  }

  return response;
}

async function callOpenAI(prompt, model, params) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('未配置 VITE_OPENAI_API_KEY，请在 .env 文件中设置');
  }

  const modelName = model === 'openai-gpt-4' ? 'gpt-4' : 'gpt-3.5-turbo';
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: modelName,
      messages: [{ role: 'user', content: prompt }],
      temperature: params.temperature,
      top_p: params.topP,
      max_tokens: params.maxTokens,
      frequency_penalty: params.frequencyPenalty,
      presence_penalty: params.presencePenalty,
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error?.message || `OpenAI API 请求失败：${res.status}`);
  }

  const data = await res.json();
  return data.choices[0]?.message?.content || '（无返回内容）';
}

async function callClaude(prompt, params) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('未配置 VITE_ANTHROPIC_API_KEY，请在 .env 文件中设置');
  }

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-3-sonnet-20240229',
      max_tokens: params.maxTokens,
      temperature: params.temperature,
      top_p: params.topP,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error?.message || `Anthropic API 请求失败：${res.status}`);
  }

  const data = await res.json();
  return data.content?.[0]?.text || '（无返回内容）';
}

export async function generateResponse(prompt, model, params) {
  await new Promise((resolve) => setTimeout(resolve, 600 + Math.random() * 800));

  if (model === 'mock-llm') {
    return getMockResponse(prompt, params);
  }

  if (model.startsWith('openai')) {
    return callOpenAI(prompt, model, params);
  }

  if (model === 'claude') {
    return callClaude(prompt, params);
  }

  throw new Error('未知的模型类型');
}
