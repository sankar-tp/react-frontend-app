
const BASE_URL = "https://dummyjson.com";

export async function getTasks() {
  const response = await fetch(`${BASE_URL}/todos?limit=20`);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data = await response.json();

  return data.todos;
}
