import axios from "axios";

const instance = axios.create({
  baseURL: "https://golden-key-backend.vercel.app/api",
  withCredentials: true,
});

const apiRequest = async (methodOrUrl, urlOrData = null, data = null) => {
  // If first parameter is a method string
  if (
    typeof methodOrUrl === "string" &&
    ["get", "post", "put", "delete"].includes(methodOrUrl.toLowerCase())
  ) {
    return instance({
      method: methodOrUrl,
      url: urlOrData,
      data: data,
    });
  }

  // Otherwise, treat as a direct URL call (defaults to GET)
  return instance({
    method: "get",
    url: methodOrUrl,
    ...(urlOrData && { params: urlOrData }),
  });
};

apiRequest.get = (url, config) => instance.get(url, config);
apiRequest.post = (url, data, config) => instance.post(url, data, config);
apiRequest.put = (url, data, config) => instance.put(url, data, config);
apiRequest.delete = (url, config) => instance.delete(url, config);

export default apiRequest;