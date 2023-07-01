import {
  ApiFetcherOptions,
  ApiFetcherResults
} from "@common/types/api"
import { API_URL, STOREFRONT_TOKEN } from "@framework/const"

const fetchApi = async <T>({
  query,
  variables }: ApiFetcherOptions
): Promise<ApiFetcherResults<T>> => {
  const res = await fetch(API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": STOREFRONT_TOKEN!
    },
    body: JSON.stringify({
      query,
      variables
    })
  })
  const { data, errors} = await res.json()
  console.log("API_URL ==================", API_URL)
  console.log("STOREFRONT_TOKEN ==================", STOREFRONT_TOKEN)
  console.log("API_URL  res ==================", data, errors)
  // ?? is checking if left hand expression is null or undefined -> if it is go with right expression
  // || is checking if left hand expression is null, undefined, "", 0, false
  if (errors) {
    throw new Error(errors[0].message ?? errors.message)
  }

  return { data }
}

export default fetchApi
