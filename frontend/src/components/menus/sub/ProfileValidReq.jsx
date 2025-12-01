import "primeicons/primeicons.css";

import { languageContext } from "../../../context/LanguagesContext";
import { userContext } from "../../../context/UserContext";

import FlexMenu from "../../menus/FlexMenu";

function ProfileValidReq({ type, update, convert }) {
    const { upUser, del, upTop, outTop } = userContext();
    const { language, defPack } = languageContext();

    const convert_addons = [
        update ? () => update() : () => { },
        convert ? (thing) => { convert(thing); } : (thing) => { return thing; },
    ];

    const img = {
        'share': {
            'pi_icon': 'pi-book',
            'title': language?.profile?.share ?? defPack.profile.share,
            'onClick': '',
            'options': [
                () => { },
                () => { upTop(); upUser('shared', true); }
            ],
        },
        'remove': {
            'pi_icon': 'pi-book',
            'title': language?.profile?.remove ?? defPack.profile.remove,
            'onClick': '',
            'options': [
                () => { },
                () => { outTop(); upUser('shared', false); }
            ],
        },
        'convert': {
            'pi_icon': 'pi-cloud-upload',
            'title': language?.profile?.convert ?? defPack.profile.convert,
            'onClick': () => convert_addons[1](true),
            'options': [
                () => convert_addons[1](false),
                () => { convert_addons[0](); convert_addons[1](false); }
            ],
        },
        'delete': {
            'pi_icon': 'pi-cloud-download',
            'title': language?.profile?.delete ?? defPack.profile.delete,
            'onClick': '',
            'options': [
                () => { },
                () => del(),
            ],
        },
    };

    return (<FlexMenu pi_icon={img[type].pi_icon}
        onClick={img[type].onClick}
        title={img[type].title}
        inner_title={language?.statics?.confirmation?.question ?? defPack.statics.confirmation.question}
        options={[
            { value: language?.statics?.confirmation?.false ?? defPack.statics.confirmation.false, click: img[type].options[0] },
            { value: language?.statics?.confirmation?.true ?? defPack.statics.confirmation.true, click: img[type].options[1] }]} />)
}

export default ProfileValidReq