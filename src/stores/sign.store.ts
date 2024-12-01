import { atom, AtomEffect, RecoilState, selectorFamily } from 'recoil';

import { SignUpProfileType } from '@/types/signUp.type';

const signUpProfileKey = 'signUpProfile';

const persistSignUpProfile: AtomEffect<SignUpProfileType> = ({
  setSelf,
  onSet,
}) => {
  const tempSignUpProfileData = sessionStorage.getItem(signUpProfileKey);

  if (tempSignUpProfileData !== null)
    // @FIXME: 직렬화된 데이터에 value가 undefined인 property는 삭제되어 상태에 저장되지 않는 이슈 발생.
    setSelf(JSON.parse(tempSignUpProfileData));

  onSet((newValue, _, isReset) => {
    if (isReset) sessionStorage.removeItem(signUpProfileKey);
    else sessionStorage.setItem(signUpProfileKey, JSON.stringify(newValue));
  });
};

/**
 * `SignUpProfileState`은 atom으로 회원가입에 필요한 개인정보를 제외한 선호하는 프로필 옵션을 관리하는 state이다.
 * undefined는 초기값으로 사용자가 아직 선택하지 않았음을 의미.
 *
 * @type {RecoilState<SignUpProfileType>}
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

export const SignUpProfileState: RecoilState<SignUpProfileType> =
  atom<SignUpProfileType>({
    key: 'signUpProfileState',
    default: {
      type: undefined,
      rental_type: undefined,
      regions: [],
      deposit_price: [0, 10000],
      term: [0, 24],
      monthly_rental_price: [0, 500],
      smoking: undefined,
      pet: undefined,
      appeals: [],
      mate_gender: undefined,
      mate_number: undefined,
      mate_appeals: [],
    },
    effects: [persistSignUpProfile],
  });

export const SignupProfileStateSelector = selectorFamily({
  key: 'signupProfileStateSelector',
  get:
    <K extends keyof SignUpProfileType>(param: K) =>
    ({ get }) =>
      get(SignUpProfileState)[param],
  set:
    <K extends keyof SignUpProfileType>(param: K) =>
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
