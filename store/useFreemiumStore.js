import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useFreemiumStore = create(
  persist(
    (set, get) => ({
      dailyUses: 0,
      lastUseDate: new Date().toDateString(),
      maxFreeUses: 3,
      isPremium: false,

      // Call this before launching a premium app
      checkAndUse: () => {
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
      },

      activatePremium: () => set({ isPremium: true }),
    }),
    {
      name: 'art-gourmet-freemium-storage', // unique name in localStorage
    }
  )
);
