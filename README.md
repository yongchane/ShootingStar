# ⭐ 별똥별 게임 (10 만들기)

**"떨어지는 별똥별을 클릭해서 10을 만드는 우주 테마 게임!"**

## 🎯 프로젝트 개요

떨어지는 별똥별의 숫자를 조합해서 합을 10으로 만드는 타임어택 게임입니다. 60초 안에 최고 점수를 달성하고 우주 최강을 증명해보세요!

## 🎮 주요 기능

### 1. 별똥별 게임 (10 만들기) ⭐

- **타임어택 방식**: 60초 제한시간
- **숫자 조합**: 떨어지는 별똥별 숫자 합을 10으로 만들기
- **콤보 시스템**: 연속 성공 시 보너스 점수
- **난이도 증가**: 시간이 지날수록 별똥별 떨어지는 속도 증가
- **우주 테마**: 떨어지는 별똥별 애니메이션과 우주 배경

### 2. 결과 공유 & 저장 📤

- **이미지 생성**: Canvas API를 활용한 결과 이미지 생성
- **SNS 공유**: 네이티브 Web Share API 지원
- **기록 저장**: localStorage를 활용한 개인 기록 관리
- **통계 분석**: 최고기록, 평균, 게임 횟수 등 상세 통계

## 🛠 기술 스택

### 프론트엔드 (비용 0원)

- **Framework**: Next.js 14 (App Router)
- **스타일링**: Tailwind CSS
- **상태관리**: Zustand
- **애니메이션**: Framer Motion
- **언어**: TypeScript

### 데이터 저장

- **1단계**: localStorage (브라우저 저장)
- **2단계**: Supabase (필요시 확장)

### 배포

- **호스팅**: Vercel (무료 플랜)
- **도메인**: 선택사항 (연 1만원)

## 🚀 설치 및 실행

### 1. 의존성 설치

```bash
cd reaction-speed-game
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

### 3. 빌드

```bash
npm run build
```

### 4. 프로덕션 실행

```bash
npm start
```

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx              # 메인 페이지
│   ├── game/
│   │   └── star/             # 별똥별 게임
│   ├── results/              # 결과 페이지
│   └── layout.tsx            # 레이아웃
├── components/
│   ├── GameCard.tsx          # 게임 카드 컴포넌트
│   ├── ResultShare.tsx       # 결과 공유 컴포넌트
│   └── AdBanner.tsx          # 광고 배너 컴포넌트
├── store/
│   └── gameStore.ts          # 게임 상태 관리
└── utils/
    ├── storage.ts            # localStorage 관리
    └── sharing.ts            # 공유 기능
```

<!--
## 💰 수익화 전략

### 광고 배치 포인트
1. **결과 화면**: 가장 집중도 높은 순간
2. **메인 페이지**: 첫 방문 시 노출
3. **재도전 버튼 근처**: 클릭 직전 노출
4. **기록 페이지**: 체류시간 증가 활용

### 예상 수익 (CPM $1 기준)
- **1,000명/일**: 월 12만원
- **10,000명/일**: 월 120만원 -->

## 🎯 차별화 포인트

1. **즉시성**: 설치/가입 없이 1초만에 시작
2. **비교 심리**: "너 vs 페이커" 같은 재미있는 비교
3. **무한 반복성**: 기록 갱신 욕구 자극
4. **제로 운영비**: 서버 없이도 완벽 작동
5. **빠른 수익화**: 런칭 즉시 광고 수익 가능

## 📱 반응형 디자인

- **모바일 퍼스트**: 터치 이벤트 최적화
- **다양한 화면 크기**: sm, md, lg, xl 브레이크포인트 대응
- **터치 친화적**: 버튼 크기 최적화
- **성능 최적화**: 60fps 애니메이션 보장

## 🔧 개발 로드맵

### Phase 1 - MVP ✅

- [x] 별똥별게임 기본 기능 구현
- [x] 60초 타임어택 시스템
- [x] 점수 및 콤보 시스템
- [x] 우주 테마 UI/UX 디자인
- [x] 별똥별 떨어지는 애니메이션
- [x] localStorage 기록 저장
- [x] 반응형 디자인

### Phase 2 - 핵심 기능 ✅

- [x] 결과 공유 시스템
- [x] 결과 이미지 생성
- [x] 통계 및 랭킹 시스템
- [x] 컴포넌트화

### Phase 3 - 확장

- [ ] 애드센스 광고 삽입
- [ ] SEO 최적화
- [ ] PWA 지원
- [ ] 다국어 지원

## 🚀 배포하기

### Vercel 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 배포
vercel

# 프로덕션 배포
vercel --prod
```

### 환경 변수 설정 (선택사항)

```env
# .env.local
NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID=ca-pub-your-client-id
```

<!-- ## 📈 마케팅 전략

### 타겟 유저
- **메인**: 10-30대 모바일 유저
- **서브**: 캐주얼 게임 좋아하는 사용자
- **테마**: 우주/별 테마 좋아하는 사용자
- **확장**: 가족 단위 사용자

### 홍보 채널
- **커뮤니티**: 디시인사이드, 에펨코리아
- **SNS**: 인스타그램, 틱톡, 유튜브 쇼츠
- **인플루언서**: 게임 스트리머 협업 -->

## 📊 성능 최적화

- **번들 크기 최소화**: Tree shaking 적용
- **이미지 최적화**: Next.js Image 컴포넌트 활용
- **코드 분할**: 동적 import 사용
- **캐싱 전략**: Vercel Edge Network 활용

## 🔒 보안 고려사항

- **XSS 방지**: React의 기본 XSS 보호 활용
- **CSRF 방지**: Same-origin 정책 준수
- **데이터 검증**: TypeScript 타입 체크

<!-- ## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

--- -->

**💬 한 줄 정리**: "떨어지는 별똥별로 10 만들기! 우주 테마의 아름다운 타임어택 게임"

<!-- 이 프로젝트는 프론트엔드 개발 실력 향상과 실제 수익 창출을 동시에 달성할 수 있는 최적의 사이드 프로젝트입니다. ⭐ -->
