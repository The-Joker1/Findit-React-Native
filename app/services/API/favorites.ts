async function DeleteFavorite(userId: string, productId: string) {
  const response = await fetch("http://192.168.0.6:5173/myfavorites", {
    method: "DELETE",
    body: JSON.stringify({ userId, productId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Error deleting favorite");
  }

  const result = await response.json();
  return result;
}


async function GetUserFavorites(userId: string) {
  const url = new URL("http://192.168.0.6:5173/myfavorites");
  url.searchParams.append("userId", userId);

  const response = await fetch(url.toString(), {
    method: "GET",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Error fetching favorites");
  }

  const favorites = await response.json();
  return favorites;
}
type Product = {
  id: string;
  title: string;
  price: string;
  seller: string;
  thumbnail?: string;
  extensions?: string;
  rating?: string;
  reviews?: string;
};

export async function toggleFavorite(product: Product, userId: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const res = await fetch('http://192.168.0.6:5173/api/favorite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ product, userId })
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Error calling /api/favorite:', error);
    return {
      success: false,
      message: 'Could not reach the server or unexpected error occurred.'
    };
  }
}
