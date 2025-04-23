export async function SearchQuery(query: string) {
    const url = new URL("http://192.168.0.6:5173/search"); 
    url.searchParams.append("query", query);
  
    const response = await fetch(url.toString(), {
      method: "GET",
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error fetching search results");
    }
  
    const data = await response.json();
    //console.log("Search results:", data.results); // Log the search results
    return data.results;
  }
  