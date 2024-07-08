import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
  InputRightElement
} from "@chakra-ui/react";
import { Control, FieldValues, UseControllerProps, useController } from "react-hook-form";

export interface InputControllerProps<T extends FieldValues> extends InputProps {
  id: UseControllerProps<T>["name"];
  control: Control<T>;
  label: string;
  rules?: Record<string, unknown>;
  iconRight?: React.ReactElement;
}
export const InputController = <T extends FieldValues>({
  id,
  control,
  label,
  rules,
  iconRight,
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
      <InputGroup>
        <Input data-testid={id} id={id} placeholder={label} {...field} value={field.value || ""} {...props} />

        <InputRightElement>{iconRight}</InputRightElement>
      </InputGroup>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
