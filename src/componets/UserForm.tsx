import React, { Suspense, lazy, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { AddIcon, Icon } from "@chakra-ui/icons";
import { Select } from "chakra-react-select";
import CustomOption from "./CustomOption";
import {
  Controller,
  SubmitHandler,
  useForm,
  FormProvider,
  useFieldArray,
} from "react-hook-form";
import { FiChevronDown } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const UserDetails = lazy(() => import("./Userdetails"));

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: "male", label: "male" },
  { value: "female", label: "female" },
  { value: "other", label: "other" },
];

type Inputs = {
  firstname: string;
  lastname: string;
  email: string;
  mobilenumber: string;
  gender: Option | null;
  dateofbirth: string;
  techstack: { name: string }[];
  genderError?: string;
};

const CustomDownIcon = ({ color }: { color: string }) => (
  <Icon as={FiChevronDown} color={color} width={30} size={30} />
);

const UserForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const methods = useForm<Inputs>({
    defaultValues: {
      techstack: [{ name: "" }],
    },
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isValid },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "techstack",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (isValid) {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate a 3-second delay
      setIsLoading(false);
      setShowUserDetails(true);
    }
  };

  const handleAddTechStack = () => {
    append({ name: "" });
  };

  const handleDeleteTechStack = (index: number) => {
    remove(index);
  };

  return (
    <FormProvider {...methods}>
      <Box>
        <Text fontSize="3xl" textAlign="center" fontWeight="bold">
          User Details
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box w="100%" bg="#F0EBEB" borderRadius="md" px={4} py={6}>
            <Text fontSize="2xl" fontWeight="bold">
              Basic Details
            </Text>
            <HStack spacing="24px" mt={2}>
              <Box width={"100%"}>
                <FormControl isInvalid={!!errors.firstname} height={"15vh"}>
                  <FormLabel fontSize="1xl" fontWeight="bold" mb={2}>
                    First Name
                  </FormLabel>
                  <Input
                    className="input-element"
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
                        message:
                          "First Name must contain only alphabets and spaces",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.firstname && errors.firstname.message}
                  </FormErrorMessage>
                </FormControl>
              </Box>
              <Box width={"100%"}>
                <FormControl isInvalid={!!errors.lastname} height={"15vh"}>
                  <FormLabel fontSize="1xl" fontWeight="bold" mb={2}>
                    Last Name
                  </FormLabel>
                  <Input
                    className="input-element"
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
                    {errors.lastname && errors.lastname.message}
                  </FormErrorMessage>
                </FormControl>
              </Box>
            </HStack>
            <HStack spacing="24px" mt={2}>
              <Box width={"100%"}>
                <FormControl isInvalid={!!errors.email} height={"15vh"}>
                  <FormLabel fontSize="1xl" fontWeight="bold" mb={2}>
                    E-Mail
                  </FormLabel>
                  <Input
                    className="input-element"
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
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
              </Box>
              <Box width={"100%"}>
                <FormControl isInvalid={!!errors.mobilenumber} height={"15vh"}>
                  <FormLabel fontSize="1xl" fontWeight="bold" mb={2}>
                    Mobile Number
                  </FormLabel>
                  <Input
                    className="input-element"
                    type="number"
                    fontWeight={"bold"}
                    bg={"#D7D7D7"}
                    placeholder=" Mobile Number"
                    size={"md"}
                    _placeholder={{ color: "white", fontWeight: "bold" }}
                    variant="filled"
                    {...register("mobilenumber", {
                      required: "Mobile number is required",
                      pattern: {
                        value: /^(?:\+?\d{1,3}[- ]?)?(?:\d{10})$/,
                        message: "Mobile number format is incorrect",
                      },
                      maxLength: {
                        value: 10,
                        message: "Mobile numbers must be 10 digits",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.mobilenumber && errors.mobilenumber.message}
                  </FormErrorMessage>
                </FormControl>
              </Box>
            </HStack>
            <Text fontSize="2xl" fontWeight="bold" mt={2}>
              Other Details
            </Text>
            <HStack spacing="24px">
              <Box width={"100%"} height={"15vh"}>
                <FormControl isInvalid={!!errors.gender}>
                  <FormLabel fontSize="1xl" fontWeight="bold" mb={2}>
                    Gender
                  </FormLabel>
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: "Gender is required" }}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <Select
                          components={{
                            Option: CustomOption,
                            DropdownIndicator: () => (
                              <CustomDownIcon color="white" />
                            ),
                          }}
                          options={options}
                          placeholder={
                            <Text fontWeight={"bold"} color={"white"}>
                              Select Gender
                            </Text>
                          }
                          styles={{
                            option: (provided) => ({
                              ...provided,
                              color: "white",
                              padding: "8px 12px",
                              fontWeight: "bold",
                              cursor: "pointer",
                              display: "flex",
                              justifyContent: "space-between",
                              background: "#d7d7d7",
                            }),
                          }}
                          closeMenuOnSelect={false}
                          className="select-gender"
                          value={value}
                          onChange={onChange}
                        />
                        <FormErrorMessage>
                          {errors.gender && errors.gender.message}
                        </FormErrorMessage>
                      </>
                    )}
                  />
                </FormControl>
              </Box>
              <Box width={"100%"} height={"15vh"}>
                <FormControl isInvalid={!!errors.dateofbirth}>
                  <FormLabel fontSize="1xl" fontWeight="bold" mb={2}>
                    Date of Birth
                  </FormLabel>
                  <Input
                    type="date"
                    placeholder="DD/MM/YYYY"
                    {...register("dateofbirth", {
                      required: "Date of Birth is required",
                    })}
                    className="input-element"
                    fontWeight={"bold"}
                    bg={"#D7D7D7"}
                  />
                  <FormErrorMessage>
                    {errors.dateofbirth && errors.dateofbirth.message}
                  </FormErrorMessage>
                </FormControl>
              </Box>
            </HStack>
            <Box width={"49%"} gap={3}>
              <HStack justifyContent={"space-between"}>
                <Text fontSize="1xl" fontWeight="bold" mb={2} mt={2}>
                  Tech Stack
                </Text>
                <AddIcon
                  w={4}
                  h={4}
                  onClick={handleAddTechStack}
                  sx={{ cursor: "pointer" }}
                />
              </HStack>
              {fields.map((field, index) => (
                <FormControl
                  isInvalid={!!errors.techstack?.[index]?.name}
                  key={field.id}
                >
                  <InputGroup mt={2}>
                    <Input
                      className="input-element"
                      fontWeight={"bold"}
                      bg={"#D7D7D7"}
                      placeholder="Enter Tech Stack"
                      size={"md"}
                      _placeholder={{ color: "white", fontWeight: "bold" }}
                      variant="filled"
                      {...register(`techstack.${index}.name`, {
                        required: "Tech Stack is required",
                      })}
                    />
                    {index > 0 && (
                      <InputRightAddon bg={"#d7d7d7"} fontWeight={"bold"}>
                        <IoClose
                          onClick={() => handleDeleteTechStack(index)}
                          fontSize={"20px"}
                        />
                      </InputRightAddon>
                    )}
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.techstack?.[index]?.name &&
                      errors.techstack[index]?.name?.message}
                  </FormErrorMessage>
                </FormControl>
              ))}
            </Box>
            <Box width="100%" display="flex" justifyContent="flex-end">
              <Button
                colorScheme="blue"
                mt={4}
                marginLeft="auto"
                type="submit"
                isLoading={isLoading}
              >
                {isLoading ? <Spinner size="sm" /> : "Submit"}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
      <Suspense fallback={<div>Loading...</div>}>
        {showUserDetails && <UserDetails />}
      </Suspense>
    </FormProvider>
  );
};

export default UserForm;
