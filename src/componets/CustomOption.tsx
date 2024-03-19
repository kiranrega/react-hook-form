import React from "react";
import { components, OptionProps, GroupBase } from "chakra-react-select";
import { CheckIcon } from "@chakra-ui/icons";

interface CustomOptionProps extends OptionProps<any, any, GroupBase<any>> {}

const CustomOption: React.FC<CustomOptionProps> = (props) => {
  const { children, isSelected } = props;
  return (
    <components.Option {...props}>
      {children}
      {isSelected && <CheckIcon color="green.500" />}
    </components.Option>
  );
};

export default CustomOption;
