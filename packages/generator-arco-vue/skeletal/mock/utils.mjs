export function buildSuccessResponse(data) {
  return { code: 0, msg: 'ok', data: data || {} };
}

export function buildFailureResponse(msg, data) {
  return { code: 1, msg, data: data || {} };
}
