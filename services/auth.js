import { auth } from "@/utils/apiUtils/endpoints";
import { callApi } from "@/utils/apiUtils/callApi";

// Example login function with typed parameters
export async function login({ email = "", password = "" }) {
  return callApi({
    uriEndPoint: { ...auth.login.v1 },
    body: {
      email,
      password,
    },
  });
}
export async function register({ body }) {
  return callApi({
    uriEndPoint: { ...auth.register.v1 },
    body,
  });
}
export async function verifyToken({ pathParams }) {
  return callApi({
    uriEndPoint: { ...auth.verifyUser.v1 },
    pathParams,
  });
}
export async function setupPassword({ body }) {
  return callApi({
    uriEndPoint: { ...auth.setupPassword.v1 },
    body,
  });
}
export async function forgotPasswordService({ body }) {
  return callApi({
    uriEndPoint: { ...auth.forgotPassword.v1 },
    body,
  });
}
export async function verifyOtp({ pathParams }) {
  return callApi({
    uriEndPoint: { ...auth.verifyOtp.v1 },
    pathParams,
  });
}

export async function resetPassword({ pathParams }) {
  return callApi({
    uriEndPoint: { ...auth.resetPassword.v1 },
    pathParams,
  });
}
