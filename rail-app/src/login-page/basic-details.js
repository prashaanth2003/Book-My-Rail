import { NavLink } from "react-router-dom"
import FormField from "./formfield";
const BasicDetails = (acc) => {
    const account = acc.account;
    return (
        <form className="form-entry" method="post">
            <FormField
                name="username"
                label="username"
                type="text"
                onChange={acc.onChangeAccount}
            />
            <FormField
                name="email"
                label="email"
                type="email"
                onChange={acc.onChangeAccount}
            />
            <br />
            <FormField
                name="password"
                label="password"
                type="password"
                onChange={acc.onChangeAccount}
            />
            <br />
            <div>
                <input
                    type="submit"
                    value="Continue"
                    onClick= {acc.handleSubmit}
                />
                {/* <NavLink to="/personal" className="title">
                    <input
                        type="button"
                        value="Continue"
                        onClick= {() => {}}
                    />
                </NavLink> */}
            </div>
        </form>
    );
};

export default BasicDetails;
