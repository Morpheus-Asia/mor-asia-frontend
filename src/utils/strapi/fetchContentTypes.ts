// import { draftMode } from "next/headers";
import qs from "qs";
import { sanitizeLocal } from ".";
/**
 * Fetches data for a specified Strapi content type.
 *
 * @param {string} contentType - The type of content to fetch from Strapi.
 * @param {string} params - Query parameters to append to the API request.
 * @return {Promise<object>} The fetched data.
 */

interface StrapiData {
  id: number;
  [key: string]: any; // Allow for any additional fields
}

interface StrapiResponse {
  data: StrapiData | StrapiData[];
}

export function spreadStrapiData(data: StrapiResponse): StrapiData | null {
  if (Array.isArray(data.data) && data.data.length > 0) {
    return data.data[0];
  }
  if (!Array.isArray(data.data)) {
    return data.data;
  }
  return null;
}

// export default async function fetchContentType(
//   contentType: string,
//   params: Record<string, any> = {},
//   spreadData?: boolean
// ): Promise<any> {
//   const { isEnabled } = await draftMode();

//   try {
//     const locale = params?.filters?.locale;
//     if (locale) {
//       params.filters.locale = sanitizeLocal(locale as string);
//     }
//     const queryParams = { ...params };

//     if (isEnabled) {
//       queryParams.status = "draft";
//     }

//     // Construct the full URL for the API request
//     const url = new URL(`api/${contentType}`, process.env.NEXT_PUBLIC_API_URL);

//     console.log(`url------> ${url.href}?${qs.stringify(queryParams)}`);
//     // Perform the fetch request with the provided query parameters
//     const response = await fetch(`${url.href}?${qs.stringify(queryParams)}`, {
//       method: "GET",
//       cache: "no-store",
//     });

//     if (!response.ok) {
//       throw new Error(
//         `Failed to fetch data from Strapi (url=${url.toString()}, status=${
//           response.status
//         })`
//       );
//     }
//     const jsonData: StrapiResponse = await response.json();
//     return spreadData ? spreadStrapiData(jsonData) : jsonData;
//   } catch (error) {
//     // Log any errors that occur during the fetch process
//     console.error("FetchContentTypeError", error);
//   }
// }

/**
 * Fetch data for a given content type from the API.
 * Adjusted for client-side usage.
 */
export default async function fetchContentType(
  contentType: string,
  params: Record<string, any> = {},
  spreadData?: boolean
): Promise<any> {
  try {
    // Remove any server-only draft mode logic since we're on the client
    const locale = params?.filters?.locale;
    if (locale) {
      params.filters.locale = sanitizeLocal(locale as string);
    }
    const queryParams = { ...params };

    // If you need to modify queryParams based on some client-side logic,
    // do it here. For example, you might want to set a status or other flags:
    // queryParams.status = "published"; // or any other logic

    // Construct the full URL for the API request using the NEXT_PUBLIC_API_URL env variable.
    const url = new URL(`api/${contentType}`, process.env.NEXT_PUBLIC_API_URL);
    const queryString = qs.stringify(queryParams);
    console.log(`url------> ${url.href}?${queryString}`);

    // Perform the fetch request with the provided query parameters
    const response = await fetch(`${url.href}?${queryString}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from Strapi (url=${url.toString()}, status=${
          response.status
        })`
      );
    }

    const jsonData = await response.json();
    return spreadData ? spreadStrapiData(jsonData) : jsonData;
  } catch (error) {
    console.error("FetchContentTypeError", error);
    throw error;
  }
}
