const removeAuth = (dataObj) => {
  const {_id, __v, password, refreshToken, ...data} = dataObj;
  return data;
}
const removeSecrete = (others, dataObj) => {
  const {remove, ...data} = dataObj;
  return data;
}
const reqResponse = (msg, data, field = "data", others = {}, op = true) => {
  const response = {
    success: op,
    msg,
    [field]: data,
    ...others,
  };
  return response;
}
module.exports = {
  removeAuth,
  removeSecrete,
  reqResponse,
}