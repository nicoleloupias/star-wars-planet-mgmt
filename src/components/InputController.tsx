import type { InputProps } from "@chakra-ui/react";
import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import type { Control, FieldValues, UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

export interface InputControllerProps<T extends FieldValues> extends InputProps {
  id: UseControllerProps<T>["name"];
  control: Control<T>;
  label: string;
  rules?: Record<string, unknown>;
  iconRight?: React.ReactElement;
  showLabel?: boolean;
}
export const InputController = <T extends FieldValues>({
  id,
  control,
  label,
  rules,
  iconRight,
  showLabel = true,
  ...props
}: InputControllerProps<T>) => {
  const { field, fieldState } = useController<T>({
    name: id,
    control,
    rules
  });

  const errorMessage = fieldState.error?.message;

  return (
    <FormControl isInvalid={fieldState.invalid}>
      {showLabel && <FormLabel htmlFor={id}>{label}</FormLabel>}
      <InputGroup>
        <Input data-testid={id} id={id} placeholder={label} {...field} value={field.value || ""} {...props} />

        <InputRightElement>{iconRight}</InputRightElement>
      </InputGroup>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
