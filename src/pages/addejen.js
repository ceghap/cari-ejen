import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect } from "react";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function AddEjen() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [coverage, setCoverage] = useState([]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Tambah Ejen</title>
        <meta name="description" content="tambah ejen" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="font-bold text-4xl mb-10">Tambah Ejen</h1>
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            country: "",
            address: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));

              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="mb-5 p-3 w-80 focus:border-gray-700 rounded border-2 outline-non"
                />
              </div>
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="mb-5 p-3 w-80 focus:border-gray-700 rounded border-2 outline-non"
                />
              </div>
              <div>
                <Field
                  type="textarea"
                  name="address"
                  placeholder="Address"
                  className="mb-5 p-3 w-80 focus:border-gray-700 rounded border-2 outline-non"
                />
              </div>
              <div>
                <Field
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  className="mb-5 p-3 w-80 focus:border-gray-700 rounded border-2 outline-non"
                />
              </div>
              <div>
                <Field
                  type="text"
                  name="country"
                  placeholder="Country"
                  className="mb-5 p-3 w-80 focus:border-gray-700 rounded border-2 outline-non"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mb-5 p-3 w-80 bg-gray-700 rounded-lg border-2 border-white text-white"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
}
