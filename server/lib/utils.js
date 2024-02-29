// Function to check if the input is a valid URL
export function checkURL(url) {
  try {
    return Boolean(new URL(url))
  } catch (error) {
    return false
  }
}
