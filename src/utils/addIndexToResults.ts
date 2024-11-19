export const addIndexToResults = (data: any[], page: number, limit: number) => {
    const startIndex = (page - 1) * limit;
    return data.map((item, i) => ({
      ...item,
      index: startIndex + i + 1,
    }));
  };
  