export default {
  getStatusEnum: (state) => state.productStatus,
  getSystems: (state) =>
    state.systems.reduce((acc, c) => {
      let sys = {
        id: c.id,
        name: c.name,
        url: c.url,
        dateAdded: c.dateAdded,
        productOwnerName: c.productOwnerName,
        productOwner: c.productOwner,
        cypressEndpoint: c.cypressEndpoint,
        totalIncidents: c.incidents.length,
        lastIncident: c.incidents.pop(),
      };
      acc.push(sys);
      return acc;
    }, []),
  getSystemById: (state) => (id) =>
    state.systems.filter((sys) => sys.id === id)[0],
};
