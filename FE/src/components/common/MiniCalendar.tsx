import { WL, FF } from '../../theme/tokens';

// 교회 컨텍스트 — 일요일은 "주일"의 약자 "주"로 표기.
const KOR_DAY_LABELS = ['주', '월', '화', '수', '목', '금', '토'] as const;
const EN_MONTHS = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
] as const;

type MiniCalendarProps = {
  year: number;
  /** 0-indexed (0=Jan, 5=Jun) */
  month: number;
  /** 1~31, 강조 표시할 날짜 */
  highlightDay: number;
};

/**
 * 정적 미니 달력. 한 달 그리드를 7×N 그리드로 렌더하고 highlightDay만 강조.
 * 인터랙션·이전/다음 달 네비게이션 없음 (초대장 표시용).
 */
export function MiniCalendar({ year, month, highlightDay }: MiniCalendarProps) {
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun ~ 6=Sat
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // 첫 주 앞쪽 빈 칸 + 1~daysInMonth + 마지막 주 뒤쪽 빈 칸 (7의 배수까지).
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div style={{ width: '100%' }}>
      {/* 월/연도 헤더 */}
      <div style={{
        fontFamily: FF.bebas, fontSize: 11, letterSpacing: 3,
        color: WL.ink, opacity: 0.65,
        textAlign: 'center', marginBottom: 8,
      }}>
        {EN_MONTHS[month]} {year}
      </div>

      {/* 요일 라벨 */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2,
        marginBottom: 4,
      }}>
        {KOR_DAY_LABELS.map((d, i) => {
          // 일요일은 살짝 붉게, 토요일은 살짝 푸르게 (한국 달력 관습).
          const color =
            i === 0 ? '#C8453E' :
            i === 6 ? WL.ocean :
            WL.ink;
          return (
            <div key={i} style={{
              textAlign: 'center',
              fontFamily: FF.sans, fontSize: 10, fontWeight: 600,
              color, opacity: 0.7,
            }}>
              {d}
            </div>
          );
        })}
      </div>

      {/* 날짜 그리드 */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2,
      }}>
        {cells.map((d, i) => {
          if (d === null) return <div key={i} />;
          const isHighlight = d === highlightDay;
          const dayOfWeek = i % 7;
          // 강조 셀은 배경 우선, 그 외엔 요일별 색상.
          const textColor = isHighlight
            ? WL.paper
            : dayOfWeek === 0 ? '#C8453E'
            : dayOfWeek === 6 ? WL.ocean
            : WL.ink;
          return (
            <div key={i} style={{
              aspectRatio: '1 / 1',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: FF.sans, fontSize: isHighlight ? 20 : 11,
              fontWeight: isHighlight ? 800 : 500,
              color: textColor,
              background: isHighlight ? WL.ocean : 'transparent',
              borderRadius: '50%',
              opacity: isHighlight ? 1 : 0.9,
              boxShadow: isHighlight ? `0 2px 6px ${WL.ocean}55` : 'none',
            }}>
              {d}
            </div>
          );
        })}
      </div>
    </div>
  );
}
