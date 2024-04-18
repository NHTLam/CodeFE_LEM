"use client";

import { BookUser, CircleUserRound, GraduationCap } from "lucide-react";

export const Profile = () => {
  return (
    <>
      <div className="">
        <div className="container mx-auto mb-5 p-5">
          <div>
            <button className="mb-3 flex w-30 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-lime-800 hover:bg-lime-800/5 hover:text-lime-800 dark:border-transparent dark:bg-lime-800 dark:hover:border-lime-800 dark:hover:bg-lime-800/5 dark:hover:text-lime-800 dark:hover:shadow-none">
              Edit
            </button>
          </div>
          <div className="no-wrap md:-mx-2 md:flex ">
            <div className="w-full border border-stroke md:mx-2 md:w-9/12">
              <div className="rounded-sm bg-white p-3 shadow-sm">
                <div className="flex items-center space-x-2 font-semibold leading-8 text-gray-900">
                  <CircleUserRound className="text-green-500" />
                  <span className="tracking-wide">About</span>
                </div>
                <div className="text-gray-700">
                  <div className="grid text-sm md:grid-cols-2">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">First Name</div>
                      <div className="px-4 py-2">Jane</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Last Name</div>
                      <div className="px-4 py-2">Doe</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Gender</div>
                      <div className="px-4 py-2">Female</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Contact No.</div>
                      <div className="px-4 py-2">+11 998001001</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Current Address
                      </div>
                      <div className="px-4 py-2">
                        Beech Creek, PA, Pennsylvania
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Permanant Address
                      </div>
                      <div className="px-4 py-2">
                        Arlington Heights, IL, Illinois
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Email.</div>
                      <div className="px-4 py-2">
                        <a
                          className="text-blue-800"
                          href="mailto:jane@example.com"
                        >
                          jane@example.com
                        </a>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Birthday</div>
                      <div className="px-4 py-2">Feb 06, 1998</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-4"></div>

              <div className="rounded-sm bg-white p-3 shadow-sm">
                <div className="grid grid-cols-2">
                  <div>
                    <div className="mb-3 flex items-center space-x-2 font-semibold leading-8 text-gray-900">
                      <BookUser className="text-green-500" />
                      <span className="tracking-wide">Experience</span>
                    </div>
                    <ul className="list-inside space-y-2">
                      <li>
                        <div className="text-teal-600">
                          Owner at Her Company Inc.
                        </div>
                        <div className="text-xs text-gray-500">
                          March 2020 - Now
                        </div>
                      </li>
                      <li>
                        <div className="text-teal-600">
                          Owner at Her Company Inc.
                        </div>
                        <div className="text-xs text-gray-500">
                          March 2020 - Now
                        </div>
                      </li>
                      <li>
                        <div className="text-teal-600">
                          Owner at Her Company Inc.
                        </div>
                        <div className="text-xs text-gray-500">
                          March 2020 - Now
                        </div>
                      </li>
                      <li>
                        <div className="text-teal-600">
                          Owner at Her Company Inc.
                        </div>
                        <div className="text-xs text-gray-500">
                          March 2020 - Now
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div className="mb-3 flex items-center space-x-2 font-semibold leading-8 text-gray-900">
                      <GraduationCap className="text-green-500" />
                      <span className="tracking-wide">Education</span>
                    </div>
                    <ul className="list-inside space-y-2">
                      <li>
                        <div className="text-teal-600">
                          Masters Degree in Oxford
                        </div>
                        <div className="text-xs text-gray-500">
                          March 2020 - Now
                        </div>
                      </li>
                      <li>
                        <div className="text-teal-600">
                          Bachelors Degreen in LPU
                        </div>
                        <div className="text-xs text-gray-500">
                          March 2020 - Now
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-2 h-auto w-full border border-stroke md:w-3/12">
              <div className="border-t-4 border-green-400 bg-white p-3">
                <div className="image overflow-hidden">
                  <img
                    className="mx-auto h-auto w-full"
                    src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                    alt=""
                  />
                </div>
                <h1 className="my-1 text-xl font-bold leading-8 text-gray-900">
                  Jane Doe
                </h1>
                <h3 className="font-lg text-semibold leading-6 text-gray-600">
                  Owner at Her Company Inc.
                </h3>
                <p className="text-sm leading-6 text-gray-500 hover:text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit, eligendi dolorum sequi illum qui unde
                  aspernatur non deserunt
                </p>
                <ul className="mt-3 divide-y rounded bg-gray-100 px-3 py-2 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
                  <li className="flex items-center py-3">
                    <span>Status</span>
                    <span className="ml-auto">
                      <span className="rounded bg-green-500 px-2 py-1 text-sm text-white">
                        Active
                      </span>
                    </span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Member since</span>
                    <span className="ml-auto">Nov 07, 2016</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
