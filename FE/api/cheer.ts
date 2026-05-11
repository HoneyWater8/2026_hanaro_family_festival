/* ─────────────────────────────────────────────────────────
   응원 카운터 API (Vercel serverless)
   - GET  /api/cheer            → 모든 이모지 현재 카운트 반환
   - POST /api/cheer { from, to } → from 감소(0 미만 보정) + to 증가
   - Redis Cloud 인스턴스에 REDIS_URL 환경변수로 연결
   ───────────────────────────────────────────────────────── */

import { createClient } from 'redis';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const EMOJI_KEYS = ['pray', 'raised_hands', 'heart', 'thumbs_up', 'party'] as const;
type EmojiKey = typeof EMOJI_KEYS[number];

const isValidEmoji = (s: unknown): s is EmojiKey =>
  typeof s === 'string' && (EMOJI_KEYS as readonly string[]).includes(s);

type RedisClient = ReturnType<typeof createClient>;

/** 매 요청마다 connect → 사용 → quit. Vercel serverless의 짧은 라이프사이클에 적합. */
async function withClient<T>(fn: (client: RedisClient) => Promise<T>): Promise<T> {
  const url = process.env.REDIS_URL;
  if (!url) throw new Error('REDIS_URL is not configured');
  const client = createClient({ url });
  client.on('error', (err) => {
    // eslint-disable-next-line no-console
    console.error('[redis] connection error', err);
  });
  await client.connect();
  try {
    return await fn(client);
  } finally {
    await client.quit().catch(() => { /* ignore */ });
  }
}

async function readAllCounts(client: RedisClient): Promise<Record<EmojiKey, number>> {
  const keys = EMOJI_KEYS.map((k) => `cheer:${k}`);
  const values = await client.mGet(keys);
  const counts = {} as Record<EmojiKey, number>;
  for (let i = 0; i < EMOJI_KEYS.length; i++) {
    counts[EMOJI_KEYS[i]] = Number(values[i] ?? 0);
  }
  return counts;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const counts = await withClient(readAllCounts);
      return res.status(200).json({ counts });
    }

    if (req.method === 'POST') {
      const body = (req.body ?? {}) as { from?: string | null; to?: string | null };
      const from = body.from ?? null;
      const to = body.to ?? null;

      if (from !== null && !isValidEmoji(from)) {
        return res.status(400).json({ error: 'Invalid `from`' });
      }
      if (to !== null && !isValidEmoji(to)) {
        return res.status(400).json({ error: 'Invalid `to`' });
      }
      if (from === to) {
        // No-op (취소/변경 둘 다 아님)
        const counts = await withClient(readAllCounts);
        return res.status(200).json({ counts });
      }

      const counts = await withClient(async (client) => {
        if (from) {
          const newVal = await client.decr(`cheer:${from}`);
          if (newVal < 0) {
            // 0 미만으로 떨어지면 보정 (방어적 — localStorage 비정상 등)
            await client.set(`cheer:${from}`, '0');
          }
        }
        if (to) {
          await client.incr(`cheer:${to}`);
        }
        return readAllCounts(client);
      });

      return res.status(200).json({ counts });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[/api/cheer]', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
