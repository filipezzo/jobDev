import { TProps, jobItemsProps } from "@/types/data";
import { useState, useEffect } from "react";
import { BASE_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useJobItems({ debouncedValue, setSearchText }: TProps) {
  const [jobItems, setJobItems] = useState<jobItemsProps[]>([]);
  const [loading, setLoading] = useState(false);
  const handleSettingText = (text: string) => {
    setSearchText(text);
  };

  useEffect(() => {
    if (!debouncedValue) return;

    const fetchingData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}?search=${debouncedValue}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.description);
        }
        const data = await response.json();
        setLoading(false);
        setJobItems(data.jobItems);
      } catch (error: unknown) {
        let message;
        if (error instanceof Error) {
          message = error.message;
        } else if (typeof error === "string") {
          message = error;
        } else {
          message = "An unknown error occurred.";
        }
        toast.error(message);
      }
    };

    fetchingData();
  }, [debouncedValue]);

  return {
    jobItems,
    loading,
    handleSettingText,
  };
}

export function useHashId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setActiveId(id);
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return {
    activeId,
  };
}

const fetchJobItem = async (id: number) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.description);
  }
  const data = await res.json();
  return data;
};

export function useDataItem(id: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["job-item", id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!id,
      onError: () => {},
    },
  );

  const jobItem = data?.jobItem;
  const isLoading = isInitialLoading;
  return { jobItem, isLoading } as const;
}

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);
  return debouncedValue;
}
