# House-Connect 🏠
**국민 3명 중 1명은 ‘나 혼자 산다’는 사실, 알고 계셨나요?**

House-Connect는 나와 **라이프 스타일이 맞는 룸메이트**를 쉽게 찾을 수 있는 커뮤니티 서비스입니다.

경제적 부담을 줄이고, 마음 맞는 사람과 함께 살아가는 즐거움을 경험해보세요!

### 🧑🏻‍💻 프로젝트 실행 방법

```bash
$ git clone <https://github.com/New-Ha/House-Connect>
$ git checkout main
$ yarn install
$ yarn dev

```

### 👀 테스트 계정으로 배포된 애플리케이션을 사용해보실 수 있어요!

| 🔗 배포링크 🔗 | 🪪 테스트 계정 ID | 🗝️ 테스트 계정 PW |
| --- | --- | --- |
| https://house-connect.vercel.app/ | [houseconnect.test@gmail.com](mailto:houseconnect.test@gmail.com) | hchchc01! |

## 🔧 Skills
#### Frontend
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"> <img src="https://img.shields.io/badge/recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white"> <img src="https://img.shields.io/badge/reacthookform-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white"> <img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"> <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"> <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=Zod&logoColor=white">

#### Backend
<img src="https://img.shields.io/badge/supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white">

#### Tools
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">  <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">  <img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white">  <img src="https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=jira&logoColor=white">  <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
  
---
  
## 🎯 주요 역할 및 기여
### **House Register Page 개발: 게시글 CRUD**
- **React-Hook-Form**과 **Zod**를 사용하여 데이터 유효성을 실시간 검증하고, 입력값의 상호 의존성을 체크.
- **React-Query**의 `useMutation`을 사용하여 게시글 등록 및 수정 로직 구현 및 Prefetch 및 API 호출 최소화.
- 2단계 Carousel Form 구조로 검증된 입력값만 제출할 수 있도록 UX 개선.
- 임시 저장 기능으로 사용자가 작성 중인 데이터를 유지하도록 지원.

> 관련 PR 참조
> - [[Merge] Hc-70-feat-house-regist to HC-67-UI](https://github.com/house-mate-connect/house-connect/pull/31)
> - [[Merge] HC-69-react-hook-form-zod-house-regist to dev](https://github.com/house-mate-connect/house-connect/pull/52)
> - [[Merge] HC-70-feat-house-register-page To dev](https://github.com/house-mate-connect/house-connect/pull/65)

### **이미지 업로드 및 관리**
- **Supabase Storage**를 활용하여 사용자 id와 게시글 id 기반으로 이미지를 효율적으로 관리.
- 대표 사진을 설정할 수 있는 라디오 버튼과 이미지 미리보기 기능을 추가.
- Supabase의 `move()`, `upload()`, `remove()` 메서드를 활용한 저장공간 최적화.

> 관련 PR 참조
> - [[Merge] Hc-68-multi-image-input to HC-67-UI](https://github.com/house-mate-connect/house-connect/pull/30)

### **Supabase를 활용한 데이터 스키마 설계**
<img src="https://github.com/user-attachments/assets/c9ed1427-75d0-4b38-997f-a35f5de9f92b" alt="data schema" width="800" />

- 데이터 스키마를 설계하며 SQL 기반 데이터베이스를 설계하여 사용자 정보, 게시글 데이터를 정규화된 구조로 정의.
- SQL 쿼리를 활용해 데이터를 효율적으로 조회하고 CRUD 작업을 수행하며 데이터 관리.

### **UI/UX 설계**
- Atomic Design Pattern 도입으로 재사용 가능한 UI 컴포넌트 설계.
- Tailwind CSS를 통해 반응형 디자인을 구현하여 다양한 디바이스에서 최적의 사용자 경험 제공.

### **리팩토링 및 코드 구조 개선**
- UI와 데이터 처리 로직을 분리해 컴포넌트 복잡도 감소 및 가독성과 유지보수성, 유연성을 개선.
- Suspense와 ErrorBoundary를 도입해 데이터 로딩 및 에러 처리를 간소화하고 로딩 중 사용자 경험 향상.

<br>

---

## 👉🏻 Main Project Github으로 [바로가기](https://github.com/HC-House-Connect/House-Connect)
프로젝트의 Main Github에서 자세한 모습과 전체 프로젝트 내용을 확인하실 수 있습니다!
