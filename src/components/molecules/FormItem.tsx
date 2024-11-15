import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import { useEffect } from 'react';

import TextField, { TextFieldProps } from '@/components/molecules/TextField';
import Input from '@/components/atoms/Input';
import TextAreaField, {
  TextAreaFieldProps,
} from '@/components/molecules/TextAreaField';
import Container from '@/components/atoms/Container';
import IconButton from './IconButton';
import cn from '@/libs/cn';

export default function FormItem() {}

FormItem.TextField = function FormItemTextField<T extends FieldValues>(
  props: TextFieldProps<T>,
) {
  const { type, labelName, name, options, ...others } = props;
  return (
    <TextField
      options={options}
      labelName={labelName}
      name={name}
      type={type}
      {...others}
    />
  );
};

FormItem.Password = function FormItemPassword<T extends FieldValues>(
  props: TextFieldProps<T> & {
    isVisible: boolean;
    onClickVisible: () => void;
  },
) {
  const { type, labelName, name, isVisible, onClickVisible, ...others } = props;
  return (
    <Container className="relative">
      <TextField
        name={name}
        labelName={labelName}
        type={isVisible ? 'text' : 'password'}
        {...others}
      />
      <IconButton.Ghost
        tabIndex={-1}
        className={cn(
          'absolute bottom-[2.75rem] right-[1rem]',
          labelName ? 'top-[3.6rem]' : 'top-[1.8rem]',
        )}
        iconType={isVisible ? 'visible' : 'invisible'}
        onClick={onClickVisible}
      />
    </Container>
  );
};

FormItem.Hidden = function FormItemHidden<T extends FieldValues>(
  props: TextFieldProps<T> & { valueProp: T[keyof T] },
) {
  const { defaultValue, name, valueProp, options = {} } = props;
  const { control, setValue } = useFormContext();

  useEffect(() => {
    setValue(name, valueProp);
  }, [valueProp, name, setValue]);

  if (name)
    return (
      <Controller
        name={name}
        control={control}
        // ! defaultValue type맞추기 어려워 any로 타입 우회
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        defaultValue={defaultValue ?? ('' as any)}
        rules={options}
        render={({ field }) => <Input type="hidden" {...field} />}
      />
    );

  return <span>Name 속성이 필요합니다</span>;
};

FormItem.TextAreaField = function FormItemTextAreaField<T extends FieldValues>(
  // eslint-disable-next-line react/require-default-props
  props: TextAreaFieldProps<T> & { isControlled?: boolean },
) {
  const { control, getValues, register } = useFormContext();
  const {
    defaultValue,
    name,
    labelName,
    options,
    containerStyle,
    textAreaStyle,
    isControlled = false,
  } = props;
  const fieldValue = getValues(name as string) || defaultValue;

  return isControlled ? (
    <Controller
      name={name}
      control={control}
      defaultValue={fieldValue}
      rules={options}
      render={({ field }) => (
        <TextAreaField
          {...field}
          containerStyle={containerStyle}
          labelName={labelName}
          className={textAreaStyle}
        />
      )}
    />
  ) : (
    <TextAreaField
      {...register(name, options)}
      defaultValue={fieldValue}
      containerStyle={containerStyle}
      labelName={labelName}
      className={textAreaStyle}
    />
  );
};
