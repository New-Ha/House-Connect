import { RefObject, useEffect } from 'react';

export default function useObserver({
  targetRef,
  callback,
}: {
  targetRef: RefObject<HTMLDivElement>;
  callback: () => void;
}) {
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
      entries => {
        entries.forEach((entry: IntersectionObserverEntry) => {
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
  }, [callback, targetRef]);

  return <div>useObserver</div>;
}
