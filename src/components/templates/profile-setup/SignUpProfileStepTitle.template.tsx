import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';

type SignUpProfileStepTitleTemplateProps = {
  step: string;
  title: string;
};
export default function SignUpProfileStepTitleTemplate(
  props: SignUpProfileStepTitleTemplateProps,
) {
  const { step, title } = props;
  return (
    <Container.FlexCol className="mb-[3.75rem] gap-y-8">
      <Typography.P1 className="text-brown1">{`Step ${step}`}</Typography.P1>
      <Typography.Head2 className="leading-150 text-brown">
        {title}
      </Typography.Head2>
    </Container.FlexCol>
  );
}
