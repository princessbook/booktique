export async function GET(
  request: Request,
  { params }: { params: { keyword: string } }
) {
  const { keyword } = params;
  console.log(keyword);

  try {
    const targetUrl = `${process.env.NEXT_PUBLIC_BOOK_API_URL}?ttbkey=${
      process.env.NEXT_PUBLIC_BOOK_API_KEY
    }&Query=${encodeURIComponent(
      keyword
    )}&QueryType=Title&MaxResults=10&Cover=Mini&start=1&SearchTarget=Book&output=js&Version=20131101`;
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
