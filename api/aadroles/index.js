const fetch = require("node-fetch").default;

// add role names to this object to map them to group ids in your AAD tenant
const roleGroupMappings = {
  admin: "f54690d8-5036-464e-9fd4-ef75b08797f0",
  reader: "9035a892-56ff-4271-877f-9d738627226c",
};

module.exports = async function (context, req) {
    const user = req.body || {};
    var groups = [{ "displayName": "testing" }, { "displayName": "test2" }];

    try {
        groups = await getUserGroups(user.accessToken);
    } catch {}
    
    const roles = groups.map((grp) => grp.displayName);
    
    /*
    for (const [role, groupId] of Object.entries(roleGroupMappings)) {
        if (await isUserInGroup(groupId, user.accessToken)) {
            roles.push(role);
        }
    }
    */

    context.res.json({
        roles
    });
}

async function getUserGroups(bearerToken) {
    const url = new URL("https://graph.microsoft.com/v1.0/me/transitiveMemberOf/microsoft.graph.group");
    url.searchParams.append("$count","true");
    url.searchParams.append("$select","id,displayName");
    url.searchParams.append("$filter","securityEnabled eq true");
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${bearerToken}`
        },
    });

    return [{
        "displayName": `${response.status}`,
    }]
/*
    if (response.status !== 200) {
        return [];
    }

    const graphResponse = await response.json();
    return graphResponse.value;
*/
}
