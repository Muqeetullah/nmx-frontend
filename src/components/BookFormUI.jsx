// BookFormUI.tsx
import React from "react";

export const BookFormUI = ({
  newBook,
  handleSubmit,
  register,
  errors,
  status,
}) => {
  return (
    <div className="flex w-full items-center justify-center mt-10">
      <div className="mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-gray-900 mb-6">
          {status === "Edit" ? "Edit Book" : "Add a New Book"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              defaultValue={newBook.category}
              {...register("category", { required: "Category is required" })}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.category && (
              <p className="text-red-500">{errors.category.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="isbn"
              className="block text-sm font-medium text-gray-700"
            >
              ISBN
            </label>
            <input
              type="text"
              id="isbn"
              // disabled={status === "Edit"}
              name="isbn"
              defaultValue={newBook.isbn}
              {...register("isbn", { required: "ISBN is required" })}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.isbn && (
              <p className="text-red-500">{errors.isbn.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Book Title
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={newBook.name}
              {...register("name", { required: "Book title is required" })}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              defaultValue={newBook.price}
              {...register("price", { required: "Price is required", min: 0 })}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              defaultValue={newBook.quantity}
              {...register("quantity", {
                required: "Quantity is required",
                min: 0,
              })}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.quantity && (
              <p className="text-red-500">{errors.quantity.message}</p>
            )}
          </div>
          <div className="col-span-2 mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {status === "Edit" ? "Update Book" : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// export default BookFormUI;
