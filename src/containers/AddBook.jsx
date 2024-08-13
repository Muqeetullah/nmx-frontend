import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BookFormUI from "../components/BookFormUI";
import { useBook } from "../context/BookContext";
import { useToast } from "../context/ToastContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useMutation, useSubscription } from "@apollo/client";
import { ADD_BOOK, EDIT_BOOK } from "../graphQL/Mutations";
import { SUBSCRIBE_BOOK } from "../graphQL/Subscription";

const AddBook = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const validationSchema = Yup.object().shape({
    category: Yup.string().required("Category is required"),
    isbn: Yup.string().required("ISBN is required"),
    name: Yup.string().required("Book title is required"),
    price: Yup.number()
      .required("Price is required")
      .min(0, "Price must be a positive number"),
    quantity: Yup.number()
      .required("Quantity is required")
      .min(0, "Quantity must be a positive number"),
  });
  const token = localStorage.getItem("userData");
  const authToken = JSON.parse(token).token;
  const role = JSON.parse(token).role;
  const [AddBook] = useMutation(ADD_BOOK, {
    context: {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
    onCompleted(data) {
      const { book } = data;
      console.log(book);

      showToast("Book Added", { type: "success" });

      navigate("/admin/view-book-list");
    },

    onError(error) {
      // toast.error("Something Went Wrong!", error);
      showToast(error.message);
      console.log(error);
    },
  });

  // useSubscription(SUBSCRIBE_BOOK, {
  //   onSubscriptionData: ({ subscriptionData }) => {
  //     if (subscriptionData.data) {
  //       console.log(subscriptionData.data);
  //     }
  //   },
  // });

  // if (token.role === "admin") {
  //   console.log("Asa", data);
  //   showToast("A new book was added");
  // }

  const [UpdateBook] = useMutation(EDIT_BOOK, {
    context: {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
    onCompleted(data) {
      const { book } = data;
      console.log(book);

      showToast("Book Updated", { type: "success" });

      navigate("/admin/view-book-list");
    },

    onError(error) {
      // toast.error("Something Went Wrong!", error);
      showToast(error.message);
      console.log(error);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    if (location?.state?.status) {
      const { isbn, ...rest } = data;

      UpdateBook({
        variables: {
          input: rest, // Passing rest directly as input
          isbn, // Passing isbn separately
        },
      });
    } else {
      AddBook({
        variables: {
          input: {
            ...data,
          },
        },
      });
    }
  };

  const status = location.state?.status || "";
  const initialValues = location.state?.book || {
    category: "",
    isbn: "",
    name: "",
    price: 0,
    quantity: 0,
  };

  return (
    <BookFormUI
      newBook={initialValues}
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      status={status}
    />
  );
};

export default AddBook;
