import { create } from 'zustand';

export const useProductStore = create((set) => ({
  // The dynamic product registry with bilingual descriptions
  products: [
    {
      id: 'somers-translator',
      name: 'Somers Live Translator',
      description: 'Real-time AI-powered translation tool for surrounding foreign languages. / 주변 언어를 실시간으로 감지하고 한국어로 번역하여 송출하는 AI 번역 솔루션.',
      type: 'utility',
      launchUrl: '/products/somers',
      thumbnail: '/assets/somers-preview.png', // Relates to public/assets/somers-preview.png
      isPremium: true
    },
    {
      id: 'bullet-dodge',
      name: 'Retro Cyber Avoid',
      description: 'A thrilling retro-arcade style bullet dodging game with level progression, pilot shield, and custom skins. / 레트로 아케이드 스타일의 긴장감 넘치는 총알 피하기 게임.',
      type: 'game',
      launchUrl: '/products/bullet-dodge',
      thumbnail: 'https://digilogd-cmd.github.io/bullet-dodge/default_lobby_banner.png',
      isPremium: true
    },
    {
      id: 'find-golden',
      name: 'Find Golden',
      description: 'Find the hidden golden retrievers in the cozy Seoul vibe. / 아늑한 서울의 감성 속에 숨어있는 귀여운 골든리트리버를 찾아내는 힐링 게임.',
      type: 'game',
      launchUrl: '/products/findgolden',
      thumbnail: '/assets/findgolden-thumb.png',
      isPremium: true
    }
  ],
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  removeProduct: (id) => set((state) => ({ products: state.products.filter(p => p.id !== id) })),
}));
