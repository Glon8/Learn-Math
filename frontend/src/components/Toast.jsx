import { toasterTop, toasterBottom } from '../components/ui/toaster.jsx'

export const callLoadingToast = (loading, duration, pos) => {
    const promise = new Promise((resolve) => {
        setTimeout(() => resolve(), (duration * 1000))
    })

    pos && pos == 'bottom' ?
        toasterTop.promise(promise, {
            loading: { title: loading.title, description: loading.desc },
        }) :
        toasterBottom.promise(promise, {
            loading: { title: loading.title, description: loading.desc },
        });
}

export const callToast = (title, desc, trigger, type, pos) => {
    pos && pos == 'bottom' ?
        toasterTop.create({
            title: title,
            description: desc,
            trigger: trigger,
            type: (type ?? "info"),
        }) :
        toasterBottom.create({
            title: title,
            description: desc,
            trigger: trigger,
            type: (type ?? "info"),
        });
}