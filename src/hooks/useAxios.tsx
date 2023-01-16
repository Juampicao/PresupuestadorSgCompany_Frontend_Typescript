import axios from "axios";
import { useEffect, useState } from "react";
import CustomLogger from "../helpers/CustomLogger";

const customLogger = new CustomLogger();

interface IMethod{
    type?: 'get' | 'put' | 'post' | 'delete';

}

interface IUseAxios{
  url: string,
  method: IMethod,
  functionName: string, 
  body?: any ,
  config?: any 
}
/**
 *
 * @param {string} url
 * @param {[`get, put, post, delete`]} method
 * @param {string} functionName
 * @param {Object} body
 * @param {Object} config
 * @returns
 */


const useAxios = ({url, method, functionName, body = null, config = null} : IUseAxios) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = () => {
    setIsLoading(true);
    axios[method](url, body, config)
      .then((res) => {
        if (!res.status === 200) {
          setError(true);
          setErrorMsg(`error en ${functionName}`);
          throw Error(`Cant fetch data from this url: ${url}`);
        }
        customLogger.logDebug(
          `[${functionName}]. Status: ${res.status}. La data es:`,
          res.data
        );
        setData(res.data);
      })
      .catch((error) => {
        customLogger.logError(`[${functionName}]`, error);
        setError(error);
        throw new Error(`[${functionName}]`, error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, error };
};

export default useAxios;

// useAxios hook

// import axios from "axios";
// import { useEffect, useState } from "react";

// axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

// const useAxios = ({ url, method, body = null, headers = null }) => {
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setloading] = useState(true);

//   const fetchData = () => {
//     axios[method](url, JSON.parse(headers), JSON.parse(body))
//       .then((res) => {
//         setResponse(res.data);
//       })
//       .catch((err) => {
//         setError(err);
//       })
//       .finally(() => {
//         setloading(false);
//       });
//   };

//   useEffect(() => {
//     fetchData();
//   }, [method, url, body, headers]);

//   return { response, error, loading };
// };

// export default useAxios;
