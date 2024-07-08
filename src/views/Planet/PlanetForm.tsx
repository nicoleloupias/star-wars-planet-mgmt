import { Button, Flex, Stack } from "@chakra-ui/react";
import { InputController } from "../../components/InputController";
import { useFormContext } from "react-hook-form";
import { maxLength, required } from "../../helpers/validations";
import { useNavigate } from "react-router-dom";

export interface PlanetFormFieldValues {
  name: string;
  diameter: number;
  population: number;
  climate: string;
  terrain: string;
}

export interface PlanetFormProps {
  onSubmit: () => void;
  confirmText: string;
}

export const PlanetForm = ({ onSubmit, confirmText }: PlanetFormProps) => {
  const { control, formState } = useFormContext<PlanetFormFieldValues>();
  const navigate = useNavigate();

  return (
    <Stack as="form" w="full" spacing={5}>
      <InputController
        id="name"
        control={control}
        label="Name"
        rules={{
          required,
          maxLength: maxLength(100)
        }}
      />
      <InputController id="diameter" type="number" label="Diameter (km)" control={control} />
      <InputController id="population" type="number" label="Population" control={control} />
      <InputController
        id="climate"
        label="Climate"
        control={control}
        rules={{
          required
        }}
      />
      <InputController
        id="terrain"
        label="Terrain"
        control={control}
        rules={{
          required
        }}
      />
      <Flex gap={3} pt={4}>
        <Button
          variant="secondary"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          isDisabled={!formState.isValid}
        >
          {confirmText}
        </Button>
      </Flex>
    </Stack>
  );
};
