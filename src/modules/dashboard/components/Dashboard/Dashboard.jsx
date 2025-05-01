import Navbar from '@/modules/shared/components/Navbar/Navbar';
import { Heart, PaintbrushVertical } from 'lucide-react';

export default function Dashboard() {
  return (
    <>
      <div className="grid grid-cols-5 gap-20  mx-14 mt-5">
        <div className="col-span-3">
          <div>
            <Navbar />
          </div>

          <div>
            <div className="grid grid-cols-3">
              <div className=" shadow-2xl rounded-2xl p-6 w-max">
                <div className="flex items-center gap-2 ">
                  <div className="p-1.5 bg-[#FBF0F3] text-[#CA6B6E] inline-block rounded-lg">
                    <Heart />
                  </div>
                  <div>
                    <span className="font-semibold">Heart Rate</span>
                  </div>
                </div>
                <div className="my-2">
                  <span className="text-2xl block font-semibold">
                    98 <span className="text-[#818181] text-sm">bpm</span>{' '}
                  </span>

                  <span className="bg-[#FBF0F3] px-2 py-0.5 text-sm rounded-md inline-block mt-1.5 font-medium">
                    Normal
                  </span>
                </div>
              </div>
              <div className=" shadow-2xl rounded-2xl p-6 w-max">
                <div className="flex items-center gap-2 ">
                  <div className="p-1.5 bg-[#F8DEBD] text-[#CA6B6E] inline-block rounded-lg">
                    <PaintbrushVertical />
                  </div>
                  <div>
                    <span className="font-semibold">Blood Sugar</span>
                  </div>
                </div>
                <div className="my-2">
                  <span className="text-2xl block font-semibold">
                    80 <span className="text-[#818181] text-sm">mg/dL</span>{' '}
                  </span>

                  <span className="bg-[#F8DEBD] px-2 py-0.5 text-sm rounded-md inline-block mt-1.5 font-medium">
                    Normal
                  </span>
                </div>
              </div>
              <div className=" shadow-2xl rounded-2xl p-6 w-max">
                <div className="flex items-center gap-2 ">
                  <div className="p-1.5 bg-[#D0FBFF] text-[#478F96] inline-block rounded-lg">
                    <PaintbrushVertical />
                  </div>
                  <div>
                    <span className="font-semibold">Blood Sugar</span>
                  </div>
                </div>
                <div className="my-2">
                  <span className="text-2xl block font-semibold">
                    80 <span className="text-[#818181] text-sm">mg/dL</span>{' '}
                  </span>

                  <span className="bg-[#D0FBFF] px-2 py-0.5 text-sm rounded-md inline-block mt-1.5 font-medium">
                    Normal
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 shadow-lg p-3">
            <div class="w-full flex justify-between items-center mb-3  ">
              <div>
                <h2 class="text-2xl font-bold text-slate-800">
                  Your Plans Logs
                </h2>
              </div>
              <div class="ml-3">
                <div class="w-full max-w-sm min-w-[200px] relative">
                  <div class="relative">
                    <input
                      class="bg-white w-full pr-11 h-10 pl-3 py-2  placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                      placeholder="Search for invoice..."
                    />
                    <button
                      class="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                      type="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="3"
                        stroke="currentColor"
                        class="w-8 h-8 text-slate-600"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
              <table class="w-full text-left table-auto min-w-max">
                <thead>
                  <tr>
                    <th class="p-4 border-b border-slate-200 bg-slate-50">
                      <p class="text-sm font-normal leading-none text-slate-500">
                        Invoice Number
                      </p>
                    </th>
                    <th class="p-4 border-b border-slate-200 bg-slate-50">
                      <p class="text-sm font-normal leading-none text-slate-500">
                        Customer
                      </p>
                    </th>
                    <th class="p-4 border-b border-slate-200 bg-slate-50">
                      <p class="text-sm font-normal leading-none text-slate-500">
                        Amount
                      </p>
                    </th>
                    <th class="p-4 border-b border-slate-200 bg-slate-50">
                      <p class="text-sm font-normal leading-none text-slate-500">
                        Issued
                      </p>
                    </th>
                    <th class="p-4 border-b border-slate-200 bg-slate-50">
                      <p class="text-sm font-normal leading-none text-slate-500">
                        Due Date
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="hover:bg-slate-50 border-b border-slate-200">
                    <td class="p-4 py-5">
                      <p class="block font-semibold text-sm text-slate-800">
                        PROJ1001
                      </p>
                    </td>
                    <td class="p-4 py-5">
                      <p class="text-sm text-slate-500">John Doe</p>
                    </td>
                    <td class="p-4 py-5">
                      <p class="text-sm text-slate-500">$1,200.00</p>
                    </td>
                    <td class="p-4 py-5">
                      <p class="text-sm text-slate-500">2024-08-01</p>
                    </td>
                    <td class="p-4 py-5">
                      <p class="text-sm text-slate-500">2024-08-15</p>
                    </td>
                  </tr>
                  <tr class="hover:bg-slate-50 border-b border-slate-200">
                    <td class="p-4 py-5">
                      <p class="block font-semibold text-sm text-slate-800">
                        PROJ1002
                      </p>
                    </td>
                    <td class="p-4 py-5">
                      <p class="text-sm text-slate-500">Jane Smith</p>
                    </td>
                    <td class="p-4 py-5">
                      <p class="text-sm text-slate-500">$850.00</p>
                    </td>
                    <td class="p-4 py-5">
                      <p class="text-sm text-slate-500">2024-08-05</p>
                    </td>
                    <td class="p-4 py-5">
                      <p class="text-sm text-slate-500">2024-08-20</p>
                    </td>
                  </tr>
                  <tr class="hover:bg-slate-50 border-b border-slate-200">
                    <td class="p-4 py-5">
                      <p class="block font-semibold text-sm text-slate-800">
                        PROJ1003
                      </p>
                    </td>
                    <td class="p-4 py-5">
                      <p class="text-sm text-slate-500">Acme Corp</p>
                    </td>
                    <td class="p-4 py-5">
                      <p class="text-sm text-slate-500">$2,500.00</p>
                    </td>
                    <td class="p-4 py-5">
                      <p class="text-sm text-slate-500">2024-08-07</p>
                    </td>
                    <td class="p-4 py-5">
                      <p class="text-sm text-slate-500">2024-08-21</p>
                    </td>
                  </tr>
                  <tr class="hover:bg-slate-50 border-b border-slate-200">
                    <td class="p-4 py-5">
                      <p class="block font-semibold text-sm text-slate-800">
                        PROJ1004
                      </p>
                    </td>
                    <td class="p-4 py-5">
                      <p class="text-sm text-slate-500">Global Inc</p>
                    </td>
                    <td class="p-4 py-5">
                      <p class="text-sm text-slate-500">$4,750.00</p>
                    </td>
                    <td class="p-4 py-5">
                      <p class="text-sm text-slate-500">2024-08-10</p>
                    </td>
                    <td class="p-4 py-5">
                      <p class="text-sm text-slate-500">2024-08-25</p>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div class="flex justify-between items-center px-4 py-3">
                <div class="text-sm text-slate-500">
                  Showing <b>1-5</b> of 45
                </div>
                <div class="flex space-x-1">
                  <button class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded ">
                    Prev
                  </button>
                  <button class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-slate-800 border border-slate-800 rounded h">
                    1
                  </button>
                  <button class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded ">
                    2
                  </button>
                  <button class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded ">
                    3
                  </button>
                  <button class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded ">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-2">aaaaaaaaaaaaaaaannnnnnnnnnnnn</div>
      </div>
    </>
  );
}
