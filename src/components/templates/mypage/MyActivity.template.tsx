import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
import { routePaths } from '@/constants/route';
import cn from '@/libs/cn';
import { IconType } from '@/types/icon.type';
import CommingSoon from '@/components/pages/maintenance/CommingSoon';

type MyActivityTemplateProps = {
  user: UserInfoType;
};

function HouseProfileInfoRow({
  className,
  labelStyle,
  labelName,
  items,
}: {
  // eslint-disable-next-line react/require-default-props
  className?: string;
  // eslint-disable-next-line react/require-default-props
  labelStyle?: string;
  labelName: string;
  items: {
    iconBadges?: { iconType: IconType; text: string }[];
    textBadges?: string[];
  };
}) {
  return (
    <Container.FlexRow
      className={cn('flex-wrap items-start gap-[1.54rem]', className)}
    >
      <Typography.P3
        className={cn(
          'translate-y-[50%] text-[1.23rem] text-brown',
          labelStyle,
        )}
      >
        {labelName}
      </Typography.P3>
      <Container.FlexCol>
        <Container.FlexRow className={cn('flex-1 flex-wrap gap-[0.615rem]')}>
          {items.iconBadges &&
            items.iconBadges.map(({ iconType, text }) => (
              <BadgeIcon.Outline
                className="min-h-[2.6rem]"
                key={`${iconType}-${text}`}
                iconType={iconType}
              >
                <Typography.P2>{text}</Typography.P2>
              </BadgeIcon.Outline>
            ))}
        </Container.FlexRow>
        <Container.FlexRow
          className={cn(
            'flex-1 flex-wrap gap-[0.615rem]',
            items.iconBadges && 'mt-[0.615rem]',
          )}
        >
          {items.textBadges &&
            items.textBadges.map(item => (
              <Badge.Outline
                className="rounded-full px-4 py-[0.625rem]"
                key={item}
                hover={false}
                active={false}
                focus={false}
              >
                <Typography.P2 className="leading-[120%]">{item}</Typography.P2>
              </Badge.Outline>
            ))}
        </Container.FlexRow>
      </Container.FlexCol>
    </Container.FlexRow>
  );
}

