const normal = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const reversed = [...normal].reverse();

const api = {
  list: async (from: string | null, dir: 'asc' | 'desc', limit = 4) => {
    const data = dir === 'asc' ? normal : reversed;

    const found = data.findIndex((value) => value === from);

    const index = from === null
                  ? 0
                  : (found === -1)
                    ? Infinity
                    : found + 1;

    return data.slice(index, index + limit);
  },
};

export default api;
