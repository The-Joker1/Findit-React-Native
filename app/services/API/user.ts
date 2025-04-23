export async function GetUserById(userId: string) {
   
    const url = new URL("http://192.168.0.6:5173/api/user");
    url.searchParams.append("userId", userId);
  
    const response = await fetch(url.toString(), {
      method: "GET",
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error fetching user");
    }
  
    const user = await response.json();
    return user;
  }
  