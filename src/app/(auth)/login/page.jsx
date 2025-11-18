import "../auth.css";

export default function Login() {
  return (
    <div className="form__container">
      <form className="form">
        <h1>Login</h1>
        <div className="input__control">
          <label className="label">Email</label>
          <input className="auth__input" type="email" />
        </div>
        <div className="input__control">
          <label className="label">Password</label>
          <input className="auth__input" type="password" />
        </div>
        <button className="form__button btn btn--primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
