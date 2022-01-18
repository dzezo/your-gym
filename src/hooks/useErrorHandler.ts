import React, { useState, useEffect } from "react";
import axios from "axios";

type ErrorHandles = [string, React.Dispatch<React.SetStateAction<string>>];

/**
 * @description Hooks an axios error interceptor
 */
const useErrorHandler = (): ErrorHandles => {
  const [errorMsg, setErrorMsg] = useState("");

  const errorInterceptor = axios.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response) {
        const { msg } = error.response.data;
        setErrorMsg(msg);

        switch (error.response.status) {
          case 401:
            throw error;
          case 500:
            throw error;
          default:
            console.error("from hook interceptor => ", error);
            throw error;
        }
      } else {
        throw error;
      }
    }
  );

  useEffect(() => {
    return () => {
      axios.interceptors.response.eject(errorInterceptor);
    };
  });

  return [errorMsg, setErrorMsg];
};

export default useErrorHandler;
