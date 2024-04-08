const page = async ({ params }: { params: { postId: string } }) => {
  const { postId } = params;

  return <div>{postId}</div>;
};

export default page;
