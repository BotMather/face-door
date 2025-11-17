// queryGenerator array elementlarini qayta ishlash
export function queryGenerator(query: Record<string, any>) {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else if (value !== undefined && value !== null) {
      params.append(key, value);
    }
  });

  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
}
