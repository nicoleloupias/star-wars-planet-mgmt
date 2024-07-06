import { PlanetForm, PlanetFormFieldValues } from "../PlanetForm";
import { FormProvider, useForm } from "react-hook-form";
import { Center, Container, Heading, useToast } from "@chakra-ui/react";
import { usePlanetsStore } from "../../../hooks/usePlanetsStore";
import { Planet } from "../../../services/types/Planet";
import { useNavigate, useParams } from "react-router-dom";

export const EditPlanet = () => {
  const { id } = useParams();
  const data = usePlanetsStore((state) => state.getById(id!));
  console.log(data);

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
    const body: Planet = {
      name: values.name,
      diameter: values.diameter.toString(),
      population: values.population.toString(),
      climate: values.climate,
      terrain: values.terrain,
      url: data?.url!
    };
    editPlanet(id!, body);
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
