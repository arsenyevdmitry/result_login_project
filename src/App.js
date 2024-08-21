import * as Yup from "yup"

import React, { useRef } from "react"

import styles from "./App.module.css"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address")
    .max(20, "Email must be less than 20 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  passwordRepeat: Yup.string()
    .required("Repeat password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
})

export const App = () => {
  const buttonRef = useRef(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
  })

  const onSubmit = (data) => {
    console.log(data)
    buttonRef.current.focus()
  }

  return (
    <div className={styles.app}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={`${styles.input} ${
              errors.email ? styles.inputError : ""
            }`}
          />
          {errors.email && (
            <div className={styles.error}>{errors.email.message}</div>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className={`${styles.input} ${
              errors.password ? styles.inputError : ""
            }`}
          />
          {errors.password && (
            <div className={styles.error}>{errors.password.message}</div>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="passwordRepeat" className={styles.label}>
            Repeat Password
          </label>
          <input
            id="passwordRepeat"
            type="password"
            {...register("passwordRepeat")}
            className={`${styles.input} ${
              errors.passwordRepeat ? styles.inputError : ""
            }`}
          />
          {errors.passwordRepeat && (
            <div className={styles.error}>{errors.passwordRepeat.message}</div>
          )}
        </div>
        <button
          type="submit"
          className={styles.button}
          disabled={!isValid}
          ref={buttonRef}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  )
}
