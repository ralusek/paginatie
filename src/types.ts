import { DIRECTION } from './constants';

export type Direction = typeof DIRECTION[keyof typeof DIRECTION];

export type Props<TResults, TPayload extends any, TCursor extends any> = {
  getNext?: (
    meta: {
      head: TCursor | null;
      tail: TCursor | null;
      setHead: (head: TCursor | null) => void;
      setTail: (tail: TCursor | null) => void;
      payload?: TPayload | null;
    }
  ) => TResults | Promise<TResults>;
  getPrevious?: (
    meta: {
      head: TCursor | null;
      tail: TCursor | null;
      setHead: (head: TCursor | null) => void;
      setTail: (tail: TCursor | null) => void;
      payload?: TPayload | null;
    }
  ) => TResults | Promise<TResults>;
  onResults?: (
    results: TResults,
    event: {
      direction: Direction;
      payload: TPayload | null;
    }
  ) => void;
};

export type State<TCursor> = {
  head: TCursor | null;
  tail: TCursor | null;
};
