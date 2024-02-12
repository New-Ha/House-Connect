type UserEndpointSType = {
  user: string;
  user_send_friend: string;
  user_theme: string;
  user_profile: string;
  user_block: string;
  user_house_status: string;
  user_bookmark: string;
};

const userEndpoints: UserEndpointSType = {
  user: '/user/:userId',
  user_send_friend: '/user/send_friend',
  user_theme: '/user/theme/:user_id',
  user_profile: '/user/profile/:user_id',
  user_block: '/user/block',
  user_house_status: '/user/house_status/:user_id',
  user_bookmark: '/user/bookmark',
};

export { userEndpoints };
