module.exports.catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next)
      .then()
      .catch((err) => {
        console.log("error occured");
        next(err);
      });
  };
};
