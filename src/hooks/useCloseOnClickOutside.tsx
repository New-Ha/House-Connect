import { useEffect } from 'react';

const useCloseOnClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
) => {
  useEffect(() => {
    const onClickOutsideClose = ({ target }: MouseEvent) => {
      if (ref.current && !ref.current.contains(target as Node)) {
        callback();
      }
    };

    document.addEventListener('click', onClickOutsideClose);

    return () => document.removeEventListener('click', onClickOutsideClose);
  }, [ref, callback]);
};

export default useCloseOnClickOutside;
