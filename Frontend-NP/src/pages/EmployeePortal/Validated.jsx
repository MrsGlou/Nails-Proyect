import { useState } from "react";
import { useForm } from "react-hook-form";

const Validated = () => {
    const [res, setRes] = useState({});
    const [send, setSend] = useState(false);
    const [validatedOk, setValidatedOk] = useState(false);
    const {handleSubmit, register} = useForm();
    return(<div>Hola</div>)
}

export default Validated;