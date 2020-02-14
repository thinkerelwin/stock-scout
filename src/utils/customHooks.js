import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setIsMediumSize } from '../features/sizeDetection/sizeDetectionSlice';

const defaultWidth = '64rem';

export const useSizeDetection = (width = defaultWidth) => {
  const { isMediumSize } = useSelector(state => state.sizeDetection);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    function carouselSwitch(size) {
      if (size.matches) {
        isMounted && dispatch(setIsMediumSize({ isMediumSize: true }));
      } else {
        isMounted && dispatch(setIsMediumSize({ isMediumSize: false }));
      }
    }

    const sizeDetector = window.matchMedia(`(min-width: ${width})`);
    carouselSwitch(sizeDetector); // Call listener function at run time
    sizeDetector.addListener(carouselSwitch); // Attach listener function on state changes

    return () => {
      isMounted = false;
      sizeDetector.removeListener(carouselSwitch);
    };
  }, [dispatch, width]);
  return { isMediumSize };
};
