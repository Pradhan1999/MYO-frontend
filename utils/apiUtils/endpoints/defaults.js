const defaults = {
  methods: {
    GET: {
      method: "GET",
    },
    POST: {
      method: "POST",
    },
    PATCH: {
      method: "PATCH",
    },
    PUT: {
      method: "PUT",
    },
    DELETE: {
      method: "DELETE",
    },
  },
  versions: {
    v1: {
      version: "/api",
    },
    weatherV25: {
      version: "/data/2.5",
    },
  },
};

export default defaults;
