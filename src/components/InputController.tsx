import { FormControl, FormErrorMessage, FormLabel, Input, InputProps } from "@chakra-ui/react";
import { Control, FieldValues, UseControllerProps, useController } from "react-hook-form";

export interface InputControllerProps<T extends FieldValues> extends InputProps {
  id: UseControllerProps<T>["name"];
  control: Control<T>;
  label: string;
  rules?: Record<string, unknown>;
}
export const InputController = <T extends FieldValues>({
  id,
  control,
  label,
  rules,
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
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Input data-testid={id} id={id} placeholder={label} {...field} {...props} />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
