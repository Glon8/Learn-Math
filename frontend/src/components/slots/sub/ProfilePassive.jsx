import Slot from "../Slot"
import { languageContext } from "../../../context/LanguagesContext"
import { userContext } from "../../../context/UserContext";

function ProfilePassive({ type }) {
    const { language, defPack } = languageContext();
    const { stat, share } = userContext();

    const img = {
        'status': {
            'value': !stat ? (language?.statics?.user?.statusFalse ?? defPack.statics.user.statusFalse) :
                (language?.statics?.user?.statusTrue ?? defPack.statics.user.statusTrue),
            'category': language?.statics?.user?.status ?? defPack.statics.user.status,
        },
        'shared': {
            'value': !!share ? (language?.statics?.user?.sharedTrue ?? defPack.statics.user.sharedTrue) :
                (language?.statics?.user?.sharedFalse ?? defPack.statics.user.sharedFalse),
            'category': language?.statics?.user?.shared ?? defPack.statics.user.shared,
        },
    };

    return (<Slot value={img[type].value}
        category={img[type].category} />)
}

export default ProfilePassive