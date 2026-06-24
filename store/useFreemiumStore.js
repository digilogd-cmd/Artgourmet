import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useFreemiumStore = create(
  persist(
    (set, get) => ({
      dailyUses: 0,
      lastUseDate: new Date().toDateString(),
      maxFreeUses: 3,
      isPremium: true, // 기본값 true로 설정하여 개발 테스트 지원

      // Call this before launching a premium app
      checkAndUse: () => {
        // [개발 환경 패치]: React 19 무한 리렌더링 루프를 방지하고 무제한 테스트를 위해 무조건 허용 리턴
        return { allowed: true, remaining: 'Unlimited' };

        /* === 아래 기존 한도 검증 로직은 안전하게 보존합니다 (언제든 복구 가능) ===
        const today = new Date().toDateString();
        const { dailyUses, lastUseDate, maxFreeUses, isPremium } = get();

        // Reset if it's a new day
        if (today !== lastUseDate) {
          set({ dailyUses: 1, lastUseDate: today });
          return { allowed: true, remaining: maxFreeUses - 1 };
        }

        if (isPremium || dailyUses < maxFreeUses) {
          set({ dailyUses: dailyUses + 1 });
          return { allowed: true, remaining: isPremium ? 'Unlimited' : maxFreeUses - dailyUses - 1 };
        }

        // Reached limit
        return { allowed: false, remaining: 0 };
        =================================================================== */
      },

      activatePremium: () => set({ isPremium: true }),
    }),
    {
      name: 'art-gourmet-freemium-storage', // unique name in localStorage
    }
  )
);
