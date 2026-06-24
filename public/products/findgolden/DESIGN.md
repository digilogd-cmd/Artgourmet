# 🎨 Design System: Where's My Goldie? (Google Stitch Guideline)

이 디자인 명세서는 Google Stitch의 `DESIGN.md` 표준을 따르며, 게임의 시각적 일관성과 프리미엄 UI 디자인 품질을 규정합니다.

---

## 🎨 1. Color Palette (색상 시스템)

* **Primary (골디 옐로우):** `#f59e0b` (기본) / `#fbbf24` (호버) / `#d97706` (쉐도우)
  * 용도: 브랜드 아이덴티티, 주동작 버튼, 타겟(골디) 강조, 최고기록 알림.
* **Secondary (일렉트릭 블루):** `#3b82f6` (기본) / `#60a5fa` (하이라이트)
  * 용도: 지도 연결선, 보조 버튼, 컨트롤 바 정보.
* **Danger (네온 코랄/레드):** `#ef4444` (기본) / `#f43f5e` (피해)
  * 용도: 기회(하트), 남은 시간 경고, 오답 오버레이.
* **Success (사이버 민트):** `#10b981` (기본) / `#34d399` (성공)
  * 용도: 클리어 알림, 최고 기록 달성 축하.
* **Backgrounds (딥 슬레이트 & 인디고):**
  * 메인 그라데이션: `linear-gradient(135deg, #0b0f19 0%, #111827 50%, #1e1b4b 100%)`
  * 서브 패널 배경: `rgba(15, 23, 42, 0.55)`

---

## 💎 2. UI Styling (Glassmorphism 규격)

브라우저 내 몰입감을 주기 위한 프리미엄 반투명 유리 효과 가이드입니다.

* **배경색 (Background):** `rgba(255, 255, 255, 0.06)` 또는 `rgba(15, 23, 42, 0.6)`
* **블러 수치 (Backdrop Filter):** `blur(20px) saturate(120%)`
* **테두리 (Border):** `1px solid rgba(255, 255, 255, 0.12)`
* **그림자 (Box Shadow):** `0 12px 40px 0 rgba(0, 0, 0, 0.45)`
* **테두리 반경 (Border Radius):** 
  * 메인 컨테이너: `28px`
  * 패널 및 카드: `18px`
  * 버튼 및 HUD: `12px`

---

## ✍️ 3. Typography (타이포그래피)

* **헤드라인 & 타이틀 (Headings):** `'Jua', sans-serif`
  * 크고 친근한 한글 폰트로 캐주얼하고 신나는 게임성을 극대화합니다.
* **인터페이스 & 텍스트 (UI/Body):** `'Inter', -apple-system, sans-serif`
  * 가독성이 뛰어나고 직관적인 디지털 서체.

---

## 🎞️ 4. Micro-interactions & Motion (마이크로 인터랙션)

사용자 경험을 고급스럽게 만들어주는 부드러운 애니메이션 및 피드백입니다.

1. **Shimmer Button (쉬머 버튼):**
   * 버튼 호버 시 밝은 빛이 한 차례 쓱 훑고 지나가며 클릭을 유도하는 리치 인터랙션.
2. **Backlight Stage Nodes (스테이지 백라이트):**
   * 해금된 스테이지 노드에 마우스를 올리면 뒤쪽에 부드러운 색상의 빛(Radial-gradient)이 서서히 켜지며 노드가 공중으로 떠오르는 3D 효과 (`translateY(-6px) scale(1.15)`).
3. **Pulsing Timer (시간 경고):**
   * 10초 이하일 때 타이머 숫자가 빨간색으로 바뀌며 크기가 맥박 뛰듯(Pulse) 연출되어 몰입감 제공.
4. **Goldie Celebration (리트리버 축하):**
   * 리트리버를 클릭했을 때 1.8배 커지며 귀엽게 꼬리를 좌우로 흔들고 튀어오르는 모션.
