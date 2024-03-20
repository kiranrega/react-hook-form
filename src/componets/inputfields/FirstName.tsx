// components/FirstNameInput.tsx
import React, { ReactNode } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

const FirstNameInput: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl isInvalid={!!errors.firstname} height={"15vh"}>
      <FormLabel fontSize="1xl" fontWeight="bold" mb={2}>
        First Name
      </FormLabel>
      <Input
        fontWeight={"bold"}
        bg={"#D7D7D7"}
        placeholder="First Name"
        size={"md"}
        _placeholder={{ color: "white", fontWeight: "bold" }}
        variant="filled"
        {...register("firstname", {
          required: "First Name is required",
          minLength: {
            value: 3,
            message: "Min 3 characters required",
          },
          pattern: {
            value: /^[a-zA-Z\s]+$/,
            message: "First Name must contain only alphabets and spaces",
          },
        })}
      />
      <FormErrorMessage>
        {errors?.firstname?.message as ReactNode}
      </FormErrorMessage>
    </FormControl>
  );
};

export default FirstNameInput;
