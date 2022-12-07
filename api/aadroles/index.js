//const fetch = require('node-fetch').default;

// add role names to this object to map them to group ids in your AAD tenant
const roleGroupMappings = {
  admin: "f54690d8-5036-464e-9fd4-ef75b08797f0",
  reader: "9035a892-56ff-4271-877f-9d738627226c",
};

module.exports = async function (context, req) {
    const user = req.body || {};
    const roles = [
        "admin",
        "authenticated",
        "testing"
    ];
    
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
/*
async function isUserInGroup(groupId, bearerToken) {
    const url = new URL('https://graph.microsoft.com/v1.0/me/memberOf');
    url.searchParams.append('$filter', `id eq '${groupId}'`);
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        },
    });

    if (response.status !== 200) {
        return false;
    }

    const graphResponse = await response.json();
    const matchingGroups = graphResponse.value.filter(group => group.id === groupId);
    return matchingGroups.length > 0;
}
*/