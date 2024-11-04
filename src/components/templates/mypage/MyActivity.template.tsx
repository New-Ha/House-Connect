import { ReactNode, useState } from 'react';

import { UserInfoType } from '@/hooks/useUserInfo';
import Avatar from '@/components/atoms/Avatar';
import Container from '@/components/atoms/Container';
import BadgeButton from '@/components/molecules/BadgeButton';
import Typography from '@/components/atoms/Typography';
import Link from '@/components/atoms/Link';
import Divider from '@/components/atoms/Divider';
import Icon from '@/components/atoms/Icon';
import Badge from '@/components/atoms/Badge';
import {
  genderInfo,
  houseTypesInfo,
  mateNumInfo,
  petInfo,
  rentalTypesInfo,
  smokingInfo,
} from '@/constants/profileDetailInfo';
import { generateUnitByPrice, generateUnitByTerm } from '@/libs/generateUnit';
import BadgeIcon from '@/components/molecules/BadgeIcon';
import Button from '@/components/atoms/Button';
import useModal from '@/hooks/useModal';
import { ProfileModifyModalState } from '@/types/modal.type';
import { routePaths } from '@/constants/route';
type MyActivityTemplateProps = {
  user: UserInfoType;
};

function BadgeContainer({
  children,
  className,
}: {
  children: ReactNode;
  // eslint-disable-next-line react/require-default-props
  className?: string;
}) {
  return (
    <Container.FlexRow
      className={`flex-wrap items-center gap-y-4 [&>div]:mr-2 [&>div]:rounded-[1.5625rem] [&>div]:px-4 [&>div]:py-[0.625rem] ${className} `}
    >
      {children}
    </Container.FlexRow>
  );
}

