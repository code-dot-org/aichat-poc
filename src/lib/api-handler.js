export const invalidResponse = { message: "Not Allowed" };

export const apiHandler = (dispatch) => {
  return async function handler(req, res) {
    try {
      await dispatch[req.method](req, res);
    } catch (e) {
      console.log(e);
      res.status(500).json(invalidResponse);
    }
  };
};
