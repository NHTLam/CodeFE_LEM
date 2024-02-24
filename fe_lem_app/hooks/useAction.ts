import { useState, useCallback } from "react";

interface UseActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
};

export const useAction = <TInput, TOutput> (
  action: (data: TInput) => Promise<TOutput>,
  options: UseActionOptions<TOutput> = {}
) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(true);

      try {
        const result = await action(input);
        setData(result);
        options.onSuccess?.(result);
      } catch (error) {
        setError(error.toString());
        options.onError?.(error.toString());
      } finally {
        setIsLoading(false);
        options.onComplete?.();
      }
    },
    [action, options]
  );

  return {
    execute,
    error,
    data,
    isLoading,
  };
};