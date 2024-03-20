// components/MobileNumberInput.tsx
import React, { ReactNode } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

const MobileNumberInput: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl isInvalid={!!errors.mobilenumber} height={"15vh"}>
      <FormLabel fontSize="1xl" fontWeight="bold" mb={2}>
        Mobile Number
      </FormLabel>
      <InputGroup>
        <InputLeftAddon bg={"#d7d7d7"} fontWeight={"bold"}>
          +91
        </InputLeftAddon>
        <Input
          type="number"
          fontWeight={"bold"}
          bg={"#D7D7D7"}
          placeholder=" Mobile Number"
          size={"md"}
          _placeholder={{ color: "white", fontWeight: "bold" }}
          variant="filled"
          {...register("mobilenumber", {
            required: "Mobile Number is required",
            pattern: {
              value: /^(?:\+?\d{1,3}[- ]?)?(?:\d{10})$/,
              message: "Mobile Number format is incorrect",
            },
          })}
        />
      </InputGroup>
      <FormErrorMessage>
        {errors.mobilenumber && (errors.mobilenumber.message as ReactNode)}
      </FormErrorMessage>
    </FormControl>
  );
};

export default MobileNumberInput;
