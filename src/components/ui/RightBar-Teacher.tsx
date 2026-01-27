import Image from "next/image";
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";

const Rightbar = () => {
  return (
    <div className="fixed">
      <div className="bg-gradient-to-t from-blue-300 to-blue-600 p-5 px-6 rounded-lg mb-5 relative">
               <div className="flex flex-col gap-6">
          <span className="font-bold">🔥 Available Now</span>
          <h3>How to use the new version of the admin dashboard?</h3>
          <span className="text-[var(--textSoft)] font-medium text-xs">
            Takes 4 minutes to learn
          </span>
          <p className="text-[var(--textSoft)] text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit eius libero perspiciatis recusandae possimus.
          </p>
         
        </div>
      </div>
      <div className="bg-gradient-to-t from-blue-300 to-blue-600 p-5 px-6 rounded-lg mb-5 relative">
        <div className="flex flex-col gap-6">
          <span className="font-bold">🚀 Coming Soon</span>
          <h3>
            New server actions are available, partial pre-rendering is coming
            up!
          </h3>
          <span className="text-[var(--textSoft)] font-medium text-xs">
            Boost your productivity
          </span>
          <p className="text-[var(--textSoft)] text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit eius libero perspiciatis recusandae possimus.
          </p>
          <button className="p-2.5 flex items-center gap-2.5 w-max bg-[#5d57c9] text-white border-none rounded-md cursor-pointer">
            <MdReadMore />
            Learn
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;