export const searchBookKeywords = async (keyword: string) => {
  try {
    const response = await fetch(`/api/${keyword}`);
    if (response.ok) {
      const data = await response.json();
      // console.log(data);
      return data;
    } else {
      console.error('Failed to fetch data:', response.statusText);
      return response.statusText;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getBookInfoAPI = async (id: string) => {
  try {
    const response = await fetch(`/api/getBookInfo/${id}`);
    if (response.ok) {
      const data = response.json();
      // console.log(data);
      return data;
    } else {
      console.error('책 상세정보 불러오기 실패', response.statusText);
      return response.statusText;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
