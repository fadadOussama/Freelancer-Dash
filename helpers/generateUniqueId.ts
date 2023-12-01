export function generateUniqueId() {
  const timestamp = new Date().getTime(); // Get current timestamp in milliseconds
  const randomNum = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999

  const uniqueId = `${timestamp}${randomNum}`; // Concatenate timestamp and random number

  return uniqueId;
}
