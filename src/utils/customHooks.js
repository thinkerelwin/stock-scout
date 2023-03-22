import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import instance from '../api/IEXCloud';

import { setIsMediumSize } from '../features/sizeDetection/sizeDetectionSlice';

const defaultWidth = '64rem';

export const useSizeDetection = (width = defaultWidth) => {
  const { isMediumSize } = useSelector((state) => state.sizeDetection);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const sizeDetector = window.matchMedia(`(min-width: ${width})`);
    carouselSwitch(sizeDetector); // Call listener function at run time
    sizeDetector.addListener(carouselSwitch); // Attach listener function on state changes

    function carouselSwitch(size) {
      if (size.matches) {
        isMounted && dispatch(setIsMediumSize({ isMediumSize: true }));
      } else {
        isMounted && dispatch(setIsMediumSize({ isMediumSize: false }));
      }
    }

    return () => {
      isMounted = false;
      sizeDetector.removeListener(carouselSwitch);
    };
  }, [dispatch, width]);
  console.log('isMediumSize Check', isMediumSize);

  return { isMediumSize };
};

export const useLocalStateFetching = ({ route, params, process, naming }) => {
  const [isFetchingIEXdata, setIsFetchingIEXdata] = useState(false);
  const [IEXdata, setIEXdata] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;
    fetchRecentNews();

    async function fetchRecentNews() {
      setIsFetchingIEXdata(true);
      try {
        const response = await instance.get(route, { params });
        isMounted && setIEXdata(process(response.data));
      } catch (err) {
        setErrorMessage(err.toString());
      }
      isMounted && setIsFetchingIEXdata(false);
    }
    return () => (isMounted = false);
  }, [route, params, process]);

  function capitalizeFirstChar(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return {
    [`isFetching${capitalizeFirstChar(naming)}`]: isFetchingIEXdata,
    [`errorOn${capitalizeFirstChar(naming)}`]: errorMessage,
    [naming]: IEXdata,
  };
};

export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
