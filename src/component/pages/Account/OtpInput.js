import OtpInput from "react-otp-input";
import React, { useState } from "react";


export default function Otpinput({ getChildOtp }) {
    const [code, setCode] = useState("");
        const handleChange = (code) => {
        setCode(code)
        getChildOtp(code)
    };

    return (
        <OtpInput
            value={code}
            onChange={handleChange}
            numInputs={4}
            separator={<span style={{ width: "8px" }}></span>}
            isInputNum={true}
            shouldAutoFocus={true}
                inputStyle={{
                width: "32px",
                height: "32px",
                fontSize: "12px",
                color: "#13A74B",
                fontWeight: "400"
                // caretColor: "blue"
            }}
        />

    );
}
