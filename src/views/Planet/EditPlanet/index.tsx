import { PlanetForm, PlanetFormFieldValues } from "../PlanetForm";
import { FormProvider, useForm } from "react-hook-form";
import { Center, Container, Heading, useToast } from "@chakra-ui/react";
import { Planet, usePlanetsStore } from "../../../hooks/usePlanetsStore";
import { useNavigate, useParams } from "react-router-dom";

export const EditPlanet = () => {
  const { id } = useParams() as { id: string };

  const planets = usePlanetsStore((store) => store.planets);
  const data = planets?.find((planet) => planet.id === id);

  const editPlanet = usePlanetsStore((state) => state.editPlanet);
  const form = useForm<PlanetFormFieldValues>({
    mode: "all",
    defaultValues: {
      name: data?.name,
      diameter: data && parseInt(data.diameter!),
      population: data && parseInt(data.population!),
      climate: data?.climate,
      terrain: data?.terrain
    }
  });
  const navigate = useNavigate();
  const toast = useToast();

  const handleEditPlanet = (values: PlanetFormFieldValues) => {
    if (!data) return;
    const body: Planet = {
      name: values.name,
      diameter: values.diameter.toString(),
      population: values.population.toString(),
      climate: values.climate,
      terrain: values.terrain,
      id: data.id,
      url: data.url,
      residents: data.residents
    };
    editPlanet(id, body);
    navigate(`/${id}`);
    toast({
      status: "success",
      title: `Success! Planet ${values.name} was updated in our system.`,
      position: "top-right"
    });
  };

  return (
    <Center flexDir={"column"} py={12}>
      <Container maxW="500px">
        <Heading mb={6}>Edit planet</Heading>
        <FormProvider {...form}>
          <PlanetForm onSubmit={form.handleSubmit(handleEditPlanet)} confirmText="Edit" />
        </FormProvider>
      </Container>
    </Center>
  );
};
