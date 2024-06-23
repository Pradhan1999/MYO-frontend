import { organization } from "@/utils/apiUtils/endpoints";
import { callApi, getTenantDomain } from "@/utils/apiUtils/callApi";

// Example login function with typed parameters
export async function getOrganizationDetails() {
  return callApi({
    uriEndPoint: { ...organization.getOrganization.v1 },
    pathParams: {
      domain: getTenantDomain(),
    },
  });
}
