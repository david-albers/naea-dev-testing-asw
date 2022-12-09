// add role names to this object to map them to group ids in your AAD tenant
const roleGroupMappings = {
  "f54690d8-5036-464e-9fd4-ef75b08797f0": "admin",
  "9035a892-56ff-4271-877f-9d738627226c": "reader",
};

module.exports = function (context, req) {
  
  const user = req.body || {};
  const roles = [
    user.userId || "unknown",
  ];
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
};

function getUserGroups(user) {
  const axios = require("axios");
  const token =
    user.accessToken ||
    "eyJ0eXAiOiJKV1QiLCJub25jZSI6IlltcTMwa1FjdGRNSURDTXQtWU9RdWlpY1Y4RlFPMVI2UXZycEc4b1Q4c2ciLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8xZTM1NWMwNC1lMGE0LTQyZWQtOGUyZC03MzUxNTkxZjBlZjEvIiwiaWF0IjoxNjcwNTQzNTE5LCJuYmYiOjE2NzA1NDM1MTksImV4cCI6MTY3MDU0ODIwOSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhUQUFBQTU1REZXRkJNdGZ6T24reDlhNFozZ0dZb1Q1TE5tQjVDNEs2VUppRXl6L0RuS3pEbXBZUWNsUllPblFPYTk1WGo5Mm9GUER5YlIrMHpIYXh6MjFLN1pOcmtCSmd1NXZFNXVOaVI0YlpZV1ZJPSIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwX2Rpc3BsYXluYW1lIjoiTWljcm9zb2Z0IEF6dXJlIENMSSIsImFwcGlkIjoiMDRiMDc3OTUtOGRkYi00NjFhLWJiZWUtMDJmOWUxYmY3YjQ2IiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJBbGJlcnMiLCJnaXZlbl9uYW1lIjoiRGF2aWQiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIyMDguMTI3LjE1Ny40NSIsIm5hbWUiOiJBbGJlcnMsIERhdmlkIChUU1RSTykiLCJvaWQiOiI4YzlhNTcyMy1lODc2LTQ3MDktODczYi01NzliZWZkNjU3ZmIiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMzQzMjIyMTQwOS0zNTcwMzE1MDQ3LTQxMDE0OTUyNTUtMTc3OTA3IiwicGxhdGYiOiIzIiwicHVpZCI6IjEwMDNCRkZEOEIzNzIwNDEiLCJyaCI6IjAuQVF3QUJGdzFIcVRnN1VLT0xYTlJXUjhPOFFNQUFBQUFBQUFBd0FBQUFBQUFBQUFNQU9BLiIsInNjcCI6IkF1ZGl0TG9nLlJlYWQuQWxsIERpcmVjdG9yeS5BY2Nlc3NBc1VzZXIuQWxsIGVtYWlsIEdyb3VwLlJlYWRXcml0ZS5BbGwgb3BlbmlkIHByb2ZpbGUgVXNlci5SZWFkV3JpdGUuQWxsIiwic3ViIjoiMjNkRnVQbldmRE5pRWV1ZmlVcU5vZkZuRHg3X0hHSXRCdmZaZTNIeDBxTSIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJFVSIsInRpZCI6IjFlMzU1YzA0LWUwYTQtNDJlZC04ZTJkLTczNTE1OTFmMGVmMSIsInVuaXF1ZV9uYW1lIjoiRGF2aWQuQWxiZXJzQGthbnRhci5jb20iLCJ1cG4iOiJEYXZpZC5BbGJlcnNAa2FudGFyLmNvbSIsInV0aSI6IjI2OEdETjZfMDBTZ1J1c1dydkZhQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfY2MiOlsiQ1AxIl0sInhtc19zc20iOiIxIiwieG1zX3N0Ijp7InN1YiI6IkZFVlZ2UEpjUGlfS19CaTQ3eUFyUFBOLXJiVVZxSXhldV9QZ1VnVGJBdzgifSwieG1zX3RjZHQiOjEzOTc2ODY0NDV9.KBDdoLyzJgaJ7EZCOHiNyz8YRv2Y7Gv_IJVOfHtO-ztvQdYeoaoaCe8S50oQDV4g6BNEoVLRfuL6-sM73Dzn3o6gBijiVL9ChW6lagkKxYEJHrYFQ8QTTgFmGz9iX1jZ0kUzUU28sDKmMGfyfa-f-ITPjuKNIoyxFUUMv8DDwRWHe4Tt_lYyIXcJnCBAn_OCzlggEy_CzqQkj3Uvg99V39-ZdKQbxzK_Jh4pNah8dxD-5ME-Ccs8umOOTDgopVMdYz0AkZju-RHzRBFj4U-RzfC85PHiIcY4IEUAX21jDSyxmKazHDiuOGLHf7Bg92Xz8iAZY3MMwkkrsxd1EO0mkg";
  const userId = user.userId || "8c9a5723-e876-4709-873b-579befd657fb";

  return axios({
    url: `https://graph.microsoft.com/v1.0/users/${userId}/transitiveMemberOf/microsoft.graph.group?$count=true&$select=id,displayName,securityEnabled`,
    method: "get",
    timeout: 8000,
    headers: {
    Authorization: `Bearer ${token}`,
    },
  })
  .then(res => res);
}
