"use client"; // Add this if client-side features are needed

// import { addProduct } from "@/app/lib/actions";

const CreateUser = () => {
  return (
    <div className="bg-[var(--bgSoft)] p-5 rounded-lg mt-5">
      <form  className="flex flex-wrap justify-between gap-4">
      {/* <form action={addProduct} className="flex flex-wrap justify-between gap-4"> */}
        <div className="w-[45%]">
          <input
            type="text"
            placeholder="Title"
            name="title"
            required
            className="w-full p-7 bg-[var(--bg)] text-[var(--text)] border-2 border-[#2e374a] rounded-md"
          />
        </div>
        <div className="w-[45%]">
          <select
            name="cat"
            id="cat"
            required // Added for consistency
            className="w-full p-7 bg-[var(--bg)] text-[var(--text)] border-2 border-[#2e374a] rounded-md"
          >
            <option value="" disabled selected>
              Choose a Category
            </option>
            <option value="kitchen">Kitchen</option>
            <option value="phone">Phone</option>
            <option value="computer">Computer</option>
          </select>
        </div>
        <div className="w-[45%]">
          <input
            type="number"
            placeholder="Price"
            name="price"
            required
            className="w-full p-7 bg-[var(--bg)] text-[var(--text)] border-2 border-[#2e374a] rounded-md"
          />
        </div>
        <div className="w-[45%]">
          <input
            type="number"
            placeholder="Stock"
            name="stock"
            required
            className="w-full p-7 bg-[var(--bg)] text-[var(--text)] border-2 border-[#2e374a] rounded-md"
          />
        </div>
        <div className="w-[45%]">
          <input
            type="text"
            placeholder="Color"
            name="color"
            className="w-full p-7 bg-[var(--bg)] text-[var(--text)] border-2 border-[#2e374a] rounded-md"
          />
        </div>
        <div className="w-[45%]">
          <input
            type="text"
            placeholder="Size"
            name="size"
            className="w-full p-7 bg-[var(--bg)] text-[var(--text)] border-2 border-[#2e374a] rounded-md"
          />
        </div>
        <div className="w-full">
          <textarea
            required
            name="desc"
            id="desc"
            // rows="16"
            placeholder="Description"
            className="w-full p-7 bg-[var(--bg)] text-[var(--text)] border-2 border-[#2e374a] rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full p-7 bg-teal-500 text-[var(--text)] border-none rounded-md cursor-pointer hover:bg-teal-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateUser;