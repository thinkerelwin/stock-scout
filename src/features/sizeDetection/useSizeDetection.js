import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setIsMediumSize } from './sizeDetectionSlice';

const defaultWidth = '64rem';

const useSizeDetection = (width = defaultWidth) => {
  const { isMediumSize } = useSelector(state => state.sizeDetection);
  const dispatch = useDispatch();

  useEffect(() => {
    function carouselSwitch(size) {
      if (size.matches) {
        dispatch(setIsMediumSize({ isMediumSize: true }));
      } else {
        dispatch(setIsMediumSize({ isMediumSize: false }));
      }
    }
    const sizeDetector = window.matchMedia(`(min-width: ${width})`);
    carouselSwitch(sizeDetector); // Call listener function at run time
    sizeDetector.addListener(carouselSwitch); // Attach listener function on state changes
    return () => {
      sizeDetector.removeListener(carouselSwitch);
    };
  }, [dispatch, width]);
  return { isMediumSize };
};

export default useSizeDetection;
