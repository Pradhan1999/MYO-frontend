import { projects } from "@/utils/apiUtils/endpoints";
import { callApi, getTenantDomain } from "@/utils/apiUtils/callApi";

// Example login function with typed parameters
export async function getProjects() {
  return callApi({
    uriEndPoint: { ...projects.getProjects.v1 },
    pathParams: {
      domain: getTenantDomain(),
    },
  });
}
export async function createProject(body) {
  return callApi({
    uriEndPoint: { ...projects.createProject.v1 },
    body,
  });
}
export async function updateProject(id, body) {
  return callApi({
    uriEndPoint: { ...projects.updateProject.v1 },
    body,
    pathParams: {
      id,
    },
  });
}
