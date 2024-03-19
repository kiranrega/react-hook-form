import React from "react";
import moment from "moment";

export const formatDate = React.memo((dateString: string) =>
  moment(dateString).format("DD/MMM/YYYY")
);
