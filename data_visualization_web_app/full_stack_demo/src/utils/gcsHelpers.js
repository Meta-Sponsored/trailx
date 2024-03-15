export async function fetchDataFromGCS(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Could not fetch data from GCS:", error);
      return null;
    }
  }