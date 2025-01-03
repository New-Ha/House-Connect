const routePaths = {
  root: '/',
  about: '/about',
  chat: '/chat',
  chatRoom: (chatRoomId?: string) =>
    chatRoomId ? `/chat/${chatRoomId}` : '/chat/:chatRoomId',
  lounge: '/lounge',
  house: '/house',
  houseRegister: '/house/regist',
  houseEdit: (houseId?: string) =>
    houseId ? `/house/edit/${houseId}` : '/house/edit/:houseId',
  houseDetail: (houseId?: string) =>
    houseId ? `/house/${houseId}` : '/house/:houseId',
  sign: '/sign',
  signIn: '/sign/in',
  signUp: '/sign/up',
  signUpInfo: '/sign/up/info',
  signPasswordReset: '/sign/password',
  signUpdatePassword: '/sign/update-password',
  signUpProfileIntro: '/signup-intro',
  signUpProfile: '/signup-profile',
  signUpProfileOutro: '/signup-outro',
  componentTest: '/component-test',
  myPage: '/mypage',
  myActivity: '/mypage/activity',
  myActivityComments: '/mypage/activity/comments',
  myActivityHouses: '/mypage/activity/houses',
  myBookmark: '/mypage/bookmark',
  myBookmarkHouses: '/mypage/bookmark/houses',
  myBookmarkLounges: '/mypage/bookmark/lounges',
  myBookmarkPosts: '/mypage/bookmark/posts',
  myAccount: '/mypage/account',
  myMate: '/mypage/mate',
  myAlarm: '/mypage/alarm',
  myTheme: '/mypage/theme',
  notFound: '*',
} as const;

const routeHeaderInfo: {
  [key in keyof typeof routePaths | 'default']: {
    logo: boolean;
    gnb: boolean;
    userMenu: boolean;
    isGNBExistBottomUnderSTablet?: boolean;
    isHeaderExistUnderSTablet?: boolean;
  };
} = {
  default: {
    logo: true,
    gnb: true,
    userMenu: true,
  },
  root: {
    logo: true,
    gnb: true,
    userMenu: true,
    isHeaderExistUnderSTablet: true,
    isGNBExistBottomUnderSTablet: true,
  },
  about: {
    logo: true,
    gnb: true,
    userMenu: true,
  },
  chat: {
    logo: true,
    gnb: true,
    userMenu: true,
    isGNBExistBottomUnderSTablet: true,
  },
  chatRoom: {
    logo: true,
    gnb: true,
    userMenu: true,
  },
  lounge: {
    logo: true,
    gnb: true,
    userMenu: true,
    isGNBExistBottomUnderSTablet: true,
  },
  house: {
    logo: true,
    gnb: true,
    userMenu: true,
    isHeaderExistUnderSTablet: true,
    isGNBExistBottomUnderSTablet: true,
  },
  houseRegister: {
    logo: true,
    gnb: true,
    userMenu: true,
  },
  houseEdit: {
    logo: true,
    gnb: true,
    userMenu: true,
  },
  houseDetail: {
    logo: true,
    gnb: true,
    userMenu: true,
  },
  sign: {
    logo: true,
    gnb: false,
    userMenu: false,
    isHeaderExistUnderSTablet: true,
  },
  signIn: {
    logo: true,
    gnb: false,
    userMenu: false,
    isHeaderExistUnderSTablet: true,
  },
  signUp: {
    logo: true,
    gnb: false,
    userMenu: false,
    isHeaderExistUnderSTablet: true,
  },
  signUpInfo: {
    logo: true,
    gnb: false,
    userMenu: false,
    isHeaderExistUnderSTablet: true,
  },
  signPasswordReset: {
    logo: true,
    gnb: false,
    userMenu: false,
    isHeaderExistUnderSTablet: true,
  },
  signUpdatePassword: {
    logo: true,
    gnb: false,
    userMenu: false,
    isHeaderExistUnderSTablet: true,
  },
  signUpProfileIntro: {
    logo: true,
    gnb: false,
    userMenu: false,
    isHeaderExistUnderSTablet: true,
  },
  signUpProfile: {
    logo: true,
    gnb: false,
    userMenu: false,
    isHeaderExistUnderSTablet: true,
  },
  signUpProfileOutro: {
    logo: true,
    gnb: false,
    userMenu: false,
    isHeaderExistUnderSTablet: true,
  },
  componentTest: {
    logo: true,
    gnb: true,
    userMenu: true,
  },
  myPage: {
    logo: true,
    gnb: true,
    userMenu: true,
  },
  myActivity: {
    logo: true,
    gnb: true,
    userMenu: true,
    isHeaderExistUnderSTablet: true,
  },
  myActivityComments: {
    logo: true,
    gnb: true,
    userMenu: true,
    isHeaderExistUnderSTablet: true,
  },
  myActivityHouses: {
    logo: true,
    gnb: true,
    userMenu: true,
    isHeaderExistUnderSTablet: true,
  },
  myBookmark: {
    logo: true,
    gnb: true,
    userMenu: true,
    isHeaderExistUnderSTablet: true,
  },
  myBookmarkHouses: {
    logo: true,
    gnb: true,
    userMenu: true,
    isHeaderExistUnderSTablet: true,
  },
  myBookmarkLounges: {
    logo: true,
    gnb: true,
    userMenu: true,
    isHeaderExistUnderSTablet: true,
  },
  myBookmarkPosts: {
    logo: true,
    gnb: true,
    userMenu: true,
    isHeaderExistUnderSTablet: true,
  },
  myAccount: {
    logo: true,
    gnb: true,
    userMenu: true,
    isHeaderExistUnderSTablet: true,
  },
  myMate: {
    logo: true,
    gnb: true,
    userMenu: true,
    isHeaderExistUnderSTablet: true,
  },
  myAlarm: {
    logo: true,
    gnb: true,
    userMenu: true,
    isHeaderExistUnderSTablet: true,
  },
  myTheme: {
    logo: true,
    gnb: true,
    userMenu: true,
    isHeaderExistUnderSTablet: true,
  },
  notFound: {
    logo: true,
    gnb: true,
    userMenu: true,
  },
} as const;

export { routePaths, routeHeaderInfo };
