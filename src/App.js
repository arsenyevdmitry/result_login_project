import React, { useState } from "react"

import styles from "./App.module.css"

export const App = () => {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState(null)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(null)
  const [passwordRepeat, setPasswordRepeat] = useState("")
  const [passwordRepeatError, setPasswordRepeatError] = useState(null)

  const validateEmail = (value) => {
    if (!/^[\w_@.]*$/.test(value)) {
      return "Неверный email. Допустимые символы: буквы, цифры и нижнее подчёркивание"
    } else if (value.length > 20) {
      return "Неверный email. Должно быть не больше 20 символов"
    } else if (value.length < 3) {
      return "Неверный email. Должно быть не меньше 3 символов"
    }
    return null
  }

  const validatePassword = (value) => {
    if (value.length < 8) {
      return "Пароль должен быть не менее 8 символов"
    }
    return null
  }

  const validatePasswordRepeat = (value) => {
    if (value !== password) {
      return "Пароли не совпадают"
    }
    return null
  }

  const handleEmailChange = (event) => {
    const value = event.target.value
    setEmail(value)
    setEmailError(validateEmail(value))
  }

  const handlePasswordChange = (event) => {
    const value = event.target.value
    setPassword(value)
    setPasswordError(validatePassword(value))
  }

  const handlePasswordRepeatChange = (event) => {
    const value = event.target.value
    setPasswordRepeat(value)
    setPasswordRepeatError(validatePasswordRepeat(value))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({ email, password, passwordRepeat })
  }

  const isFormValid = !emailError && !passwordError && !passwordRepeatError

  return (
    <div className={styles.app}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            className={`${styles.input} ${emailError ? styles.inputError : ""}`}
          />
          {emailError && <div className={styles.error}>{emailError}</div>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className={`${styles.input} ${
              passwordError ? styles.inputError : ""
            }`}
          />
          {passwordError && <div className={styles.error}>{passwordError}</div>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="passwordRepeat" className={styles.label}>
            Repeat Password
          </label>
          <input
            id="passwordRepeat"
            type="password"
            value={passwordRepeat}
            onChange={handlePasswordRepeatChange}
            className={`${styles.input} ${
              passwordRepeatError ? styles.inputError : ""
            }`}
          />
          {passwordRepeatError && (
            <div className={styles.error}>{passwordRepeatError}</div>
          )}
        </div>
        <button type="submit" className={styles.button} disabled={!isFormValid}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  )
}
