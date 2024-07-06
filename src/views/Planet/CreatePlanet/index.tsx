import { PlanetForm, PlanetFormFieldValues } from "../PlanetForm";
import { FormProvider, useForm } from "react-hook-form";
import { Center, Container, Heading, useToast } from "@chakra-ui/react";
import { Planet, usePlanetsStore } from "../../../hooks/usePlanetsStore";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

export const CreatePlanet = () => {
  const form = useForm<PlanetFormFieldValues>({ mode: "all" });
  const addPlanet = usePlanetsStore((state) => state.addPlanet);
  const navigate = useNavigate();
  const toast = useToast();

  const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const createPlanet = (values: PlanetFormFieldValues) => {
    const generatedId = randomIntFromInterval(40, 100).toString();
    const body: Planet = {
      name: values.name,
      diameter: values.diameter.toString(),
      population: values.population.toString(),
      climate: values.climate,
      terrain: values.terrain,
      id: generatedId,
      url: `/planets/${generatedId}/`,
      residents: []
    };
    addPlanet(body);
    navigate("/");
    toast({
      status: "success",
      title: "Success! A planet was added to our system.",
      position: "top-right"
    });
  };

  return (
    <Center flexDir={"column"} py={16}>
      <Container maxW="500px">
        <Heading mb={6}>Create planet</Heading>
        <FormProvider {...form}>
          <PlanetForm onSubmit={form.handleSubmit(createPlanet)} confirmText="Create" />
        </FormProvider>
      </Container>
    </Center>
  );
};
