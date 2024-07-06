import { PlanetForm, PlanetFormFieldValues } from "../PlanetForm";
import { FormProvider, useForm } from "react-hook-form";
import { Center, Container, Heading, useToast } from "@chakra-ui/react";
import { usePlanetsStore } from "../../../hooks/usePlanetsStore";
import { v4 as uuidv4 } from "uuid";
import { Planet } from "../../../services/types/Planet";
import { useNavigate } from "react-router-dom";

export const CreatePlanet = () => {
  const form = useForm<PlanetFormFieldValues>({ mode: "all" });
  const setPlanets = usePlanetsStore((state) => state.setPlanets);
  const navigate = useNavigate();
  const toast = useToast();

  const createPlanet = (values: PlanetFormFieldValues) => {
    const body: Planet = {
      name: values.name,
      diameter: values.diameter.toString(),
      population: values.population.toString(),
      climate: values.climate,
      terrain: values.terrain,
      url: `/planets/${uuidv4()}/`
    };
    setPlanets([body]);
    navigate("/");
    toast({
      status: "success",
      title: "Success! A planet was added to our system.",
      position: "top-right"
    });
  };

  return (
    <Center flexDir={"column"} py={12}>
      <Container maxW="500px">
        <Heading mb={6}>Create planet</Heading>
        <FormProvider {...form}>
          <PlanetForm onSubmit={form.handleSubmit(createPlanet)} confirmText="Create" />
        </FormProvider>
      </Container>
    </Center>
  );
};
