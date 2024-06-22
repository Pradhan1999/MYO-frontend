// Import necessary types and utilities
import { user, auth } from "@/utils/apiUtils/endpoints";
import { callApi } from "@/utils/apiUtils/callApi";

// Assuming callApi and user.fetchMe.v1 are already correctly typed,
// this conversion should be straightforward.

export const getCurrentUser = async () => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...auth.fetchMe.v1 },
  });
};
export const getUserDetails = async (id) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...user.getUserDetails.v1 },
    pathParams: { id },
  });
};
export const updateProfileService = async ({ body }) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...user.updateProfile.v1 },
    body,
  });
};
export const resetPasswordService = async ({ pathParams }) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...user.resetPassword.v1 },
    pathParams,
  });
};
