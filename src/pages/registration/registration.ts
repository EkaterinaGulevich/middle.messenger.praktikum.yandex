import {registerHelper} from 'handlebars';

import {TCG} from 'src/utils/CG';
import {getFormData} from "src/utils/getFormData";
import template from './registration.hbs'
import {RegistrationFormData} from "./registration.types";
import './registration.scss'


registerHelper('CG_registration', options =>
    TCG(options, 'registration')
)


export function runRegistrationPage() {
    const btnRegistration = document.getElementById('btn-registration');
    if (!btnRegistration) {
        throw Error('Not found HTMLElement with id="btn-registration" in DOM')
    }

    btnRegistration.onclick = function () {
        const formData: RegistrationFormData = {
            email: '',
            login: '',
            first_name: '',
            second_name: '',
            phone: '',
            password: '',
            repeat_password: '',
            ...getFormData('registration')
        };
        console.log(formData)
        window.location.pathname = '/chats'
    }

}

export const RegistrationTpl = template;

