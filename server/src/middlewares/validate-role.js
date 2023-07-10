const hasRole = roles => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "You want to verify the role without validating the token first"
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `These roles are required: ${roles}`
      });
    }

    next();
  };
};

module.exports = hasRole;
