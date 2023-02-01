import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PublicApi } from "../lib/api";

const useForceUpdate = () => {
  const [dependency, setValue] = useState(0);
  const forceUpdate = useCallback(() => {
    setValue((value) => value + 1);
  }, []);
  return { dependency, forceUpdate };
};

const useFetch = <Type>(
  url: string,
  initialDataValue: Type,
  showToast: boolean = true
) => {
  const { dependency, forceUpdate } = useForceUpdate();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Type>(initialDataValue);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await PublicApi.get(url, {
          signal: abortController.signal,
        });
        if (response.data) {
          setData(response.data);
          if (showToast) toast.success("Dados recuperados com sucesso!");
        }
      } catch (error) {
        if (showToast) toast.error("Erro ao tentar recuperar dados!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url, dependency]);

  return { data, loading, refetch: forceUpdate };
};

export { useForceUpdate, useFetch };
