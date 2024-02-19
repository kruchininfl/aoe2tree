import { UseQueryOptions } from "react-query";

export type CustomQueryOptions<IRes, IResSelect = IRes> = Omit<
  UseQueryOptions<IRes, unknown, IResSelect, any>,
  "queryFn" | "queryKey"
>;
