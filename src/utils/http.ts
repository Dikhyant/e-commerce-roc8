/**
 * Generate HTTP headers
 */
export const getHeader = async (
  headers = new Headers(),
  hasFiles = false,
): Promise<Headers> => {
  const defaultHeaders = new Headers();
  defaultHeaders.append("Accept", "application/json");
  defaultHeaders.append("Content-Type", "application/json");

  if (headers) {
    headers.forEach((value: string, key: string) =>
      defaultHeaders.append(key, value),
    );
  }

  if (hasFiles) {
    defaultHeaders.delete("Content-Type");
  }

  return defaultHeaders;
};

/**
 * Generate HTTP body
 */
export const getBody = (body?: BodyInit, hasFiles = false) =>
  hasFiles ? body : JSON.stringify(body);

export class ApiResponseError extends Error {
  code = 400;

  constructor(message: string, code = 400) {
    super(message || "Oops! Something went wrong");
    this.name = "ApiResponseError";
    this.code = code;
  }
}

interface ResponseError {
  message?: string;
  code?: number;
}

/**
 * Handle HTTP error
 */
const handleError = (httpStatusCode: number, response: ResponseError) => {
  if (!/^(2|3)[0-9][0-9]$/.test(String(httpStatusCode))) {
    throw new ApiResponseError(
      response?.message || "Something went wrong!",
      httpStatusCode ?? 501,
    );
  }
};

/**
 * Generate Request URL
 */
export const getURL = (url: string, options: { baseURL?: string }) => {
  const baseURL = options?.baseURL
    ? options.baseURL
    : process.env.API_BASE
      ? process.env.API_BASE
      : "";
  console.log("baseURL", baseURL);
  return baseURL + url;
};

interface HTTPOptions {
  baseURL?: string;
  isMockedURL?: boolean;
  headers?: Headers;
  hasFiles?: boolean;
}

/**
 * HTTP GET Request
 */
const fetchGet = async <T extends ResponseError>(
  url: string,
  options?: HTTPOptions,
) => {
  console.log("GET url ", getURL(url, { baseURL: options?.baseURL }));
  const result = await fetch(getURL(url, { baseURL: options?.baseURL }), {
    method: "GET",
    headers: await getHeader(options?.headers),
  });

  const response: T = await result.json();
  handleError(result.status, response);
  return response;
};

/**
 * HTTP POST Request
 */
const fetchPost = async <T extends ResponseError>(
  url: string,
  body?: any,
  options?: HTTPOptions,
) => {
  console.log("post request", getURL(url, { baseURL: options?.baseURL }));
  console.log("POST ", {
    method: "POST",
    headers: await getHeader(options?.headers, options?.hasFiles),
    body: getBody(body, options?.hasFiles),
  });
  const result = await fetch(getURL(url, { baseURL: options?.baseURL }), {
    method: "POST",
    headers: await getHeader(options?.headers, options?.hasFiles),
    body: getBody(body, options?.hasFiles),
  });

  const response: T = await result.json();
  handleError(result.status, response);
  return response;
};

/**
 * HTTP PATCH Request
 */
const fetchPatch = async <T extends ResponseError>(
  url: string,
  body?: any,
  options?: HTTPOptions,
) => {
  const result = await fetch(getURL(url, { baseURL: options?.baseURL }), {
    method: "PATCH",
    headers: await getHeader(options?.headers, options?.hasFiles),
    body: getBody(body, options?.hasFiles),
  });

  const response: T = await result.json();
  handleError(result.status, response);
  return response;
};

/**
 * HTTP PUT Request
 */
const fetchPut = async <T extends ResponseError>(
  url: string,
  body?: any,
  options?: HTTPOptions,
) => {
  const result = await fetch(getURL(url, { baseURL: options?.baseURL }), {
    method: "PUT",
    headers: await getHeader(options?.headers, options?.hasFiles),
    body: getBody(body, options?.hasFiles),
  });

  const response: T = await result.json();
  handleError(result.status, response);
  return response;
};

/**
 * HTTP DELETE Request
 */
const fetchDelete = async <T extends ResponseError>(
  url: string,
  body?: any,
  options?: HTTPOptions,
) => {
  const result = await fetch(getURL(url, { baseURL: options?.baseURL }), {
    method: "DELETE",
    headers: await getHeader(options?.headers, options?.hasFiles),
    body: getBody(body, options?.hasFiles),
  });

  const response: T = await result.json();
  handleError(result.status, response);
  return response;
};

const http = {
  get: fetchGet,
  post: fetchPost,
  put: fetchPut,
  patch: fetchPatch,
  delete: fetchDelete,
};

export default http;
