import { renderHook } from '@testing-library/react-hooks';
import { useLocalStateFetching } from '../customHooks';
import instance from '../../api/IEXCloud';

import { featuresAPIspec } from '../../features/news/NewsFeatures';
import { mockNewsFeaturesData } from '../../__mocks__/mockData';

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
    expect(result.current.featureNews).toEqual(mockNewsFeaturesData);
  });

  it('should reply with error message if network request failed', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useLocalStateFetching(featuresAPIspec)
    );

    await waitForNextUpdate();

    expect(result.current.isFetchingFeatureNews).toBe(false);
    expect(result.current.errorOnFeatureNews).toBe('Error: Network Error');
    expect(result.current.featureNews).toEqual([]);
  });
});
