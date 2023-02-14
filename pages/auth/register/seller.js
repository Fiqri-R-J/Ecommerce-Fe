/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import style from "@/styles/pages/register.module.scss";
import Link from "next/link";

export default function RegSeller() {
  return (
    <>
      <Head>
        <title>Register | Blanja</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.main}>
        <section className={`container-fluid ${style.register}`}>
          <div className="container">
            <div className={`row`}>
              <div className={`col-12 pb-5 ${style.col}`}>
                {/* ICON */}
                <div className={`${style.icon}`}>
                  <img src="/images/icon-app.webp" alt="icon-app" />
                </div>
                <div className={`${style.order}`}>
                  <h5>Please sign up with your account</h5>
                </div>
                <div className={`${style.btn}`}>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic radio toggle button group"
                  >
                    <Link
                      href={"/auth/register/customer"}
                      className={`btn btn-outline-primary rounded-start ${style.btnCustomer}`}
                    >
                      Customer
                    </Link>
                    <button
                      type="button"
                      className={`btn btn-primary rounded-end ${style.btnSeller}`}
                    >
                      Seller
                    </button>
                  </div>
                </div>
                <div className={`${style.form}`}>
                  <form>
                    <div className="mb-3">
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                        aria-describedby="emailHelp"
                        placeholder="Name"
                        // onChange={(e) => setFullname(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Email"
                        // onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="number"
                        class="form-control"
                        id="perusahaan"
                        aria-describedby="emailHelp"
                        placeholder="Phone number"
                        // onChange={(e) => setCompany(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        class="form-control"
                        id="Jabatan"
                        aria-describedby="emailHelp"
                        placeholder="Store name"
                        // onChange={(e) => setPosition(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        class="form-control"
                        id="phone"
                        aria-describedby="emailHelp"
                        placeholder="Password"
                        // onChange={(e) => setPhone_number(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
                <div className={`d-grid gap-2 mb-4 ${style.btnRegister}`}>
                  <button
                    className="btn btn-warning"
                    type="button"
                    // onClick={handleSubmit}
                    // disabled={isLoading}
                  >
                    Sign Up
                  </button>
                </div>
                <div className={`mt-3 register ${style.register}`}>
                  <p className="text-center">
                    Already have a Tokopedia account?{" "}
                    <Link
                      href={"/auth/login/recruiter"}
                      className={`${style.linkLogin}`}
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
