import { atom, AtomEffect, RecoilState, selectorFamily } from 'recoil';

import { SignUpProfileStateType } from '@/types/signUp.type';

const signUpProfileKey = 'signUpProfile';

const persistSignUpProfile: AtomEffect<SignUpProfileStateType> = ({
  setSelf,
  onSet,
}) => {
  const sessionSignUpProfileData = sessionStorage.getItem(signUpProfileKey);

  if (sessionSignUpProfileData !== null) {
    const parsedData = JSON.parse(sessionSignUpProfileData);
    const undefinedPreservedData = Object.entries(parsedData).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value === 'undefined' ? undefined : value,
      }),
      {},
    );

    setSelf(undefinedPreservedData as SignUpProfileStateType);
  }

  onSet((newValue, _, isReset) => {
    if (isReset) sessionStorage.removeItem(signUpProfileKey);
    else {
      // * JSON.stringify는 직렬화 시 undefined를 무시하므로, undefined를 'undefined'인 string type으로 변환하여 직렬화 함.
      const serializedWithUndefined = JSON.stringify(newValue, (_key, value) =>
        value === undefined ? 'undefined' : value,
      );
      sessionStorage.setItem(signUpProfileKey, serializedWithUndefined);
    }
  });
};

/**
 * `SignUpProfileState`은 atom으로 회원가입에 필요한 개인정보를 제외한 선호하는 프로필 옵션을 관리하는 state이다.
 * undefined는 초기값으로 사용자가 아직 선택하지 않았음을 의미.
 *
 * @type {RecoilState<SignUpProfileStateType>}
 *
 * @property { 0 | 1 | 2 | 3 | undefined } type - 집 유형 (0: 원룸/오피스텔, 1: 빌라/연립, 2: 아파트, 3: 단독주택)
 * @property { 0 | 1 | 2 | 3 | undefined } rental_type - 집 대여 유형 (0: 월세, 1: 전세, 2: 반 전세)
 * @property { string[] } regions - 사용자가 찾는 지역 (도시 + 구 형태의 배열)
 * @property { [number, number] } deposit_price - 보증금 범위 [최소 금액, 최대 금액] (단위: 만원)
 * @property { [number, number] } term - 유저가 살 기간 [최소기간, 최대 기간] (단위: 개월)
 * @property { [number, number] } monthly_rental_price - 월세 [최소 금액, 최대 금액] (단위: 만원)
 * @property { boolean | undefined } smoking - 흡연 여부
 * @property { 0 | 1 | 2 | undefined } pet - 펫 여부 (0: 상관없음, 1: 좋음, 2: 싫음)
 * @property { string[] } appeals - 유저의 어필할 매력 (배열 형태)
 * @property { 0 | 1 | 2 | undefined } gender - 성별 (0: 상관없음, 1: 남성, 2: 여성)
 * @property { number | undefined } mates_number - 원하는 메이트 인원 수
 * @property { string[] } mate_appeals - 유저가 원하는 상대방의 매력 (배열 형태)
 *
 * @effects persistSignUpProfile - session storage를 이용한 새로고침 시 state persistence
 */

export const SignUpProfileState: RecoilState<SignUpProfileStateType> =
  atom<SignUpProfileStateType>({
    key: 'signUpProfileState',
    default: {
      // user_looking_house
      type: undefined,
      rental_type: undefined,
      regions: [],
      deposit_price: [0, 10000],
      term: [0, 24],
      monthly_rental_price: [0, 500],
      // user_lifestyle
      smoking: undefined,
      pet: undefined,
      appeals: [],
      // user_mate_style
      mate_gender: undefined,
      mate_number: undefined,
      mate_appeals: [],
    },
    effects: [persistSignUpProfile],
  });

export const SignupProfileStateSelector = selectorFamily({
  key: 'signupProfileStateSelector',
  get:
    <K extends keyof SignUpProfileStateType>(param: K) =>
    ({ get }) =>
      get(SignUpProfileState)[param],
  set:
    <K extends keyof SignUpProfileStateType>(param: K) =>
    ({ set }, newValue) =>
      set(SignUpProfileState, prevState => ({
        ...prevState,
        [param]: newValue,
      })),
});

export const ShowVerificationAtom = atom({
  key: 'showVerificationAtom',
  default: false,
});
