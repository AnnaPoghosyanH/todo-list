import { Button } from "react-bootstrap";
import { ExclamationCircleFill } from "react-bootstrap-icons";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import FormApi from "../../api/formApi";
import { setLoader } from "../../redux/reducers/loaderSlice";
import styles from "./contact.module.css";

const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const formApi = new FormApi();

function Contact() {
  const inputRefs = useRef([]);
  const [nameErrorMessage, setNameErrorMessage] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleSubmit = () => {
    const name = inputRefs.current[0].value;
    const email = inputRefs.current[1].value;
    const message = inputRefs.current[2].value;

    if (!name) {
      setNameErrorMessage("Enter your name");
    } else {
      setNameErrorMessage("");
    }

    if (!message) {
      setErrorMessage("Enter your message");
    } else {
      setErrorMessage("");
    }
    setEmailErrorMessage(null);

    if (!email) {
      setEmailErrorMessage("Enter your email address");
      return;
    }
    setEmailErrorMessage(null);

    if (!emailPattern.test(email)) {
      setEmailErrorMessage("Email address is not valid");
      return;
    }

    if (nameErrorMessage) {
      return;
    }

    const form = {
      name,
      email,
      message,
    };

    dispatch(setLoader(true));
    formApi
      .sendForm(form)
      .then(() => {
        toast.success("Message was send successfully");
        inputRefs.current[0].value = "";
        inputRefs.current[1].value = "";
        inputRefs.current[2].value = "";
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };

  const addToRefsArr = (ref) => {
    if (!inputRefs.current.includes(ref)) {
      inputRefs.current.push(ref);
    }
  };
  return (
    <div className={styles.contact}>
      <div>
        <h2 className={styles.title}>Contact</h2>
        <div className={styles.contactForm}>
          <label
            htmlFor="name"
            className={`${styles.label} ${
              nameErrorMessage ? styles.errorMessage : ""
            }`}
          >
            Full name *
          </label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            ref={addToRefsArr}
            className={`${styles.textInput} form-control ${
              nameErrorMessage ? styles.invalid : ""
            }`}
          />
          <div className={styles.errorContainer}>
            {nameErrorMessage && (
              <>
                <ExclamationCircleFill color="red" />
                <span className={styles.errorMessage}>{nameErrorMessage}</span>
              </>
            )}
          </div>

          <label
            htmlFor="email"
            className={`${styles.label} ${
              emailErrorMessage ? styles.errorMessage : ""
            }`}
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            ref={addToRefsArr}
            className={`${styles.textInput} form-control ${
              emailErrorMessage ? styles.invalid : ""
            }`}
          />
          <div className={styles.errorContainer}>
            {emailErrorMessage && (
              <>
                <ExclamationCircleFill color="red" />
                <span className={styles.errorMessage}>{emailErrorMessage}</span>
              </>
            )}
          </div>

          <label
            htmlFor="message"
            className={`${styles.label} ${
              errorMessage ? styles.errorMessage : ""
            }`}
          >
            Message *
          </label>
          <textarea
            type="text"
            id="message"
            rows={5}
            ref={addToRefsArr}
            className={`${styles.textInput} form-control ${
              errorMessage ? styles.invalid : ""
            }`}
          />
          <div className={styles.errorContainer}>
            {errorMessage && (
              <>
                <ExclamationCircleFill color="red" />
                <span className={styles.errorMessage}>{errorMessage}</span>
              </>
            )}
          </div>
        </div>
        <Button
          variant="success"
          className={`${styles.submit} float-end`}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default Contact;
