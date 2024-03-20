// components/EmailInput.tsx
import React, { ReactNode } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

const EmailInput: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl isInvalid={!!errors.email} height={"15vh"}>
      <FormLabel fontSize="1xl" fontWeight="bold" mb={2}>
        E-Mail
      </FormLabel>
      <Input
        fontWeight={"bold"}
        bg={"#D7D7D7"}
        placeholder="E-mail"
        size={"md"}
        _placeholder={{ color: "white", fontWeight: "bold" }}
        variant="filled"
        {...register("email", {
          required: "E-Mail is required",
          pattern: {
            value: /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: "Email format is incorrect",
          },
        })}
      />
      <FormErrorMessage>
        {errors.email && (errors.email.message as ReactNode)}
      </FormErrorMessage>
    </FormControl>
  );
};

export default EmailInput;
