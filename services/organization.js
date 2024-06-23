import { callApi } from "@/utils/apiUtils/callApi";
import organization from "@/utils/apiUtils/endpoints/organization";

export async function addOrg({ body, pathParams }) {
  return callApi({
    uriEndPoint: { ...organization.addOrg.v1 },
    pathParams,
    body,
  });
}

export async function getAllOrg({ query }) {
  return callApi({
    uriEndPoint: { ...organization.getAllOrg.v1 },
    query,
  });
}

export async function getSingleOrg({ pathParams }) {
  return callApi({
    uriEndPoint: { ...organization.getSingleOrg.v1 },
    pathParams,
  });
}

export async function updateOrg({ body, pathParams }) {
  console.log('pathParams', pathParams)
  return callApi({
    uriEndPoint: { ...organization.updateOrg.v1 },
    body,
    pathParams,
  });
}

export async function deleteOrg({ pathParams }) {
  return callApi({
    uriEndPoint: { ...organization.deleteOrg.v1 },
    pathParams,
  });
}
