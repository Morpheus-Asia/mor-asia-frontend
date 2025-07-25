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
    const locale = params?.filters?.locale;
    if (locale) {
      params.filters.locale = sanitizeLocal(locale as string);
    }
    const queryParams = { contentType, ...params };

    const queryString = qs.stringify(queryParams);

    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/morpheus-content?${queryString}`;

    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        error: `Failed to fetch data from Strapi, status=${response.status})`,
      };
    }

    const jsonData = await response.json();
    return spreadData ? spreadStrapiData(jsonData) : jsonData;
  } catch (error) {
    throw error;
  }
}
