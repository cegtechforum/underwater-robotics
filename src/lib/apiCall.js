const apiCall = async (endpoint, data, method = "GET") => {
  const url = `/api${endpoint}`;
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    ...(method !== "GET" && { body: JSON.stringify(data) }),
  };

  try {
    const response = await fetch(url, config);
    const responseData = await response.json();

    if (!response.ok) {
      return {
        status: response.status,
        message: responseData.message || "Something went wrong",
        errors: responseData.errors || null,
      };
    }

    return {
      status: response.status,
      ...responseData,
    };
  } catch (error) {
    console.error("API Call Error:", error);
    return {
      status: error.status || 500,
      message: error.message || "Server not available",
    };
  }
};

export default apiCall;
