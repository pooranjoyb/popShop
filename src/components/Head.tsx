interface HeadProps {
  h1: string;
  h2: string;
  nextLine?:boolean;
}

export default function Head({ h1, h2,nextLine }: HeadProps) {
  return (
    <div className="flex text-mynavy justify-center items-center">
      <div className="text-4xl sm:text-6xl font-extrabold">
        {h1}
        {(nextLine) ? <br /> : ""}
        <span
          style={{
            textShadow:
              "-1px -1px 0 #000, 5px -1px 0 #073B4C, -1px 1px 0 #073B4C, 10px 1px 0 #073B4C",
            color: "#fff",
          }}
        >
          {" "}
          {h2}{" "}
        </span>
      </div>
    </div>
  );
}
