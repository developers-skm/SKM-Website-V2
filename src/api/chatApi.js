export async function sendChatMessage(message) {
  const res = await fetch('https://chatbot-worker.meowlovessyou.workers.dev/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    throw new Error('Failed to get chatbot response');
  }

  return await res.json();
}
