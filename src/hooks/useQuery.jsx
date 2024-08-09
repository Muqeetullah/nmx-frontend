import { useLazyQuery } from "@apollo/client";

export function useGenericQuery({
  query,
  authToken,
  variables,
  onSuccess,
  onError,
}) {
  const [executeQueryLazy, { loading, data, error }] = useLazyQuery(query, {
    fetchPolicy: "no-cache",
    context: {
      clientName: "backend",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
    onCompleted(responseData) {
      console.log("Query completed:", responseData);
      if (onSuccess) onSuccess(responseData);
    },
    onError(errorResponse) {
      console.log("Something went wrong", errorResponse);
      if (onError) onError(errorResponse);
    },
  });

  const executeQuery = (newVariables) => {
    executeQueryLazy({ variables: newVariables || variables });
  };

  return { executeQuery, loading, data, error };
}
