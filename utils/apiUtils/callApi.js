
import axios from "axios";

// Assuming the getItem function returns any. You might want to specify a more precise type.
import { getItem } from "./localStorageControl";

export const hostname = () => {
  // let hostUrl = "https://taskmanagerbackend-92tz.onrender.com";
  let hostUrl = "https://myobackend.onrender.com/";
  // let hostUrl = 'http://localhost:4001';
  // Example switch case for different environments. Uncomment or modify as needed.
  // if (typeof window !== 'undefined') {
  //   switch (window.location.hostname) {
  //     case 'localhost': // Development environment
  //       hostUrl = 'http://localhost:4000';
  //       break;
  //     // Add more cases as needed for different environments
  //     default:
  //       hostUrl = 'https://api.tradelizer.com';
  //       break;
  //   }
  // }
  return hostUrl;
};

export const getTenantDomain = () => {
  const tenantDomain = "xx2";

  // switch (window.location.hostname) {
  //   case 'localhost':
  //     return (tenantDomain = 'savin');
  //   default:
  //     tenantDomain = window.location.hostname.split('.')[0];
  //     break;
  // }

  return tenantDomain;
};

const authHeader = () => ({
  accesstoken: getItem("accessToken") || "",
  "X-Tenant-Domain": getTenantDomain(),
});

const client = axios.create({
  baseURL: hostname(),
  headers: {
    "Content-Type": "application/json",
  },
});

export const makeUrl = ({ uri, pathParams, query }) => {
  const queryString = query
    ? Object?.keys(query)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join("&")
    : "";
  return `${uri
    .split("/")
    .map((param) =>
      param.charAt(0) === ":" && pathParams
        ? encodeURI(pathParams[param.slice(1)])
        : param
    )
    .join("/")}${queryString ? `?${queryString}` : ""}`;
};
export const callApi = async (
  { uriEndPoint, body, query, pathParams, additionalHeaders } // Consider specifying a more precise return type based on your API's response structure
) =>
  new Promise((resolve, reject) => {
    const url = makeUrl({
      uri: uriEndPoint.version + uriEndPoint.uri,
      pathParams,
      query,
    });

    const options = {
      method: uriEndPoint.method,
      url,
      headers: { ...authHeader(), ...additionalHeaders },
      data: body,
    };

    client(options)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error?.response?.data?.error);
      });
  });
