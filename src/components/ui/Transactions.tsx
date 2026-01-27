import Image from "next/image";

const Transactions = () => {
  return (
    <div className="bg-[var(--bgSoft)] p-5 rounded-lg">
      <h2 className="mb-5 font-light text-[var(--textSoft)]">Latest Transactions</h2>
      <table className="w-full">
        <thead>
          <tr>
            <td>Name</td>
            <td>Status</td>
            <td>Date</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="flex gap-2.5 items-center">
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className="object-cover rounded-full"
                />
                John Doe
              </div>
            </td>
            <td>
              <span className="rounded-md p-1 text-sm text-white bg-[#f7cb7375]">
                Pending
              </span>
            </td>
            <td>14.02.2024</td>
            <td>$3.200</td>
          </tr>
          <tr>
            <td>
              <div className="flex gap-2.5 items-center">
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className="object-cover rounded-full"
                />
                John Doe
              </div>
            </td>
            <td>
              <span className="rounded-md p-1 text-sm text-white bg-[#afd6ee75]">
                Done
              </span>
            </td>
            <td>14.02.2024</td>
            <td>$3.200</td>
          </tr>
          <tr>
            <td>
              <div className="flex gap-2.5 items-center">
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className="object-cover rounded-full"
                />
                John Doe
              </div>
            </td>
            <td>
              <span className="rounded-md p-1 text-sm text-white bg-[#f7737375]">
                Cancelled
              </span>
            </td>
            <td>14.02.2024</td>
            <td>$3.200</td>
          </tr>
          <tr>
            <td>
              <div className="flex gap-2.5 items-center">
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className="object-cover rounded-full"
                />
                John Doe
              </div>
            </td>
            <td>
              <span className="rounded-md p-1 text-sm text-white bg-[#f7cb7375]">
                Pending
              </span>
            </td>
            <td>14.02.2024</td>
            <td>$3.200</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;