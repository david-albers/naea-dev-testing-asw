const axios = require("axios");

module.exports = function (context, req) {
  const roleGroupMappings = {
    "f54690d8-5036-464e-9fd4-ef75b08797f0": "admin",
    "9035a892-56ff-4271-877f-9d738627226c": "reader",
  };

  const user = req.body || {};
  const roles = [user.userId || "unknown"];
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
};

function getUserGroups(user) {
  const token =
    user.accessToken ||
    "eyJ0eXAiOiJKV1QiLCJub25jZSI6ImVlWGdhUFZvTFJVZ2tXTWJZMVcxRWd3UF9pczVoNWpCcUlELUZMYTByVkUiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8xZTM1NWMwNC1lMGE0LTQyZWQtOGUyZC03MzUxNTkxZjBlZjEvIiwiaWF0IjoxNjcwNjA3MDg4LCJuYmYiOjE2NzA2MDcwODgsImV4cCI6MTY3MDYxMTg3MCwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhUQUFBQTlFdmg0RHNORlJjSUVGUUpoNUkzN2g4TUQ2bGFYMVRaMkN3MkVjWmo0QVRZbzJ5bTJpbE15QnBRRm4xN0hVeHB4WEZmVzFmYllBK1VXQzNYRlFVaHIwWk5KRG8rdURDMlpLa3FVNzlJb1FNPSIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwX2Rpc3BsYXluYW1lIjoiTWljcm9zb2Z0IEF6dXJlIENMSSIsImFwcGlkIjoiMDRiMDc3OTUtOGRkYi00NjFhLWJiZWUtMDJmOWUxYmY3YjQ2IiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJBbGJlcnMiLCJnaXZlbl9uYW1lIjoiRGF2aWQiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIyMDguMTI3LjE1Ny40NSIsIm5hbWUiOiJBbGJlcnMsIERhdmlkIChUU1RSTykiLCJvaWQiOiI4YzlhNTcyMy1lODc2LTQ3MDktODczYi01NzliZWZkNjU3ZmIiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMzQzMjIyMTQwOS0zNTcwMzE1MDQ3LTQxMDE0OTUyNTUtMTc3OTA3IiwicGxhdGYiOiIzIiwicHVpZCI6IjEwMDNCRkZEOEIzNzIwNDEiLCJyaCI6IjAuQVF3QUJGdzFIcVRnN1VLT0xYTlJXUjhPOFFNQUFBQUFBQUFBd0FBQUFBQUFBQUFNQU9BLiIsInNjcCI6IkF1ZGl0TG9nLlJlYWQuQWxsIERpcmVjdG9yeS5BY2Nlc3NBc1VzZXIuQWxsIGVtYWlsIEdyb3VwLlJlYWRXcml0ZS5BbGwgb3BlbmlkIHByb2ZpbGUgVXNlci5SZWFkV3JpdGUuQWxsIiwic3ViIjoiMjNkRnVQbldmRE5pRWV1ZmlVcU5vZkZuRHg3X0hHSXRCdmZaZTNIeDBxTSIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJFVSIsInRpZCI6IjFlMzU1YzA0LWUwYTQtNDJlZC04ZTJkLTczNTE1OTFmMGVmMSIsInVuaXF1ZV9uYW1lIjoiRGF2aWQuQWxiZXJzQGthbnRhci5jb20iLCJ1cG4iOiJEYXZpZC5BbGJlcnNAa2FudGFyLmNvbSIsInV0aSI6IjVMRUxrWE1hSGt5dFJyRmdqeVZ2QUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfY2MiOlsiQ1AxIl0sInhtc19zc20iOiIxIiwieG1zX3N0Ijp7InN1YiI6IkZFVlZ2UEpjUGlfS19CaTQ3eUFyUFBOLXJiVVZxSXhldV9QZ1VnVGJBdzgifSwieG1zX3RjZHQiOjEzOTc2ODY0NDV9.hz5soUxksbvYsU-edHY3E32GCfillzuoKJGfnuM4a3JlOGOqjlafBMiaBkrom0fKpjzaO38q_ptwIKKd62nXMMScYawp0qHhz3VWl9kRQGhdZhlmlMb6exU8KhUe75D8GKme5zYOn6pG4DjtXYJEK9SI6CfdCpswp77XiPjqaVTlakspvDv6S0P8uv3Rc7PaDDshviORqCgIpzstkRo7T5UGQwzHh97-YNBoja7Jok4t58F1nZ9gK3ohQj160O_pV3aVrBh8T4FbF1mw8BYXhcnNAHGnV-Gq2T5c0PZvCp8E0UZFivZJiiPpiJoFSOCZbvvJ2_1KN-HnT6FoTj6Z3A";
  const userId = user.userId || "8c9a5723-e876-4709-873b-579befd657fb";

  return axios({
    url: `https://graph.microsoft.com/v1.0/users/${userId}/transitiveMemberOf/microsoft.graph.group?$count=true&$select=id,displayName,securityEnabled`,
    method: "get",
    timeout: 8000,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res);
}
