import {validate} from "class-validator";

export async function validation(object:Object) {
    await validate(object).then(errors => {
        if (errors.length > 0) {
            throw new Error(errors.toString());
        }
    });
}

