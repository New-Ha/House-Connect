import { z } from 'zod';

import { district } from '@/constants/regions';
import { Entries } from '@/types/common.type';

const regions = (Object.entries(district) as Entries<typeof district>).flatMap(
  ([key, value]) => value.map(region => `${key} ${region}` as const),
);

export type RegionUnion = (typeof regions)[number];

// ! Original이 있는 이유는 refine을 사용하여 appealInputValue와 appeals를 검증
// ! 하지만 refine을 사용한 인스턴스는 ZodEffect로 변환되어 Omit을 사용할 수 없다.
// ! Atom에서 사용하기 위해Omit을 사용하여 appealsInputValue와 mateAppealsInputValue 을 제거하여야 함
// ! 따라서 분리하여 refine이 있는 객체와 없는 객체를 별도 생성
// ! (Zod4 에서 변경 예정)[https://github.com/colinhacks/zod/issues/2474#issuecomment-2040299950]
const SignUpProfileFormOriginal = z.object({
  /**
   * ### 찾는 집 유형
   * - 0: 원룸/오피스텔
   * - 1: 빌라/연립
   * - 2: 아파트
   * - 3: 단독주택
   * - undefined: 지정되지 않음(초기값)
   */
  type: z
    .union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)])
    .optional()
    .refine(data => data !== undefined, {
      message: '집 유형을 선택해주세요.',
    }),
  /**
   * ### 집 대여 유형
   * - 0: 상관없음
   * - 1: 월세
   * - 2: 전세
   * - 3: 반 전세
   * - undefined: 지정되지 않음(초기값)
   */
  rental_type: z
    .union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)])
    .optional()
    .refine(data => data !== undefined, {
      message: '임대 형태를 선택해주세요.',
    }),
  /**
   * ### 유저가 찾는 지역
   * - `${region} ${district}`의 배열형태
   *
   * [
   *  `${region} ${district}`,
   *  `${region} ${district}`,
   * ]
   * ```
   */
  regions: z
    .array(z.enum(regions as [RegionUnion]))
    .min(1, { message: '위치를 선택해주세요.' })
    .max(3, { message: '위치는 최대 3개까지 선택 가능합니다.' })
    .refine(region => new Set(region).size === region.length, {
      message: '중복된 지역을 선택하셨습니다.',
    }),
  /**
   * ### 유저가 살 기간
   * - tuple => [number, number]
   * ```
   * [
   *  minTerm, // 최소 기간(0 ~ 24)
   *  maxTerm, // 최대 기간(0 ~ 24)
   * ]
   * ```
   */
  term: z
    .tuple(
      [
        z
          .number()
          .min(0, { message: '최소값은 0개월 입니다.' })
          .max(25, { message: '최대값은 2년 이상 입니다.' }),
        z
          .number()
          .min(0, { message: '최소값은 0개월 입니다.' })
          .max(25, { message: '최대값은 2년 이상 입니다.' }),
      ],
      { required_error: '최소 기간 및 최대 기간을 선택해주세요.' },
    )
    .refine(data => data[0] <= data[1], {
      message: '최소 기간이 최대 기간보다 클 수 없습니다.',
    }),
  /**
   * ### 보증금 (전세 혹은 월세) 범위
   * - tuple => [number, number]
   * ```
   * [
   *  minPrice, // 최소 금액(0만원 ~ 10000만원)
   *  maxPrice, // 최대 금액(0만원 ~ 10000만원),
   * ]
   * ```
   */
  deposit_price: z
    .tuple(
      [
        z
          .number()
          .min(0, { message: '최소값은 0원 입니다.' })
          .max(10100, { message: '최대값은 1억원 이상 입니다.' }),
        z
          .number()
          .min(0, { message: '최소값은 0원 입니다.' })
          .max(10100, { message: '최대값은 1억원 이상 입니다.' }),
      ],
      { required_error: '보증금의 최소 가격 및 최대 가격을 선택해주세요.' },
    )
    .refine(data => data[0] <= data[1], {
      message: '월세의 최소 가격이 최대 가격보다 클 수 없습니다.',
    }),
  /**
   * ### 월세
   * - tuple => [number, number]
   * ```
   * [
   *  minPrice, // 최소 금액(0만원 ~ 500만원)
   *  maxPrice, // 최대 금액(0만원 ~ 500만원),
   * ]
   * ```
   */
  // ! 월세의 정의가 잘못되어 filter의 modal에서 오류가 발생해 submit event가 동작을 하지 않음
  monthly_rental_price: z
    .tuple(
      [
        z
          .number()
          .min(0, { message: '최소값은 0원 입니다.' })
          .max(510, { message: '최대값은 500만원 이상 입니다.' }),
        z
          .number()
          .min(0, { message: '최소값은 0원 입니다.' })
          .max(510, { message: '최대값은 500만원 이상 입니다.' }),
      ],
      { required_error: '월세의 최소 가격 및 최대 가격을 선택해주세요.' },
    )
    .refine(data => data[0] <= data[1], {
      message: '월세의 최소 가격이 최대 가격보다 클 수 없습니다.',
    }),
  /**
   * ### 흡연 여부
   * - true: 흡연함
   * - false: 흡연하지 않음
   * - undefined: 지정되지 않음(초기값)
   */
  smoking: z
    .boolean()
    .optional()
    .refine(data => data !== undefined, {
      message: '흡연 여부를 선택해주세요.',
    }),
  /**
   * ### 반려동물 여부
   * - 0: 상관없음
   * - 1: 좋음
   * - 2: 싫음
   * - undefined: 지정되지 않음(초기값)
   */
  pet: z
    .union([z.literal(0), z.literal(1), z.literal(2)])
    .optional()
    .refine(data => data !== undefined, {
      message: '반려동물 여부를 선택해주세요.',
    }),
  appealsInputValue: z.union([
    z.string().min(3, { message: '3글자 이상이어야 합니다.' }),
    z.literal(''),
  ]),
  /**
   * ### 유저가 상대방에게 어필하고 싶은 내용
   * ```
   * [
   *  '어필 내용1',
   *  '어필 내용2',
   *   ...
   * ]
   * ```
   */
  appeals: z
    .array(z.string(), { required_error: '어필을 입력해주세요.' })
    .min(3, { message: '최소 3개의 어필을 작성해주세요.' }),
  /**
   * ### 원하는 상대방의 성별
   * - 0: 상관없음
   * - 1: 남성
   * - 2: 여성
   * - undefined: 지정되지 않음(초기값)
   */
  mate_gender: z
    .union([z.literal(0), z.literal(1), z.literal(2)])
    .optional()
    .refine(data => data !== undefined, {
      message: '성별을 선택해주세요.',
    }),
  /**
   * ### 원하는 메이트 인원 수
   * - 0: 상관없음
   * - 1: 1명
   * - 2: 2명
   * - 3: 3명이상
   * - undefined: 지정되지 않음(초기값)
   */
  mate_number: z
    .union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)])
    .optional()
    .refine(data => data !== undefined, {
      message: '인원 수를 선택해주세요.',
    }),
  /**
   * ### 상대방에게 원하는 조건의 입력 폼
   * string 3글자 이상
   */
  mateAppealsInputValue: z.union([
    z.string().min(3, { message: '3글자 이상이어야 합니다.' }),
    z.literal(''),
  ]),
  /**
   * ### 유저가 상대방에게 원하는 조건 내용
   * 최소 3개
   * ```
   * [
   *  '원하는 조건1',
   *  '원하는 조건2',
   *   ...
   * ]
   * ```
   */
  mate_appeals: z
    .array(z.string())
    .min(3, { message: '최소 3개의 어필을 작성해주세요.' }),
});

export const SignUpProfileForm = SignUpProfileFormOriginal.refine(
  data => !data.appeals.includes(data.appealsInputValue),
  {
    message: '이미 등록된 어필입니다.',
    path: ['appealsInputValue'],
  },
).refine(data => !data.mate_appeals.includes(data.mateAppealsInputValue), {
  message: '이미 등록된 어필입니다.',
  path: ['mateAppealsInputValue'],
});

export type SignUpProfileFormType = z.infer<typeof SignUpProfileForm>;

/**
 * Recoil Atom 전용 인스턴스
 *
 * Form에서 검증 시 사용되는 mateAppealsInputValue, appealsInputValue 제거
 * 실제 활용이 되는 데이터만 남겨둔 타입
 */
const SignUpProfile = SignUpProfileFormOriginal.omit({
  appealsInputValue: true,
  mateAppealsInputValue: true,
});
export type SignUpProfileType = z.infer<typeof SignUpProfile>;
