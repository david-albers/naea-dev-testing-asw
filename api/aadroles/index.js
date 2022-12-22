const axios = require("axios");

module.exports = function (context, req) {
  const roleGroupMappings = {
    "f54690d8-5036-464e-9fd4-ef75b08797f0": "admin",
    "9035a892-56ff-4271-877f-9d738627226c": "reader",
  };

  const user = req.body || {};
  const roles = [user.userId || "unknown"];
  roles.push.apply(
    roles,
    user.claims.map(clm => clm.val)
  );
  context.res.json({
    roles,
  });
  /*
  try {
    getUserGroups(user)
      .then((resp) => {
        const usergroups = resp.data.value;
        roles.push.apply(
          roles,
          usergroups
            .filter((grp) => roleGroupMappings.hasOwnProperty(grp.id))
            .map((grp) => grp.displayName)
        );
      })
      .catch((err) => {
        roles.push(err.response.data.error.message);
      })
      .finally(() => {
        context.res.json({
          roles,
        });
      });
  } catch (err) {
    roles.push(typeof(err));
    context.res.json({
      roles,
    });
  }
  */
};

function getUserGroups(user) {
  const token =
    user.accessToken;
  const userId = user.userId;

  return axios({
    url: `https://graph.microsoft.com/v1.0/users/${userId}/transitiveMemberOf/microsoft.graph.group?$count=true&$select=id,displayName,securityEnabled`,
    method: "get",
    timeout: 8000,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res);
}
