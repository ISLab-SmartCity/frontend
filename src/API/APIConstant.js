import { API_URL } from 'Utils';

const PROVIDER_API = {
  /**
   * @method POST
   * @param
   */
  CREATE_PROVIDER: `${API_URL}/provider`,
  /**
   * @method GET
   * @param
   */
  GET_PROVIDER_LIST: `${API_URL}/provider`,
  /**
   * @method GET
   * @param
   */
  GET_PROVIDER_BY_ID: `${API_URL}/provider/:provider_id`,
  /**
   * @method PUT
   * @param
   */
  UPDATE_PROVIDER: `${API_URL}/provider`,
  /**
   * @method DELETE
   * @param
   */
  DELETE_PROVIDER: `${API_URL}/provider/:provider_id`,
};

const API = {
  ...PROVIDER_API,
};

export default API;
