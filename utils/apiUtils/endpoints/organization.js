import defaults from "./defaults";

const prefix = "/organisation";

const organization = {
  getOrganization: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix + "/domain/:domain",
    },
  },
};

export default organization;
