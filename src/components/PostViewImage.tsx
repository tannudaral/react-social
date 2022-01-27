export default function PostViewImage(props: { image: string }) {
  return (
    <img
      className="w-full mt-3 rounded-lg border-1 border-gray-200 dark:border-gray-900"
      src={props.image}
      alt=""
    />
  );
}