export default function MyActivityTemplate(props: MyActivityTemplateProps) {
  const { user } = props;
  const [currentTab, setCurrentTab] = useState(0);
  const tabItem = ['내가 쓴 게시글', '내가 쓴 댓글'];

  const { setModalState: setProfileModifyModal } = useModal('ProfileModify');

  const profileModifyContext: ProfileModifyModalState = {
    isOpen: true,
    type: 'ProfileModify',
    userInfo: {
      ...user.user_mate_style,
      ...user.user_lifestyle,
      ...user.user_looking_house,
      ...user,
    },
  };

  return (
    <Container.FlexCol className="gap-y-8">
      <Container.FlexRow className="gap-x-7">
        <Avatar.XXL src={user.avatar} />
        <Container.FlexCol className="gap-y-3 pt-[1.625rem]">
          <Container.FlexRow className="items-center gap-x-3">
            <Typography.SubTitle1 className="text-brown">
              {user.nickname}님
            </Typography.SubTitle1>
            <Link to={routePaths.myAccount}>
              <BadgeButton.Outline
                className="gap-x-[0.625rem] rounded-[1.875rem] px-4 py-[0.625rem]"
                iconType="next"
                iconClassName="h-[0.6875rem] w-[0.375rem]"
              >
                계정 설정
              </BadgeButton.Outline>
            </Link>
          </Container.FlexRow>
          <Typography.P3 className="text-brown1">@{user.name}</Typography.P3>
        </Container.FlexCol>
      </Container.FlexRow>
      <Divider.Col />
      <Container.FlexRow className="items-center gap-x-3">
        <Typography.SubTitle1 className="text-brown">
          내 프로필 카드
        </Typography.SubTitle1>
        <Button.Outline
          className="rounded-[30px] px-4 py-[0.625rem]"
          onClick={() => setProfileModifyModal(profileModifyContext)}
        >
          <Typography.Span1 className="text-brown">수정</Typography.Span1>
        </Button.Outline>
      </Container.FlexRow>
      <Container.FlexRow className="flex-1 gap-x-6 [&>div]:flex-1 [&>div]:rounded-[12px] [&>div]:bg-brown6 [&>div]:p-8">
        <Container.FlexCol className="flex-1 bg-brown6">
          <Container.FlexRow className="items-center gap-x-[1.25rem] pb-8">
            <Icon type="studio-officetel" />
            <Typography.SubTitle2 className="text-brown">
              내가 찾는 집
            </Typography.SubTitle2>
          </Container.FlexRow>
          <Container.FlexCol className="gap-y-5">
            <BadgeContainer>
              <Typography.P3 className="pr-[1.25rem] text-brown">
                유형
              </Typography.P3>
              <Badge.Outline
                className="mr-2"
                hover={false}
                active={false}
                focus={false}
              >
                <Typography.P2>
                  {houseTypesInfo[user.user_looking_house.type].text}
                </Typography.P2>
              </Badge.Outline>
              <Badge.Outline hover={false} active={false} focus={false}>
                <Typography.P2>
                  {rentalTypesInfo[user.user_looking_house.rental_type]}
                </Typography.P2>
              </Badge.Outline>
            </BadgeContainer>
            <BadgeContainer className="flex-wrap gap-y-4">
              <Typography.P3 className="pr-[1.25rem] text-brown">
                위치
              </Typography.P3>
              {user.user_looking_house.regions &&
                user.user_looking_house.regions.map(region => (
                  <Badge.Outline
                    key={region}
                    hover={false}
                    active={false}
                    focus={false}
                    className="mr-2"
                  >
                    <Typography.P2>{region}</Typography.P2>
                  </Badge.Outline>
                ))}
            </BadgeContainer>
            <BadgeContainer>
              <Typography.P3 className="pr-[1.25rem] text-brown">
                기간
              </Typography.P3>
              <Badge.Outline
                className="mr-2"
                hover={false}
                active={false}
                focus={false}
              >
                <Typography.P2>{`최소 ${generateUnitByTerm(user.user_looking_house.term[0], 25)}부터 최대 ${generateUnitByTerm(user.user_looking_house.term[1], 25)} 까지`}</Typography.P2>
              </Badge.Outline>
            </BadgeContainer>
          </Container.FlexCol>
          <Container.FlexRow className="items-center gap-x-[1.25rem] pb-6 pt-9">
            <Icon type="year-rental-price" />
            <Typography.SubTitle2 className="text-brown">
              가격대
            </Typography.SubTitle2>
          </Container.FlexRow>
          <BadgeContainer>
            <Typography.P3 className="pr-3 text-brown">보증금</Typography.P3>
            <Badge.Outline
              className="!mr-5"
              hover={false}
              active={false}
              focus={false}
            >
              <Typography.P2>{`${generateUnitByPrice(user.user_looking_house.deposit_price[0], 10001)} ~ ${generateUnitByPrice(user.user_looking_house.deposit_price[1], 10001)}`}</Typography.P2>
            </Badge.Outline>
            <Typography.P3 className="pr-4 text-brown">월세</Typography.P3>
            <Badge.Outline
              className="!mr-0"
              hover={false}
              active={false}
              focus={false}
            >
              <Typography.P2>{`${generateUnitByPrice(user.user_looking_house.monthly_rental_price[0], 501)} ~ ${generateUnitByPrice(user.user_looking_house.monthly_rental_price[1], 501)}`}</Typography.P2>
            </Badge.Outline>
          </BadgeContainer>
        </Container.FlexCol>
        <Container.FlexCol className="flex-1 bg-brown6">
          <Container.FlexRow className="items-center">
            <Typography.SubTitle2 className="text-brown">
              자기 소개
            </Typography.SubTitle2>
          </Container.FlexRow>
          <BadgeContainer className="pb-[3.25rem] pt-6">
            {/* TODO IconType 수정  */}
            <BadgeIcon.Outline iconType={genderInfo[user.gender].icon}>
              <Typography.P2>{genderInfo[user.gender].text}</Typography.P2>
            </BadgeIcon.Outline>
            <BadgeIcon.Outline
              iconType={
                smokingInfo[
                  JSON.stringify(user.user_lifestyle.smoking) as
                    | 'true'
                    | 'false'
                ].icon
              }
            >
              <Typography.P2>
                {
                  smokingInfo[
                    JSON.stringify(user.user_lifestyle.smoking) as
                      | 'true'
                      | 'false'
                  ].text
                }
              </Typography.P2>
            </BadgeIcon.Outline>
            <BadgeIcon.Outline iconType={petInfo[user.user_lifestyle.pet].icon}>
              <Typography.P2>
                {petInfo[user.user_lifestyle.pet].text}
              </Typography.P2>
            </BadgeIcon.Outline>
          </BadgeContainer>
          <Container.FlexRow>
            <Container.FlexCol className="gap-y-5">
              <Typography.SubTitle2 className="text-brown">
                나의 라이프스타일
              </Typography.SubTitle2>
              <BadgeContainer className="pb-[3.25rem]">
                {user.user_lifestyle.appeals &&
                  user.user_lifestyle.appeals.map(value => (
                    <Badge.Outline
                      key={value}
                      hover={false}
                      active={false}
                      focus={false}
                    >
                      <Typography.P2>{value}</Typography.P2>
                    </Badge.Outline>
                  ))}
              </BadgeContainer>
            </Container.FlexCol>
          </Container.FlexRow>
          <Container.FlexRow>
            <Container.FlexCol>
              <Typography.SubTitle2 className="pb-5 text-brown">
                내가 원하는 룸메이트
              </Typography.SubTitle2>
              <BadgeContainer className="pb-4">
                <BadgeIcon.Outline
                  iconType={mateNumInfo[user.user_mate_style.mate_number].icon}
                >
                  <Typography.P2>
                    {mateNumInfo[user.user_mate_style.mate_number].text}
                  </Typography.P2>
                </BadgeIcon.Outline>
                <BadgeIcon.Outline
                  iconType={genderInfo[user.user_mate_style.mate_gender].icon}
                >
                  <Typography.P2>
                    {genderInfo[user.user_mate_style.mate_gender].text}
                  </Typography.P2>
                </BadgeIcon.Outline>
              </BadgeContainer>
              <BadgeContainer>
                {user.user_mate_style.mate_appeals &&
                  user.user_mate_style.mate_appeals.map(value => (
                    <Badge.Outline
                      key={value}
                      hover={false}
                      active={false}
                      focus={false}
                    >
                      <Typography.P2>{value}</Typography.P2>
                    </Badge.Outline>
                  ))}
              </BadgeContainer>
            </Container.FlexCol>
          </Container.FlexRow>
        </Container.FlexCol>
      </Container.FlexRow>
      <Container.FlexCol>
        <Container.FlexRow>
          {tabItem.map((item, index) => (
            <Button.Ghost
              key={item}
              className={`h-14 w-[11.25rem] items-center justify-center border-b-brown text-brown2 ${currentTab === index ? 'border-b-3 text-brown' : ''}`}
              onClick={() => setCurrentTab(index)}
            >
              <Typography.SubTitle1>{item}</Typography.SubTitle1>
            </Button.Ghost>
          ))}
        </Container.FlexRow>
        <Typography.SubTitle1 className="pb-[1.5625rem] pl-5 pt-[2.3125rem] text-brown">
          서비스 준비중 입니다.
        </Typography.SubTitle1>
        <Divider.Col />
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
