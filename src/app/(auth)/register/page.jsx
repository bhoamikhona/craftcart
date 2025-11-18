import "../auth.css";

export default function Register() {
  return (
    <div className="form__container">
      <form className="form">
        <h1>Register</h1>
        <div className="input__control">
          <label className="label">Name</label>
          <input className="input" type="text" />
        </div>
        <div className="input__control">
          <label className="label">Email</label>
          <input className="input" type="email" />
        </div>
        <div className="input__control">
          <label className="label">Password</label>
          <input className="input" type="password" />
        </div>
        <div className="input__control">
          <label className="label">Confirm Password</label>
          <input className="input" type="password" />
        </div>
        <button className="btn btn--primary form__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
