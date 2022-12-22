module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");
/*
  var user = axios({
    url: `/.auth/me`
  }).then((res) => res);

  var groups = axios({
    url: `https://graph.microsoft.com/v1.0/users/${user.userId}/transitiveMemberOf/microsoft.graph.group?$count=true&$select=id,displayName,securityEnabled`,
    method: "get",
    timeout: 8000,
    headers: {
      Authorization: req.headers.authorization,
    },
  }).then((res) => res);
*/
  context.res = {
    // status: 200, /* Defaults to 200 */
    body: JSON.stringify(context.req),
  };
};
