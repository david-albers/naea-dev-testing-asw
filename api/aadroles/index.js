const axios = require("axios");
// add role names to this object to map them to group ids in your AAD tenant
const roleGroupMappings = {
  "f54690d8-5036-464e-9fd4-ef75b08797f0": "admin",
  "9035a892-56ff-4271-877f-9d738627226c": "reader",
};

module.exports = async function (context, req) {
  
  const user = req.body || {};
  const resp = await getUserGroups(user);
  const usergroups = resp.data.value;

  const grps = usergroups || groups;
  const roles = grps.filter(grp => roleGroupMappings.hasOwnProperty(grp.id)).map((grp) => grp.displayName);

  context.res.json({
    roles,
  });
};

async function getUserGroups(user) {
  const token =
    user.accessToken ||
    "eyJ0eXAiOiJKV1QiLCJub25jZSI6InVNN2J6ZzFtVV9mZnlXRFRWd2JFYW50SG96cDJ6TzBsby0tMlVBWG5fYTQiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8xZTM1NWMwNC1lMGE0LTQyZWQtOGUyZC03MzUxNTkxZjBlZjEvIiwiaWF0IjoxNjcwNTM4MDcwLCJuYmYiOjE2NzA1MzgwNzAsImV4cCI6MTY3MDU0MzQzNSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhUQUFBQUNRT2N6Kzk4cURicGkxUERyLzBzdHRVWEhKWDZoMlNrVVQzT3RyQXRTYnNjMWlNd1VhemltSGtRcXE2NWVoSjZoVG5DdEgxU3Z6dkgydm14VEh3TTYvY012ZThlcCtDWTdESGZXQjJmc0hzPSIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwX2Rpc3BsYXluYW1lIjoiTWljcm9zb2Z0IEF6dXJlIENMSSIsImFwcGlkIjoiMDRiMDc3OTUtOGRkYi00NjFhLWJiZWUtMDJmOWUxYmY3YjQ2IiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJBbGJlcnMiLCJnaXZlbl9uYW1lIjoiRGF2aWQiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIyMDguMTI3LjE1Ny40NSIsIm5hbWUiOiJBbGJlcnMsIERhdmlkIChUU1RSTykiLCJvaWQiOiI4YzlhNTcyMy1lODc2LTQ3MDktODczYi01NzliZWZkNjU3ZmIiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMzQzMjIyMTQwOS0zNTcwMzE1MDQ3LTQxMDE0OTUyNTUtMTc3OTA3IiwicGxhdGYiOiIzIiwicHVpZCI6IjEwMDNCRkZEOEIzNzIwNDEiLCJyaCI6IjAuQVF3QUJGdzFIcVRnN1VLT0xYTlJXUjhPOFFNQUFBQUFBQUFBd0FBQUFBQUFBQUFNQU9BLiIsInNjcCI6IkF1ZGl0TG9nLlJlYWQuQWxsIERpcmVjdG9yeS5BY2Nlc3NBc1VzZXIuQWxsIGVtYWlsIEdyb3VwLlJlYWRXcml0ZS5BbGwgb3BlbmlkIHByb2ZpbGUgVXNlci5SZWFkV3JpdGUuQWxsIiwic3ViIjoiMjNkRnVQbldmRE5pRWV1ZmlVcU5vZkZuRHg3X0hHSXRCdmZaZTNIeDBxTSIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJFVSIsInRpZCI6IjFlMzU1YzA0LWUwYTQtNDJlZC04ZTJkLTczNTE1OTFmMGVmMSIsInVuaXF1ZV9uYW1lIjoiRGF2aWQuQWxiZXJzQGthbnRhci5jb20iLCJ1cG4iOiJEYXZpZC5BbGJlcnNAa2FudGFyLmNvbSIsInV0aSI6IkNmSjlWRzNzdjBpZzJJXzF3aDFWQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfY2MiOlsiQ1AxIl0sInhtc19zc20iOiIxIiwieG1zX3N0Ijp7InN1YiI6IkZFVlZ2UEpjUGlfS19CaTQ3eUFyUFBOLXJiVVZxSXhldV9QZ1VnVGJBdzgifSwieG1zX3RjZHQiOjEzOTc2ODY0NDV9.kejVkFBwJH2gVJnCYJAYtzixVpCEdR9f9kTf4YcJBMFdJnBnsElFVsnjfV-eSRorZb0iWYcaY8-1XFk1NPJ6zoKixdHqv9IThfhnR4ylFCWRRktd3Gwz9nr1fGjinMFZFZUU53-LMCX3IHND8e0mf_9dqxzUWIAEBgipS9XQ0LT188eUemg8Jw4boh1nR7zNyXwufl0OR7bULh8NEeX10NAv8IbIgrHxeZyCLUAJEq3YMip_qCXmd7Qsc5PWg-_FZPZ3MCusl705RIFPX-1l2IeoV4XIYhliRh66JtR1OvqB7kQnaj4AB4oYB1DaXWQpt9sQa-RrH8GlD_wi7drAyw";
  const userId = user.userId || "8c9a5723-e876-4709-873b-579befd657fb";

  const resp = await axios({
    url: `https://graph.microsoft.com/v1.0/users/${userId}/transitiveMemberOf/microsoft.graph.group?$count=true&$select=id,displayName,securityEnabled`,
    method: "get",
    timeout: 8000,
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  return resp;
}