export default function MyActivityTemplate(props: MyActivityTemplateProps) {
  const { user } = props;
  const [currentTab, setCurrentTab] = useState(0);
  const tabItem = ['내가 쓴 게시글', '내가 쓴 댓글'];
  const navigate = useNavigate();

  return (
    <Container.FlexCol className="gap-y-8">
      <Container.FlexRow className="w-full items-center gap-x-[1.54rem]">
        <Container.FlexRow className="items-center justify-center">
          <Avatar.XXL
            className="size-[4.615rem] tablet:size-[6rem]"
            src={user.avatar}
          />
        </Container.FlexRow>
        <Container.FlexCol className="gap-y-[0.615rem] tablet:gap-y-3">
          <Container.FlexRow className="w-full items-center gap-x-3">
            <Typography.SubTitle1 className="flex-1 break-all text-[1.54rem] leading-150 text-brown">
              {user.name}님
            </Typography.SubTitle1>
            <Link to={routePaths.myAccount} className="shrink-0">
              <BadgeButton.Outline
                className="gap-x-[0.625rem] rounded-[1.875rem] px-4 py-[0.625rem]"
                iconType="next"
                stroke="brown"
                iconClassName="h-[0.6875rem] w-[0.375rem]"
              >
                <Typography.Span1>계정 설정</Typography.Span1>
              </BadgeButton.Outline>
            </Link>
          </Container.FlexRow>
          <Typography.P3 className="text-brown1">
            @{user.nickname}
          </Typography.P3>
        </Container.FlexCol>
      </Container.FlexRow>
      <Divider.Col />
      <Container.FlexRow className="items-center gap-x-3">
        <Typography.SubTitle1 className="text-brown">
          내 프로필 카드
        </Typography.SubTitle1>
        <Button.Outline
          className="rounded-[30px] px-4 py-[0.625rem]"
          onClick={() => navigate(routePaths.signUpProfile)}
        >
          <Typography.Span1 className="text-brown">수정</Typography.Span1>
        </Button.Outline>
      </Container.FlexRow>
      <Container.Grid className="gap-[1.85rem] gap-x-5 laptop:grid-cols-2">
        {/* 내가 찾는 집 */}
        <Container.FlexCol className="flex-1 rounded-xl bg-brown6 p-[1.5rem]">
          <Container.FlexRow className="items-center gap-x-[1.25rem] pb-[2.46rem]">
            <Icon type="studio-officetel" className="size-[3.7rem]" />
            <Typography.SubTitle2 className="text-[1.23rem] text-brown">
              내가 찾는 집
            </Typography.SubTitle2>
          </Container.FlexRow>
          <Container.FlexCol className="gap-y-[1.54rem] tablet:gap-y-5">
            <HouseProfileInfoRow
              labelName="유형"
              items={{
                textBadges: [
                  houseTypesInfo[user.user_looking_house.type].text,
                  rentalTypesInfo[user.user_looking_house.rental_type],
                ],
              }}
            />
            <HouseProfileInfoRow
              labelName="위치"
              items={{
                textBadges: user.user_looking_house.regions
                  ? user.user_looking_house.regions
                  : [],
              }}
            />
            <HouseProfileInfoRow
              labelName="기간"
              items={{
                textBadges: [
                  `최소 ${generateUnitByTerm(user.user_looking_house.term[0], 25)}부터 최대 ${generateUnitByTerm(user.user_looking_house.term[1], 25)} 까지`,
                ],
              }}
            />
          </Container.FlexCol>
          <Container.FlexRow className="items-center gap-x-[1.25rem] pb-8 pt-12">
            <Icon type="year-rental-price" className="size-[3.7rem]" />
            <Typography.SubTitle2 className="text-[1.23rem] text-brown">
              가격대
            </Typography.SubTitle2>
          </Container.FlexRow>
          <Container.FlexCol className="gap-y-[1.54rem] tablet:gap-y-5">
            <HouseProfileInfoRow
              labelName="보증금"
              items={{
                textBadges: [
                  `${generateUnitByPrice(user.user_looking_house.deposit_price[0], 10001)} ~ ${generateUnitByPrice(user.user_looking_house.deposit_price[1], 10001)}`,
                ],
              }}
            />
            <HouseProfileInfoRow
              labelName="월세"
              items={{
                textBadges: [
                  `${generateUnitByPrice(user.user_looking_house.monthly_rental_price[0], 501)} ~ ${generateUnitByPrice(user.user_looking_house.monthly_rental_price[1], 501)}`,
                ],
              }}
            />
          </Container.FlexCol>
        </Container.FlexCol>
        {/* 자기 소개 */}
        <Container.FlexCol className="flex-1 gap-[4rem] rounded-xl bg-brown6 p-[1.5rem]">
          <HouseProfileInfoRow
            labelName="자기 소개"
            labelStyle="font-semibold text-[1.125rem]"
            className="flex-col gap-[2rem]"
            items={{
              iconBadges: [
                {
                  iconType: genderInfo[user.gender].icon as IconType,
                  text: genderInfo[user.gender].text,
                },
                {
                  iconType:
                    smokingInfo[
                      JSON.stringify(user.user_lifestyle.smoking) as
                        | 'true'
                        | 'false'
                    ].icon,
                  text: smokingInfo[
                    JSON.stringify(user.user_lifestyle.smoking) as
                      | 'true'
                      | 'false'
                  ].text,
                },
                {
                  iconType: petInfo[user.user_lifestyle.pet].icon,
                  text: petInfo[user.user_lifestyle.pet].text,
                },
              ],
            }}
          />
          <HouseProfileInfoRow
            labelName="나의 라이프스타일"
            labelStyle="font-semibold text-[1.125rem]"
            className="flex-col gap-[2rem]"
            items={{
              textBadges: user.user_lifestyle.appeals,
            }}
          />
          <HouseProfileInfoRow
            labelName="내가 원하는 룸메이트"
            labelStyle="font-semibold text-[1.125rem]"
            className="flex-col gap-[2rem]"
            items={{
              iconBadges: [
                {
                  iconType: mateNumInfo[user.user_mate_style.mate_number].icon,
                  text: mateNumInfo[user.user_mate_style.mate_number].text,
                },
                {
                  iconType: genderInfo[user.user_mate_style.mate_gender].icon,
                  text: genderInfo[user.user_mate_style.mate_gender].text,
                },
              ],
              textBadges: user.user_mate_style.mate_appeals,
            }}
          />
        </Container.FlexCol>
      </Container.Grid>
      <Container.FlexCol>
        {/* TODO: fetch 내가 쓴 댓글  */}
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
        <CommingSoon className="py-[3.7rem]" />
        <Divider.Col />
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
