// components/LastNameInput.tsx
import React, { ReactNode } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

const LastNameInput: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl isInvalid={!!errors.lastname} height={"15vh"}>
      <FormLabel fontSize="1xl" fontWeight="bold" mb={2}>
        Last Name
      </FormLabel>
      <Input
        fontWeight={"bold"}
        bg={"#D7D7D7"}
        placeholder="Last Name"
        size={"md"}
        _placeholder={{ color: "white", fontWeight: "bold" }}
        variant="filled"
        {...register("lastname", {
          required: "Last Name is required",
          minLength: {
            value: 3,
            message: "Min 3 characters required",
          },
          pattern: {
            value: /^[A-Za-z]+$/,
            message: "Last Name must contain only alphabets",
          },
        })}
      />
      <FormErrorMessage>
        {errors.lastname && (errors.lastname.message as ReactNode)}
      </FormErrorMessage>
    </FormControl>
  );
};

export default LastNameInput;
