import { useCallback, useMemo, useState } from "react";

export const usePagination = <T>(data?: T[], size: number = 10) => {
  const totalPages = useMemo(() => {
    if (!data) return 0;

    return Math.ceil(data.length / size);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, data?.length]);
  const [page, setPage] = useState(0);

  const onNextPage = useCallback(() => {
    setPage((prevState: number) => {
      if (prevState < totalPages) return prevState + 1;
      return prevState;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages]);

  const onPrevPage = useCallback(() => {
    setPage((prevState: number) => {
      if (prevState > 0) return prevState - 1;
      return prevState;
    });
  }, []);

  const slicedData = useMemo(() => {
    if (!data) return data;
    return data.slice(page * size, page * size + size);
  }, [data, size, page]);
  const hasNextPage = useMemo(
    () => !(page === totalPages - 1),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, page]
  );
  const hasPrevPage = useMemo(
    () => !(page <= 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, page]
  );

  return {
    data: slicedData,
    page,
    totalPages,
    setPage,
    onPrevPage,
    onNextPage,
    hasNextPage,
    hasPrevPage
  };
};
