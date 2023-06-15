import { NavLink } from "react-router-dom"
import FormField from "./formfield";
const PersonalDetails = (acc) => {
    const account = acc.account;
    return (
        <form className="form-entry" method="post">
            <FormField
                name="name"
                label="name"
                type="text"
                onChange={acc.onChangeAccount}
            />
            <FormField
                name="address"
                label="address"
                type="text"
                onChange={acc.onChangeAccount}
            />
            <FormField
                name="age"
                label="age"
                type="number"
                onChange={acc.onChangeAccount}
            />
            <br />
            <FormField
                name="gender"
                label="gender"
                type="text"
                onChange={acc.onChangeAccount}
            />
            <br />
            <FormField
                    name="mobile"
                    label="Phone Number"
                    type="tel"
                    onChange={acc.onChangeAccount}
            />
            <br />
            <FormField
                    name="aadhaar"
                    label="proof (aadhaar number)"
                    type="tel"
                    onChange={acc.onChangeAccount}
            />
            <div>
                  <input
                      type="submit"
                      value="Create Account"
                      onClick={acc.handleSubmit}
                  />
            </div>
        </form>
    );
  };

  export default PersonalDetails;
