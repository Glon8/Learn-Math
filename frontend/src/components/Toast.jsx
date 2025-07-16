import { toasterTop, toasterBottom } from '../components/ui/toaster.jsx'

//callToast('Closed', 'test test test', '', '', pos);

export const callToast = (title, desc, trigger, type, pos) => {
    pos && pos == 'bottom' ?
        toasterTop.create({
            title: title,
            description: desc,
            trigger: trigger,
            type: (type ? type : "info"),
        }) :
        toasterBottom.create({
            title: title,
            description: desc,
            trigger: trigger,
            type: (type ? type : "info"),
        });
}