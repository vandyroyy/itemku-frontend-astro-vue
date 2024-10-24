import sha3 from 'crypto-js/sha3';
import Base64 from 'crypto-js/enc-base64';
import hmacSHA512 from 'crypto-js/hmac-sha512';

export const createHmacDigest = (nonce: string, message: {}, path: string, privateKey: string) => {
  const jsonData = JSON.stringify(message).replace(/\\r/g, '');

  const hashDigest = sha3(nonce + jsonData);

  const hmacDigest = Base64.stringify(hmacSHA512(path + hashDigest, privateKey));
  return hmacDigest;
};

export default class ApiHelper {
  public static clientId = 'frontend_server';
  private static baseURL = 'https://internal-gateway.itemku.com';


  private static createHmacKey (endpoint: string, params: any, nonce: number = new Date().getTime()) {
    const hmacDigest = createHmacDigest(nonce.toString(), params, endpoint, 'frontend_server');
    return hmacDigest;
  };

  private static objectToQueryString(params?: Record<string, any>): string {
    if (!params) return '';

    return Object.entries(params)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          // Handle empty arrays
          if (value.length === 0) {
            return `${encodeURIComponent(key)}=`;
          }
          // Use brackets notation for arrays, even with single element
          return value.map(item => `${encodeURIComponent(key)}[]=${encodeURIComponent(String(item))}`).join('&');
        }
        if (value) return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
      })
      .join('&');
  }

  // GET
  // const params = new URLSearchParams({
  //   results: '5',
  //   gender: 'female'
  // });

  // const response = await fetch(`https://randomuser.me/api/?${params}`);

  public static async get(url: string, params?: Record<string, string | string[] | number | number[] | boolean>) {
    try {
      const nonce = new Date().getTime();
      const hmacDigest = ApiHelper.createHmacKey(url.replace(ApiHelper.baseURL, ''), {}, nonce);
      
      const headers: any = {
        'Client-ID': ApiHelper.clientId,
        Nonce: nonce,
        'X-Itemku-Content': hmacDigest,
      };

      const formattedParams = ApiHelper.objectToQueryString(params);

      const result: Response = await fetch(`${ApiHelper.baseURL}${url}?${formattedParams}`, {
        headers: headers,
      });

      return result.json();
    } catch (error) {
      return console.log('error', `Error on url: ${url}, ${error}`);
    }
  }

  // POST
  // const params = {
  //   results: 5,
  //   gender: 'female'
  // };

  // const response = await fetch('https://randomuser.me/api/', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(params)
  // });
}
