import React from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center mt-24  ">
      <form className="space-y-2 w-1/3" action="#" method="POST">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            First Name
          </label>
          <div className="mt-2">
            <input
              id="first_name"
              name="first_name"
              type="first_name"
              required
              className="w-full p-1.5 border-solid border-2 rounded-md outline-none"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Last Name
          </label>
          <div className="mt-2">
            <input
              id="last_name"
              name="last_name"
              type="last_name"
              required
              className="w-full p-1.5 border-solid border-2 rounded-md outline-none"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email Address
            </label>
          </div>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full p-1.5 border-solid border-2 rounded-md outline-none"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md mt-5 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
