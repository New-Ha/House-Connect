# House-Connect 🏠
**국민 3명 중 1명은 ‘나 혼자 산다’는 사실, 알고 계셨나요?**

House-Connect는 나와 라이프 스타일이 맞는 룸메이트를 쉽게 찾을 수 있는 **룸메이트 매칭 커뮤니티 서비스**입니다.
1인 가구 비율이 증가하면서, 주거비 부담과 고립감 등 다양한 문제를 해결하고자 시작한 프로젝트로, 사용자들이 라이프 스타일에 맞는 룸메이트를 쉽게 찾고, 함께 살아갈 공간을 등록하거나 탐색할 수 있는 플랫폼을 제공합니다.
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
![Group 68 (1)](https://github.com/user-attachments/assets/5e6bcf3f-0beb-4040-8327-4a3c90c59a35)
![Group 69 (1)](https://github.com/user-attachments/assets/a393b1c8-2b5d-4f8b-b80f-f1653c7cc48c)

> 관련 PR 참조
> - [[Merge] Hc-70-feat-house-regist to HC-67-UI](https://github.com/house-mate-connect/house-connect/pull/31)
> - [[Merge] HC-69-react-hook-form-zod-house-regist to dev](https://github.com/house-mate-connect/house-connect/pull/52)
> - [[Merge] HC-70-feat-house-register-page To dev](https://github.com/house-mate-connect/house-connect/pull/65)

### **이미지 업로드 및 관리**
![Group 66 (2)](https://github.com/user-attachments/assets/97751b42-2a96-415e-bcd8-58d1421f9fb6)

> 관련 PR 참조
> - [[Merge] Hc-68-multi-image-input to HC-67-UI](https://github.com/house-mate-connect/house-connect/pull/30)

### **데이터베이스 연동 및 트리거 활용**
<img src="https://github.com/user-attachments/assets/c9ed1427-75d0-4b38-997f-a35f5de9f92b" alt="data schema" width="800" />

- HouseRegister 페이지의 요구사항에 따라 **SQL 기반 데이터베이스를 설계**하고, 정규화된 구조로 스키마를 정의하였습니다.
- SQL 쿼리를 작성하여 데이터 조회 및 CRUD 작업을 수행하며, 데이터를 관리했습니다.
- 데이터의 일관성을 유지하기 위해 Supabase에서 **SQL 트리거를 구현**하여 업데이트 날짜를 자동으로 갱신하도록 설정해, 반복적인 코드 작성을 줄이고 데이터 관리 개선하였습니다.

> ## 💥 Trouble Shooting
> ### 문제 상황
>   데이터베이스의 `updated_at` 필드를 애플리케이션 코드에서 수동으로 갱신하던 중, 로직 누락으로 인해 데이터 변경 기록이 정확히 반영되지 않는 문제가 발생했습니다. 이는 데이터베이스 작업의 무결성과 일관성을 저해하는 주요 원인이고 데이터 관리의 신뢰성을 확보하기 어려워 지는 문제입니다.
> ### 해결 과정
>   - 데이터 변경 작업이 발생할 때마다 `updated_at` 필드가 자동으로 갱신되도록, 데이터베이스 레벨에서 로직을 처리하는 PostgreSQL 기반의 **Supabase Trigger**를 도입하였습니다.
>   - ```sql
>     -- updated_at을 설정하는 트리거 함수를 작성해 각 데이터베이스 테이블마다 연결해주었습니다.
>     CREATE OR REPLACE FUNCTION update_timestamp()
>     RETURNS TRIGGER AS $$
>     BEGIN
>       NEW.updated_at = NOW();
>       RETURN NEW;
>     END;
>     $$ LANGUAGE plpgsql;
>     ```
> ### 해결 결과
>   - 데이터 수정시마다 `updated_at` 필드가 트랜잭션 내부에서 자동으로 갱신되며, 데이터 변경 기록의 정확성과 일관성을 보장하게 되었습니다.
>   - 코드에서 불필요하게 반복되던 갱신 로직을 제거해 코드의 간결성과 유지보수성이 향상되었습니다.
> ### 배운 점
>   데이터베이스 트리거를 활용하면서, 애플리케이션 로직의 오류를 단순히 애플리케이션 코드에서만 해결하려는 접근이 아닌, 서버와 데이터베이스 레벨에서 로직을 처리함으로써 더 안정적이고 효과적으로 문제를 방지할 수 있다는 점을 배웠습니다. 특히, 데이터 변경 작업이 트랜잭션 내에서 실행되는 트리거의 특성을 활용하면 데이터 무결성과 일관성을 보장할 뿐 아니라, 애플리케이션 코드에서 발생할 수 있는 로직 누락이나 중복 구현 문제를 원천적으로 차단할 수 있음을 확인했습니다. 이를 통해 데이터베이스 중심 설계의 중요성과, 애플리케이션과 데이터베이스 간 역할 분담의 최적화를 통한 시스템 신뢰성 향상의 필요성을 이해할 수 있었습니다.
> #### 👉🏻 자세한 내용은 블로그([데이터 무결성을 위한 Supabase Trigger 설정](https://velog.io/@https00200/HC-supabase-trigger))로 확인하실 수 있습니다. 

### **UI/UX 설계 및 반응형 구현**
![Group 59 (1)](https://github.com/user-attachments/assets/da384d2e-bc69-4b91-9062-9890d87d8520)

### **리팩토링 및 코드 구조 개선**
<img width="1074" alt="스크린샷 2024-12-30 오후 12 39 40" src="https://github.com/user-attachments/assets/c20919e8-d50a-47f9-88d7-ba4af0ab0b68" />

- HouseRegister.tsx에 포함된 **195줄의 비즈니스 로직**을 리팩토링하여 UI와 데이터 처리 로직을 **분리**함으로써 컴포넌트의 **단일 책임 원칙**을 준수하고 복잡도를 감소시켰습니다.
- HouseRegister.tsx는 임시 저장 데이터를 확인 및 모달 처리의 역할만 담당하며, 조건에 따라 HouseRegisterEdit 또는 HouseRegisterForm 컴포넌트를 반환하도록 설계하였습니다.
- 임시 저장 데이터를 이어쓰기 또는 기존 게시글을 수정하는 경우, HouseRegisterEdit에서 데이터베이스로부터 데이터를 Fetch하여 폼 객체의 초기값으로 설정하고 이를 HouseRegisterForm에 전달하도록 구현하였습니다.
- 모든 폼 관련 로직과 상태 관리는 HouseRegisterForm 컴포넌트에서 집중적으로 처리하여 코드의 가독성과 유지보수성을 향상시키고, 컴포넌트 간 명확한 역할 분리를 달성하였습니다.
  
```tsx
// 📍 HouseRegister.tsx
export default function HouseRegister() {
  const { houseId } = useParams<{ houseId: string }>();

  const form = useForm<HouseFormType & UserLifeStyleType & UserMateStyleType>({
    resolver: zodResolver(HouseForm),
    mode: 'onChange',
    defaultValues: {
      // 하우스 데이터 기본 값 설정
    },
  });

  useEffect(() => {
    const checkTemporaryHouse = async () => {
      if (!houseId) {
        // 임시 저장 게시글이 있는 지 확인합니다.
        const result = await fetchTemporaryHouseId(userId);
        if (result) {
          // 임시 저장 글이 있으면 모달을 띄웁니다.
          // 이어쓰기 선택시 Edit으로 navigate합니다.
          // 취소 선택시 임시저장된 게시글을 삭제합니다.
          });
        }
      }
    };
    checkTemporaryHouse();
  }, [userId, houseId, navigate]);

  if (houseId) {
    // houseId가 있다면 form설정과 함께 Edit으로 전달합니다.
    return <HouseRegisterEdit form={form} houseId={houseId} />;
  }

  return <HouseRegisterForm form={form} />;
}

// ----------------------------------------------------------------//

// 📍 HouseRegisterEdit.tsx
function HouseRegisterEditPageComponent({
  form,
  houseId,
}: HouseRegisterEditProps) {
  const housePostQueryOptions = housePostQuery(houseId);
  // props로 전달받은 houseId를 기반으로 데이터를 불러옵니다.
  const { data: housePost } = useSuspenseQuery(housePostQueryOptions);

  useEffect(() => {
    const fetchHouseData = () => {
      if (housePost) {
        // 불러온 데이터를 form객체의 기본값으로 설정합니다.
        form.reset(prev => ({
          ...prev,
          ...housePost,
        }));
      }
    };
    fetchHouseData();
  }, [form, houseId, housePost]);

  // 새로 설정한 form을 전달합니다.
  return <HouseRegisterForm form={form} />;
}

const HouseRegisterEdit = WithSuspenseAndErrorBoundary({
  InnerSuspenseComponent: HouseRegisterEditPageComponent,
});

export default HouseRegisterEdit;
```

<br>


## 🌈 추후 프로젝트 목표
- 프로젝트를 Next.js로 마이그레이션하여 서버 사이드 렌더링(SSR) 및 정적 사이트 생성(SSG)을 활용해 성능 최적화와 SEO 개선을 목표로 하고 있습니다. 
- 동시에 React Native를 도입하여 웹과 별도로 모바일 애플리케이션 버전을 분리 개발함으로써 멀티플랫폼 환경에서의 사용자 경험(UX)을 극대화할 계획입니다. 

---

## Main Project Github
프로젝트의 Main Github에서 전체 프로젝트 내용을 확인하실 수 있습니다!
### [👉🏻 version_01 GitHub Repository](https://github.com/house-mate-connect/house-connect)
### [👉🏻 version_02 GitHub Repository 🌟](https://github.com/HC-House-Connect/House-Connect)

