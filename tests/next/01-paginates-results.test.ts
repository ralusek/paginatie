import 'mocha';
import { expect } from 'chai';

import api from '../../mock/api';

import getPaginator from '../../lib';

const RESULT_EXPECTATIONS = [
  [ 'a', 'b', 'c', 'd' ],
  [ 'e', 'f', 'g', 'h' ],
  [ 'i', 'j', 'k', 'l' ],
  [ 'm', 'n', 'o', 'p' ],
  [ 'q', 'r', 's', 't' ],
  [ 'u', 'v', 'w', 'x' ],
  [ 'y', 'z' ],
  [],
  [],
].map(result => result.join());

describe('Invocation', () => {
  it('should be instantiable', async () => {
    let onResultsCallCount = 0;

    const paginator = getPaginator<string[], string, undefined>({
      getNext: async (
        {
          tail,
          setTail,
        }
      ) => {
        const results = await api.list(tail || null, 'asc');
        const last = results[results.length - 1];
        last && setTail(last);
        return results;
      },
      onResults: (results) => {
        expect(results.join()).to.equal(RESULT_EXPECTATIONS[onResultsCallCount++]);
      },
    });

    const results = [
      await paginator.next(),
      await paginator.next(),
      await paginator.next(),
      await paginator.next(),
      await paginator.next(),
      await paginator.next(),
      await paginator.next(),
      await paginator.next(),
      await paginator.next(),
    ];

    results.forEach((result, i) => expect(result.join()).to.equal(RESULT_EXPECTATIONS[i]));

    expect(onResultsCallCount).to.equal(9);
  });
});
