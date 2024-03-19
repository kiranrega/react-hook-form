import { Box, Text } from "@chakra-ui/react";
import moment from "moment";
import { useFormContext, useFormState } from "react-hook-form";

const UserDetails = () => {
  const { getValues } = useFormContext();
  const { isValid, isSubmitted } = useFormState();

  const formData = getValues();

  const formattedDate = moment(formData?.dateofbirth).format("DD/MMM/YYYY");

  const tecstack = formData?.techstack
    .map(({ name }: { id: string; name: string }) => name)
    .join(", ");

  return (
    <Box>
      {isSubmitted && isValid && (
        <Box w="100%" bg="#F0EBEB" borderRadius="md" px={4} py={6} mt={2}>
          <Text fontWeight={"bold"}>First Name: {formData?.firstname}</Text>
          <Text fontWeight={"bold"}>Last Name: {formData?.lastname}</Text>
          <Text fontWeight={"bold"}>E-Mail: {formData?.email}</Text>
          <Text fontWeight={"bold"}>
            Mobile Number: +91-{formData?.mobilenumber}
          </Text>
          <Text fontWeight={"bold"}>Gender: {formData?.gender?.value}</Text>
          <Text fontWeight={"bold"}>Tech Stack: {tecstack}</Text>
          <Text fontWeight={"bold"}>Date Of Birth: {formattedDate}</Text>
        </Box>
      )}
    </Box>
  );
};

export default UserDetails;
