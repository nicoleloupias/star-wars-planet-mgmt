import { Select } from "@chakra-ui/react";
import { useEffect } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { Planet } from "../../../hooks/usePlanetsStore";
import { FormFieldValues } from "../Home";

export interface SortByProps {
  planetsToShow: Planet[] | undefined;
  setPlanetsToShow: React.Dispatch<React.SetStateAction<Planet[] | undefined>>;
  form: UseFormReturn<FormFieldValues>;
}

export const SortBy = ({ setPlanetsToShow, planetsToShow, form }: SortByProps) => {
  const { register, watch } = form;

  const value = watch("sortBy");

  const orderPlanets = () => {
    const planetsOrdered =
      planetsToShow?.sort((a, b) => {
        return a[value].localeCompare(b[value]);
      }) || [];

    setPlanetsToShow([...planetsOrdered]);
  };

  useEffect(() => {
    if (value) {
      orderPlanets();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Select placeholder="Order by" maxW={{ lg: 60 }} {...register("sortBy")}>
      <option value="name">Name</option>
      <option value="diameter">Diameter</option>
      <option value="climate">Climate</option>
      <option value="terrain">Terrain</option>
      <option value="population">Habitants</option>
    </Select>
  );
};
