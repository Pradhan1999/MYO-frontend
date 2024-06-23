import defaults from "./defaults";

const prefix = "/organisation";

const organization = {
  addOrg: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix,
    },
  },
  getAllOrg: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix,
    },
  },
  getSingleOrg: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix + "/:id",
    },
  },
  updateOrg: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: prefix + "/:id",
    },
  },
  deleteOrg: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: prefix + "/:id",
    },
  },
};

export default organization;
