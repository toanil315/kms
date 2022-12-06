const serializeFormQuery = (
  search: URLSearchParams,
  param: { [k: string]: (value: string) => string | number | boolean } = {}
) => {
  const searchAsObject = Object.fromEntries(new URLSearchParams(search));

  const transformedSearch: { [k: string]: string | number | boolean } =
    Object.keys(param).reduce(
      (acc, key) => ({
        ...acc,
        ...(param[key]
          ? { [key]: param[key](searchAsObject[key]) }
          : { [key]: searchAsObject[key] }),
      }),
      {}
    );

  return transformedSearch;
};

export default serializeFormQuery;
