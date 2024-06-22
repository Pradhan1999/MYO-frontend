import defaults from './defaults';

const prefix = '/dashboard';

const dashboard = {
  dailyStats: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/daily-stats`,
    },
  },
  cumulativeStats: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/cumulative-stats`,
    },
  },
  pnlStats: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/pnl-stats`,
    },
  },
  trades: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/trades-stats`,
    },
  },
  calendar: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/calendar-stats`,
    },
  },
};

export default dashboard;
