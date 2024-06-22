import defaults from "./defaults";

const prefix = "/projects";

const projects = {
  getProjects: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix + "/",
    },
  },
  createProject: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix + "/",
    },
  },
  updateProject: {
    v1: {
      ...defaults.methods.PATCH,
      ...defaults.versions.v1,
      uri: prefix + "/:id",
    },
  },
};

export default projects;
