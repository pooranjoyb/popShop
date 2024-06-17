function SkeletonWithContent() {
  return (
    <div className="flex flex-col gap-5">
      <div className="skeleton w-full h-[50vh] overflow-hidden rounded-lg bg-gray-200 aspect-h-8 aspect-w-7"></div>
      <div className="skeleton h-4 w-36 m-auto"></div>
      <div className="skeleton h-4 w-20 m-auto"></div>
    </div>
  );
}

export default SkeletonWithContent;
