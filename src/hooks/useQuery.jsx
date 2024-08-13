import { useLazyQuery } from "@apollo/client";
import { useState } from "react";

const useDataQuery = (query, authToken) => {
  const [data, setData] = useState([]);
  const [queryData, { loading, error }] = useLazyQuery(query, {
    fetchPolicy: "no-cache",
    context: {
      clientName: "backend",
      headers: {
        Authorization: `Bearer ${authToken}`, // Pass the token here
      },
    },
    onCompleted: (data) => {
      setData(data);
    },
    onError: (error) => {
      console.log("Something went wrong", error);
    },
  });

  return { data, queryData, loading, error };
};

export default useDataQuery;
