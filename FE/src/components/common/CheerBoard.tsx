import { memo, useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { WL, FF } from '../../theme/tokens';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const EMOJIS = [
  { key: 'pray',         char: '🙏', color: '#F59E0B' },
  { key: 'raised_hands', char: '🙌', color: '#F472B6' },
  { key: 'heart',        char: '❤️', color: '#EF4444' },
  { key: 'thumbs_up',    char: '👍', color: '#3B82F6' },
  { key: 'party',        char: '🎉', color: '#FBBF24' },
] as const;

type EmojiKey = typeof EMOJIS[number]['key'];
type Counts = Record<EmojiKey, number>;

const ZERO_COUNTS: Counts = {
  pray: 0, raised_hands: 0, heart: 0, thumbs_up: 0, party: 0,
};

// 마일스톤 — 행사일 6월 3일을 상징하는 603이 최종 클라이맥스.
// total은 603 초과해도 카운트는 계속됨. 진행 바만 100%로 캡.
const MILESTONES = [50, 100, 200, 300, 400, 500, 603] as const;
const FINAL_MILESTONE = 603;
const MILESTONE_MESSAGES: Record<number, string> = {
  50:  '🎉 50개 응원 도착!',
  100: '❤️ 100개! 마음이 모이고 있어요',
  200: '🙏 200개의 따뜻한 응원',
  300: '🙌 300개! 응원이 가득해요',
  400: '✨ 400개! 한마당이 가까워져요',
  500: '🎉 500개! 가족이 함께해요',
  603: '🎊 603개! 6월 3일 한마당에서 만나요',
};
const LABELED_MILESTONES = new Set<number>([50, 100, 200, 300, 400, 500, 603]);

type Float = {
  id: number;
  char: string;
  color: string;
  x: number;
  y: number;
  sway1: string;
  sway2: string;
  sway3: string;
  sway4: string;
};

type DeltaFloat = {
  id: number;
  color: string;
  delta: number;
  x: number;
  y: number;
};

const LS_KEY = 'hanaro_cheer_active';
const FLOAT_DURATION_MS = 2000;
const BADGE_SIZE = 44;
// 각 이모지 버튼당 cooldown — 연타 방지
const TAP_COOLDOWN_MS = 1000;
// 바 채움 속도 — 달성한 마일스톤 개수에 비례해 늘어남
const CELEBRATION_FILL_PER_MS = 800;
const CELEBRATION_FILL_MAX_MS = 5000;
// 토스트 간 최소 간격 (선형 채움상 50→100 같은 좁은 구간 보정)
const MIN_TOAST_STAGGER_MS = 350;
// 토스트 각각의 mount 지속시간 — 애니메이션 길이와 동일
const TOAST_DURATION_MS = 2800;
const FINAL_TOAST_DURATION_MS = 5000;
// 셀러브레이션 종료 후 라이브 카운트 업데이트용 짧은 transition
const POST_CELEBRATION_TRANSITION_MS = 800;

const isValidEmojiKey = (s: unknown): s is EmojiKey =>
  typeof s === 'string' && EMOJIS.some((e) => e.key === s);

function pickRandomSway(): string {
  const v = Math.round((Math.random() - 0.5) * 50);
  return `${v}px`;
}

export const CheerBoard = memo(function CheerBoard() {
  const reduced = usePrefersReducedMotion();

  const [counts, setCounts] = useState<Counts>(ZERO_COUNTS);
  // 다중 선택 — 5개 이모지 각각 독립적으로 on/off. localStorage에 JSON 배열로 저장.
  const [activeSet, setActiveSet] = useState<Set<EmojiKey>>(() => {
    if (typeof window === 'undefined') return new Set();
    const stored = window.localStorage.getItem(LS_KEY);
    if (!stored) return new Set();
    // 신규 포맷 — JSON 배열
    try {
      const arr = JSON.parse(stored);
      if (Array.isArray(arr)) return new Set(arr.filter(isValidEmojiKey));
    } catch {
      // 레거시 포맷 — 단일 키 문자열
      if (isValidEmojiKey(stored)) return new Set<EmojiKey>([stored]);
    }
    return new Set();
  });
  const [floats, setFloats] = useState<Float[]>([]);
  const [deltaFloats, setDeltaFloats] = useState<DeltaFloat[]>([]);
  // 버튼별 cooldown — ref로만 추적 (시각 변화 없음, 리렌더 없음)
  const cooldownRef = useRef<Set<EmojiKey>>(new Set());
  // 셀러브레이션 관련 state
  const [initialized, setInitialized] = useState(false);
  const [hasEnteredRsvp, setHasEnteredRsvp] = useState(false);
  // 마일스톤 토스트 큐 — 각 토스트가 독립 lifetime을 가지며 시간차를 두고 등장 → 위로 떠올라 stacking
  const [milestoneToasts, setMilestoneToasts] = useState<Array<{
    id: number;
    milestone: number;
    message: string;
    isFinal: boolean;
  }>>([]);
  // 진행 바 표시 진행도 (0 ~ 1). 셀러브레이션 시작 시 0 → 실제값으로 transition.
  const [displayProgress, setDisplayProgress] = useState(0);
  // 바 transition duration — 셀러브레이션 중 길게, 이후 라이브 업데이트용으로 짧게.
  const [progressTransitionMs, setProgressTransitionMs] = useState(POST_CELEBRATION_TRANSITION_MS);

  const nextFloatId = useRef(1);
  const nextDeltaId = useRef(1);
  const nextToastId = useRef(1);
  const celebrationInProgressRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Partial<Record<EmojiKey, HTMLButtonElement | null>>>({});
  const pendingPostsRef = useRef(0);
  const previousCountsRef = useRef<Counts>(ZERO_COUNTS);
  const initializedRef = useRef(false);
  // 세션당 1회만 재생되도록 — 새로고침해야 다시 봄.
  const hasShownCelebrationRef = useRef(false);
  // 라이브 마일스톤 크로싱 감지용 — 셀러브레이션 트리거 시점의 total을 baseline으로 시작.
  const previousTotalRef = useRef(0);
  // 마운트 해제 시 정리할 setTimeout id 목록.
  const celebrationTimersRef = useRef<number[]>([]);

  useEffect(() => {
    previousCountsRef.current = counts;
  }, [counts]);

  // 페이지 진입 시 서버 카운트 fetch
  useEffect(() => {
    let cancelled = false;
    fetch('/api/cheer')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data?.counts) {
          setCounts(data.counts);
          initializedRef.current = true;
          setInitialized(true);
        }
      })
      .catch(() => { /* 0으로 표시 */ });
    return () => { cancelled = true; };
  }, []);

  const addDeltaFloat = useCallback((emojiKey: EmojiKey, delta: number) => {
    const btn = buttonRefs.current[emojiKey];
    const container = containerRef.current;
    if (!btn || !container) return;
    const btnRect = btn.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const x = btnRect.left + btnRect.width / 2 - containerRect.left;
    const y = btnRect.top - containerRect.top - 4;
    const emoji = EMOJIS.find((e) => e.key === emojiKey);
    if (!emoji) return;
    const id = nextDeltaId.current++;
    setDeltaFloats((prev) => [...prev, { id, color: emoji.color, delta, x, y }]);
    setTimeout(() => {
      setDeltaFloats((prev) => prev.filter((f) => f.id !== id));
    }, 1600);
  }, []);

  // 폴링 — 2초마다 server 동기화 (delta 인디케이터 포함)
  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;
    const POLL_INTERVAL_MS = 2000;
    let pollId: ReturnType<typeof setInterval> | undefined;
    let cancelled = false;
    let inView = false;

    const fetchOnce = () => {
      if (cancelled) return;
      if (!inView) return;
      if (typeof document !== 'undefined' && document.visibilityState !== 'visible') return;
      if (pendingPostsRef.current > 0) return;
      fetch('/api/cheer')
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (cancelled) return;
          if (!data?.counts) return;
          if (pendingPostsRef.current > 0) return;
          const newCounts = data.counts as Counts;
          const prev = previousCountsRef.current;
          if (initializedRef.current) {
            for (const e of EMOJIS) {
              const d = (newCounts[e.key] ?? 0) - (prev[e.key] ?? 0);
              if (d !== 0) addDeltaFloat(e.key, d);
            }
          } else {
            initializedRef.current = true;
            setInitialized(true);
          }
          setCounts(newCounts);
        })
        .catch(() => { /* ignore */ });
    };

    const start = () => {
      if (pollId === undefined) pollId = setInterval(fetchOnce, POLL_INTERVAL_MS);
    };
    const stop = () => {
      if (pollId !== undefined) { clearInterval(pollId); pollId = undefined; }
    };

    const observer = new IntersectionObserver((entries) => {
      inView = entries[0]?.isIntersecting ?? false;
      if (inView) { start(); fetchOnce(); } else { stop(); }
    }, { threshold: 0.1 });
    observer.observe(target);

    const onVisibility = () => {
      if (document.visibilityState === 'visible' && inView) fetchOnce();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelled = true; stop(); observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [addDeltaFloat]);

  // 첫 진입 감지 — 한 번만 setHasEnteredRsvp.
  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        setHasEnteredRsvp(true);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // 마일스톤 셀러브레이션용 이모지 비 spawn
  const spawnRainEmoji = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const x = Math.random() * Math.max(0, containerRect.width - BADGE_SIZE);
    const y = containerRect.height - BADGE_SIZE - 20;
    const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    const id = nextFloatId.current++;
    const float: Float = {
      id,
      char: emoji.char,
      color: emoji.color,
      x, y,
      sway1: pickRandomSway(),
      sway2: pickRandomSway(),
      sway3: pickRandomSway(),
      sway4: pickRandomSway(),
    };
    setFloats((prev) => [...prev, float]);
    setTimeout(() => {
      setFloats((prev) => prev.filter((f) => f.id !== id));
    }, FLOAT_DURATION_MS + 100);
  }, []);

  // 바를 0 → fillPercent 선형으로 채우면서, 바가 각 마일스톤 마커를 지나는 순간 토스트 발사.
  // 토스트는 stacking 되며 위로 떠올라 페이드아웃.
  const playCelebrationSequence = useCallback((currentTotal: number) => {
    const achieved = (MILESTONES as readonly number[]).filter((m) => m <= currentTotal);
    if (achieved.length === 0) return;

    const toastSchedule = achieved;
    const fillMs = Math.min(achieved.length * CELEBRATION_FILL_PER_MS, CELEBRATION_FILL_MAX_MS);
    const actualFill = Math.min(currentTotal / FINAL_MILESTONE, 1);

    celebrationInProgressRef.current = true;

    // 바 채움 시작 — 선형 transition으로 0 → actualFill
    setProgressTransitionMs(fillMs);
    // 다음 tick에 displayProgress 변경 → CSS transition 발동
    const fillTid = window.setTimeout(() => setDisplayProgress(actualFill), 0);
    celebrationTimersRef.current.push(fillTid);

    // 각 마일스톤 토스트 시각: 바가 m 마커를 지나는 자연 시점. 최소 stagger 보장.
    let lastT = -Infinity;
    toastSchedule.forEach((m) => {
      let t = (m / currentTotal) * fillMs;
      if (t < lastT + MIN_TOAST_STAGGER_MS) t = lastT + MIN_TOAST_STAGGER_MS;
      lastT = t;

      const isFinal = m === FINAL_MILESTONE;
      const startTid = window.setTimeout(() => {
        const id = nextToastId.current++;
        setMilestoneToasts((prev) => [...prev, {
          id,
          milestone: m,
          message: MILESTONE_MESSAGES[m] ?? `🎉 ${m}개 달성!`,
          isFinal,
        }]);
        // 자동 제거 — 애니메이션이 끝나면 큐에서 빼냄
        const lifetime = isFinal ? FINAL_TOAST_DURATION_MS : TOAST_DURATION_MS;
        const endTid = window.setTimeout(() => {
          setMilestoneToasts((prev) => prev.filter((x) => x.id !== id));
        }, lifetime);
        celebrationTimersRef.current.push(endTid);

        // 이모지 비 — 603은 30개, 그 외는 10개
        const rainCount = isFinal ? 30 : 10;
        for (let j = 0; j < rainCount; j++) {
          const rainTid = window.setTimeout(() => spawnRainEmoji(), j * 70);
          celebrationTimersRef.current.push(rainTid);
        }
      }, t);
      celebrationTimersRef.current.push(startTid);
    });

    // 셀러브레이션 전체 종료 후 → transition 짧게 되돌려 라이브 카운트 업데이트에 대비
    const lastToastIsFinal = toastSchedule[toastSchedule.length - 1] === FINAL_MILESTONE;
    const lastToastLifetime = lastToastIsFinal ? FINAL_TOAST_DURATION_MS : TOAST_DURATION_MS;
    const totalMs = Math.max(fillMs, lastT + lastToastLifetime) + 100;
    const doneTid = window.setTimeout(() => {
      setProgressTransitionMs(POST_CELEBRATION_TRANSITION_MS);
      celebrationInProgressRef.current = false;
    }, totalMs);
    celebrationTimersRef.current.push(doneTid);
  }, [spawnRainEmoji]);

  // 트리거 — 첫 진입 + 초기화 시 1회. reduced motion이면 바만 즉시 채움 (토스트/이모지 비 생략).
  useEffect(() => {
    if (!hasEnteredRsvp || !initialized) return;
    if (hasShownCelebrationRef.current) return;
    hasShownCelebrationRef.current = true;
    const currentTotal = Object.values(counts).reduce((a, b) => a + b, 0);
    // 라이브 크로싱 감지의 baseline — 회고 시퀀스가 보여준 마일스톤을 라이브 재발사하지 않기 위함
    previousTotalRef.current = currentTotal;
    if (reduced) {
      setProgressTransitionMs(0);
      setDisplayProgress(Math.min(currentTotal / FINAL_MILESTONE, 1));
      return;
    }
    playCelebrationSequence(currentTotal);
  }, [hasEnteredRsvp, initialized, reduced, playCelebrationSequence, counts]);

  // 셀러브레이션 끝난 후 라이브 카운트 변경 → 바 동기화 (짧은 transition으로)
  useEffect(() => {
    if (!hasShownCelebrationRef.current) return;
    if (celebrationInProgressRef.current) return;
    const t = Object.values(counts).reduce((a, b) => a + b, 0);
    setDisplayProgress(Math.min(t / FINAL_MILESTONE, 1));
  }, [counts]);

  // 라이브 마일스톤 크로싱 감지 — 회고 시퀀스 종료 후 부터, 직전 total과 비교해 새로 넘은 마일스톤마다 토스트 + 이모지 비.
  // 회고 진행 중에는 baseline을 유지(prev 업데이트 안 함) → 진행 중 다른 사람 탭으로 넘긴 마일스톤은 종료 직후 catchup으로 표시됨.
  useEffect(() => {
    if (!hasShownCelebrationRef.current) return;
    if (celebrationInProgressRef.current) return;

    const currentTotal = Object.values(counts).reduce((a, b) => a + b, 0);
    const prev = previousTotalRef.current;

    if (currentTotal <= prev) {
      previousTotalRef.current = currentTotal;
      return;
    }

    const crossed = (MILESTONES as readonly number[]).filter((m) => prev < m && currentTotal >= m);
    previousTotalRef.current = currentTotal;
    if (crossed.length === 0) return;

    crossed.forEach((m, i) => {
      const isFinal = m === FINAL_MILESTONE;
      const delay = i * MIN_TOAST_STAGGER_MS;
      const startTid = window.setTimeout(() => {
        const id = nextToastId.current++;
        setMilestoneToasts((p) => [...p, {
          id,
          milestone: m,
          message: MILESTONE_MESSAGES[m] ?? `🎉 ${m}개 달성!`,
          isFinal,
        }]);
        const lifetime = isFinal ? FINAL_TOAST_DURATION_MS : TOAST_DURATION_MS;
        const endTid = window.setTimeout(() => {
          setMilestoneToasts((p) => p.filter((x) => x.id !== id));
        }, lifetime);
        celebrationTimersRef.current.push(endTid);

        const rainCount = isFinal ? 30 : 15;
        for (let j = 0; j < rainCount; j++) {
          const rainTid = window.setTimeout(() => spawnRainEmoji(), j * 70);
          celebrationTimersRef.current.push(rainTid);
        }
      }, delay);
      celebrationTimersRef.current.push(startTid);
    });
  }, [counts, spawnRainEmoji]);

  // 언마운트 시 모든 셀러브레이션 타이머 정리
  useEffect(() => {
    return () => {
      celebrationTimersRef.current.forEach((t) => window.clearTimeout(t));
      celebrationTimersRef.current = [];
    };
  }, []);

  const handleTap = useCallback((emojiKey: EmojiKey) => {
    // 버튼별 cooldown — 1초 내 재호출은 무시
    if (cooldownRef.current.has(emojiKey)) return;
    cooldownRef.current.add(emojiKey);
    window.setTimeout(() => {
      cooldownRef.current.delete(emojiKey);
    }, TAP_COOLDOWN_MS);

    setActiveSet((prevSet) => {
      const wasActive = prevSet.has(emojiKey);
      const nextSet = new Set(prevSet);
      if (wasActive) nextSet.delete(emojiKey);
      else nextSet.add(emojiKey);

      // 낙관적 카운트 업데이트
      setCounts((prev) => {
        const next = { ...prev };
        if (wasActive) next[emojiKey] = Math.max(0, next[emojiKey] - 1);
        else next[emojiKey] = (next[emojiKey] ?? 0) + 1;
        return next;
      });

      // localStorage — JSON 배열로 저장
      try {
        const arr = Array.from(nextSet);
        if (arr.length === 0) window.localStorage.removeItem(LS_KEY);
        else window.localStorage.setItem(LS_KEY, JSON.stringify(arr));
      } catch { /* ignore */ }

      // 추가일 때만 float 애니메이션
      if (!wasActive) {
        const btn = buttonRefs.current[emojiKey];
        const container = containerRef.current;
        if (btn && container) {
          const btnRect = btn.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const x = btnRect.left + btnRect.width / 2 - containerRect.left - BADGE_SIZE / 2;
          const y = btnRect.top + btnRect.height / 2 - containerRect.top - BADGE_SIZE / 2;
          const emoji = EMOJIS.find((e) => e.key === emojiKey);
          if (emoji) {
            const id = nextFloatId.current++;
            const float: Float = {
              id,
              char: emoji.char,
              color: emoji.color,
              x, y,
              sway1: pickRandomSway(),
              sway2: pickRandomSway(),
              sway3: pickRandomSway(),
              sway4: pickRandomSway(),
            };
            setFloats((prev) => [...prev, float]);
            setTimeout(() => {
              setFloats((prev) => prev.filter((f) => f.id !== id));
            }, FLOAT_DURATION_MS + 100);
          }
        }
      }

      // POST — 단일 이모지 add/remove (기존 API의 from/to 형태 그대로 사용)
      const from: EmojiKey | null = wasActive ? emojiKey : null;
      const to: EmojiKey | null = wasActive ? null : emojiKey;
      pendingPostsRef.current++;
      fetch('/api/cheer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to }),
      })
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => { if (data?.counts) setCounts(data.counts); })
        .catch(() => { /* 다음 poll에서 정정 */ })
        .finally(() => {
          pendingPostsRef.current = Math.max(0, pendingPostsRef.current - 1);
        });

      return nextSet;
    });
  }, []);

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {/* 합계 헤더 */}
      <div style={{
        fontFamily: FF.bebas, fontSize: 10, letterSpacing: 2.5,
        color: WL.ink, opacity: 0.7, marginBottom: 4,
      }}>
        지금까지 보낸 응원
      </div>
      <div style={{
        fontFamily: FF.bebas, fontSize: 32, letterSpacing: 1,
        color: WL.ink, marginBottom: 16, lineHeight: 1,
      }}>
        총 {total.toLocaleString()}개
      </div>

      {/* 진행 바 — 0 ~ 603. 트랙 10px + 흰 테두리 + sun→ocean 그라데이션 fill + 마커 글로우.
          좌우 padding으로 좌·우 끝 마커(50/603)가 컨테이너 안에 들어오도록 인셋. */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: 52,
        marginBottom: 20,
        paddingLeft: 14,
        paddingRight: 14,
      }}>
        {/* Track — fill을 자식으로 감싸 흰 테두리가 바 전체를 둘러쌈 */}
        <div style={{
          position: 'absolute',
          top: 11, left: 0, right: 0, height: 14,
          background: 'white',
          borderRadius: 999,
          border: '2px solid white',
          boxSizing: 'border-box',
          overflow: 'hidden',
          boxShadow: `0 2px 6px ${WL.ink}1a`,
        }}>
          {/* Fill — displayProgress 기반. sun(배경색)에서 ocean으로 자라남 */}
          <div style={{
            width: `${displayProgress * 100}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${WL.sun}, ${WL.ocean})`,
            transition: `width ${progressTransitionMs}ms linear`,
          }} />
        </div>
        {/* Markers + labels */}
        {(MILESTONES as readonly number[]).map((m) => {
          const pct = (m / FINAL_MILESTONE) * 100;
          const achieved = displayProgress * FINAL_MILESTONE >= m - 0.5;
          const isFinal = m === FINAL_MILESTONE;
          const size = isFinal ? 16 : 12;
          const showLabel = LABELED_MILESTONES.has(m);
          return (
            <div key={m}>
              <div style={{
                position: 'absolute',
                left: `${pct}%`,
                top: 18,
                transform: 'translate(-50%, -50%)',
                width: size,
                height: size,
                borderRadius: '50%',
                background: achieved ? WL.ocean : 'white',
                border: achieved ? 'none' : `1.5px solid ${WL.ink}33`,
                boxShadow: achieved
                  ? isFinal
                    ? `0 0 0 3px white, 0 0 0 4.5px ${WL.ocean}44, 0 6px 20px ${WL.ocean}aa`
                    : `0 0 0 2.5px white, 0 2px 8px ${WL.ocean}88`
                  : `0 1px 2px ${WL.ink}1a`,
                transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
              }} />
              {showLabel && (
                <div style={{
                  position: 'absolute',
                  left: `${pct}%`,
                  top: 36,
                  transform: 'translateX(-50%)',
                  fontFamily: FF.bebas,
                  fontSize: isFinal ? 11 : 10,
                  letterSpacing: 0.5,
                  color: achieved ? WL.ink : `${WL.ink}55`,
                  fontWeight: isFinal && achieved ? 700 : 400,
                  whiteSpace: 'nowrap',
                  transition: 'color 0.4s ease, font-weight 0.4s ease',
                }}>
                  {m}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* float / delta / pill / toast 오버레이 */}
      <div style={{
        position: 'absolute', inset: 0,
        pointerEvents: 'none', overflow: 'visible',
        zIndex: 5,
      }}>
        {floats.map((f) => (
          <div
            key={f.id}
            style={{
              position: 'absolute',
              left: `${f.x}px`,
              top: `${f.y}px`,
              animation: `wl-cheer-float ${FLOAT_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
              '--sway1': f.sway1,
              '--sway2': f.sway2,
              '--sway3': f.sway3,
              '--sway4': f.sway4,
            } as CSSProperties}
          >
            <div style={{
              width: BADGE_SIZE, height: BADGE_SIZE, borderRadius: '50%',
              background: f.color,
              border: '2.5px solid white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, lineHeight: 1,
              boxShadow: `0 6px 18px ${f.color}66`,
            }}>
              {f.char}
            </div>
          </div>
        ))}
        {deltaFloats.map((d) => (
          <div
            key={d.id}
            style={{
              position: 'absolute',
              left: `${d.x}px`,
              top: `${d.y}px`,
              animation: 'wl-cheer-delta 1.6s ease-out forwards',
              color: d.color,
              fontFamily: FF.bebas,
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 0.5,
              pointerEvents: 'none',
              textShadow: '0 2px 6px rgba(0,0,0,0.18)',
              whiteSpace: 'nowrap',
            }}
          >
            {d.delta > 0 ? `+${d.delta}` : `${d.delta}`}
          </div>
        ))}

        {/* 마일스톤 토스트 큐 — 시간차 등장 + 위로 떠올라 stacking. 603은 gold + 5초.
            top 음수로 CheerBoard 위쪽(설명/spacer 영역)에서 등장 → 바를 가리지 않음 */}
        {milestoneToasts.map((t) => (
          <div
            key={t.id}
            style={{
              position: 'absolute',
              top: '-18%',
              left: '50%',
              padding: t.isFinal ? '16px 24px' : '12px 20px',
              background: t.isFinal
                ? `linear-gradient(135deg, ${WL.sun}, ${WL.ocean})`
                : WL.ink,
              color: WL.paper,
              border: t.isFinal ? '2px solid white' : 'none',
              borderRadius: 12,
              fontFamily: FF.sans,
              fontSize: t.isFinal ? 15 : 13,
              fontWeight: 700,
              whiteSpace: 'nowrap',
              boxShadow: t.isFinal
                ? `0 14px 36px ${WL.sun}88`
                : `0 10px 24px ${WL.ink}55`,
              animation: `wl-cheer-milestone-toast ${t.isFinal ? FINAL_TOAST_DURATION_MS : TOAST_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
              pointerEvents: 'none',
              zIndex: t.isFinal ? 12 : 11,
              textAlign: 'center',
            }}
          >
            {t.message}
          </div>
        ))}
      </div>

      {/* 이모지 버튼 그리드 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 8,
        position: 'relative',
        zIndex: 1,
      }}>
        {EMOJIS.map(({ key, char, color }) => {
          const isActive = activeSet.has(key);
          return (
            <button
              key={key}
              ref={(el) => { buttonRefs.current[key] = el; }}
              onClick={() => handleTap(key)}
              aria-pressed={isActive}
              aria-label={`${key} 응원 ${isActive ? '취소' : '보내기'}`}
              style={{
                appearance: 'none',
                WebkitAppearance: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
                padding: '10px 4px',
                background: isActive ? color : WL.paper,
                border: `2px solid ${isActive ? 'white' : `${WL.ink}33`}`,
                borderRadius: 8,
                cursor: 'pointer',
                color: isActive ? WL.paper : WL.ink,
                fontFamily: FF.bebas,
                fontSize: 12,
                letterSpacing: 1,
                boxShadow: isActive ? `0 4px 14px ${color}66` : 'none',
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
                transition: 'background 0.2s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.2s ease, color 0.2s ease, transform 0.2s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.2s ease',
                fontWeight: 700,
                userSelect: 'none',
                WebkitUserSelect: 'none',
                outline: 'none',
              }}
            >
              <span style={{ fontSize: 26, lineHeight: 1 }}>{char}</span>
              <span style={{ marginTop: 2 }}>{(counts[key] ?? 0).toLocaleString()}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
});
