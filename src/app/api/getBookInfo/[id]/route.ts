export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log(id);

  try {
    const targetUrl = `${process.env.NEXT_PUBLIC_BOOK_INFO_API_URL}?ttbkey=${
      process.env.NEXT_PUBLIC_BOOK_API_KEY
    }&itemIdType=ISBN13&ItemId=${encodeURIComponent(
      id
    )}&output=js&Version=20131101&OptResult=ebookList,usedList,reviewList`;
    const response = await fetch(targetUrl);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return new Response(JSON.stringify(await response.json()), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
