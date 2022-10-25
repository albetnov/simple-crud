import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";

interface InputProps extends ChakraInputProps {
  label: string;
}

export default function Input(props: InputProps) {
  return (
    <FormControl>
      <FormLabel color="white">{props.label}</FormLabel>
      <ChakraInput color="white" {...props} />
    </FormControl>
  );
}
