import { renderHook } from '@testing-library/react-hooks';
import { useLocalStateFetching } from '../customHooks';
import instance from '../../api/IEXCloud';

import {
  featuresAPIspec,
  normalizeBatchNews,
} from '../../features/news/NewsFeatures';
import { mockNewsFeaturesData } from '../../mockData';

// switch to open for real http request on jsdom environment
// beforeAll(() => {
//   instance.defaults.adapter = require('axios/lib/adapters/http');
// });

describe('useLocalStateFetching', () => {
  it('should fetch IEX data in a correct form', async () => {
    const dataFetchingMethod = jest.spyOn(instance, 'get');
    dataFetchingMethod.mockImplementationOnce((route, params) => {
      return { data: mockNewsFeaturesData };
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useLocalStateFetching(featuresAPIspec)
    );

    await waitForNextUpdate();

    expect(result.current.isFetchingFeatureNews).toBe(false);
    expect(result.current.errorOnFeatureNews).toBe('');
    expect(result.current.featureNews).toEqual(
      normalizeBatchNews(mockNewsFeaturesData)
    );
  });

  it('should reply with error message if network request failed', async () => {
    const dataFetchingMethod = jest.spyOn(instance, 'get');
    dataFetchingMethod.mockRejectedValueOnce(new Error('Network Error'));

    const { result, waitForNextUpdate } = renderHook(() =>
      useLocalStateFetching(featuresAPIspec)
    );

    await waitForNextUpdate();

    expect(result.current.isFetchingFeatureNews).toBe(false);
    expect(result.current.errorOnFeatureNews).toBe('Error: Network Error');
    expect(result.current.featureNews).toEqual([]);
  });
});
