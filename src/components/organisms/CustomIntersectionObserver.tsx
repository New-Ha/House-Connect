/* eslint-disable react/require-default-props */
/* eslint-disable react/display-name */
import { forwardRef, useEffect, useRef, ComponentProps } from 'react';

import cn from '@/libs/cn';

type ObserverTargetProps = Omit<ComponentProps<'div'>, 'ref'>;

export const ObserverTarget = forwardRef<HTMLDivElement, ObserverTargetProps>(
  ({ children = null, className = '', ...others }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex h-12 w-full items-start justify-center text-white',
        className,
      )}
      {...others}
    >
      {children}
    </div>
  ),
);

type CustomIntersectionObserverProps = ObserverTargetProps & {
  callback: () => void;
};

// ! IntersectionObserver가 예약어이므로 사용하지 못해 CustomIntersectionObserver로 사용
export default function CustomIntersectionObserver({
  callback,
  children,
  ...others
}: CustomIntersectionObserverProps) {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /**
     * * 1. root: 기본 값은 null로서 브라우저 viewport를 대상으로 지정
     * * 2. rootMargin
     * *  - 양수: root요소의 경계를 확장
     * *  - 음수: root요소의 경계를 확장
     * *  - E.g) '0px 0px 20px 0px'이라면 root요소의 아래쪽 경계에서 20px만큼 observer target과 교차하는 순간 callback실행
     * * 3. threshold
     * *  - 0: 타겟 요소와 교차하는 순간 callback실행
     * *  - 1: 타겟 요소와 모두 교차해야 callback실행
     */
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) callback();
        });
      },
      {
        root: null,
        rootMargin: '10px',
        threshold: 0,
      },
    );

    if (targetRef.current) observer.observe(targetRef.current);

    const copyObserverTargetElement = targetRef;

    return () => {
      if (copyObserverTargetElement.current) {
        observer.unobserve(copyObserverTargetElement.current);
      }
    };
  }, [callback]);

  return (
    <ObserverTarget ref={targetRef} {...others}>
      {children}
    </ObserverTarget>
  );
}
