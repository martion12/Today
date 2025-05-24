exports.handler = async (event, context) => {
  // 设置CORS头
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // 处理OPTIONS请求（CORS预检）
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod === 'POST') {
    try {
      const praises = [
        "你今天真的很棒！",
        "你的努力让人敬佩！",
        "继续保持这种状态！",
        "你是最优秀的！",
        "你的坚持令人感动！",
        "你正在变得越来越好！"
      ];
      
      const randomPraise = praises[Math.floor(Math.random() * praises.length)];
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: randomPraise
        }),
      };
    } catch (error) {
      console.error('Error:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: '获取夸奖失败'
        }),
      };
    }
  }

  // GET请求用于测试
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Praise API正常工作',
        timestamp: new Date().toISOString()
      }),
    };
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: '方法不允许' }),
  };
}; 