module.exports = function (context, req) {
  const roleGroupMappings = {
    "f54690d8-5036-464e-9fd4-ef75b08797f0": "admin",
    "9035a892-56ff-4271-877f-9d738627226c": "reader",
  };

  const user = req.body || {};
  const roles = [user.userId || "unknown", "test_role"];
  
  if (user.hasOwnProperty("claims")) {
    roles.push(...user.claims.map(clm => clm.val));
  }

  context.res.json({
    roles,
  });
};
