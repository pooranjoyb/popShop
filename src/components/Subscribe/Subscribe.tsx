import Button from "../Button";
export default function Subscribe() {
  return (
<div className="md:h-40 md:flex md:justify-center md:items-center flex flex-col justify-between items-center p-4">
<div className="w-1/2 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">Subscribe to our newsletter</h1>
        <p className="text-lg">Stay up to date with our latest news, exclusive offers, and promotions.</p>
      </div>
      <div className="md:flex gap-4 w-1/2 justify-center items-center flex flex-col md:flex-row mt-4">
        <input type="text" placeholder="Enter your email" className="input input-bordered w-full max-w-xs" required />
        <Button text="Subscribe" color="mygreen" hover="myred" />
      </div>
    </div>
  );
}