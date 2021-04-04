// Types
import { Props, State } from './types';

// Constants
import { DIRECTION } from './constants';


export default <TResults, TCursor extends any, TPayload extends any>(props: Props<TResults, TPayload, TCursor>) => {
  const state: State<TCursor> = {
    head: null,
    tail: null,
  };

  const paginator = {
    next: async (
      payload?: TPayload | null,
      onResults?: Props<TResults, TPayload, TCursor>['onResults']
    ) => {
      if (!props.getNext) throw new Error(`Must provide getNext function in order to call .next().`);
      const results = await props.getNext(
        {
          head: state.head,
          tail: state.tail,
          setHead: (head) => state.head = head,
          setTail: (tail) => state.tail = tail,
          payload: payload || null,
        }
      );

      onResults && onResults(results, { direction: DIRECTION.FORWARD, payload: payload || null });
      props.onResults && props.onResults(results, { direction: DIRECTION.FORWARD, payload: payload || null });

      return results;
    },
    previous: async (
      payload?: TPayload | null,
      onResults?: Props<TResults, TPayload, TCursor>['onResults']
    ) => {
      if (!props.getPrevious) throw new Error(`Must provide getPrevious function in order to call .previous().`);
      const results = await props.getPrevious(
        {
          head: state.head,
          tail: state.tail,
          setHead: (head) => state.head = head,
          setTail: (tail) => state.tail = tail,
          payload: payload || null,
        }
      );

      onResults && onResults(results, { direction: DIRECTION.BACKWARD, payload: payload || null });
      props.onResults && props.onResults(results, { direction: DIRECTION.BACKWARD, payload: payload || null });

      return results;
    },
  };

  return paginator;
}
