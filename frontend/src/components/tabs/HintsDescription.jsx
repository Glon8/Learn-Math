import { Text } from "@chakra-ui/react"
import { userContext } from "../../context/UserContext";

function HintsDescription({ body, type }) {
    const { lang } = userContext();

    const descList = {
        'main title': {
            'hideBelow': 'lg',
            'fontWeight': 'bold',
            'fontSize': 'xl',
            'textAlign': 'center',
        },
        'sub title': {
            'fontWeight': 'medium',
            'marginBottom': 1,
        },
        'description': {
            'background': '',
            'boxShadow': 'sm',
            'rounded': 'sm',
            'paddingY': 1,
            'whiteSpace': '',
        },
    };

    return (<Text h={'fit'} paddingX={3}
        color={{ _light: '#1D282E/90', _dark: '#EEF6F9' }}
        direction={lang == 'he' ? 'rtl' : 'ltr'}
        hideBelow={descList[type].hideBelow ?? ''}
        fontWeight={descList[type].fontWeight ?? ''}
        fontSize={descList[type].fontSize ?? ''}
        textAlign={descList[type].textAlign ?? (lang == 'he' ? 'right' : 'left')}
        marginBottom={descList[type].marginBottom ?? 3}
        background={descList[type].background ?? { _dark: '#1D282E/65' }}
        boxShadow={descList[type].boxShadow ?? { _dark: '0 0 5px 2px #EEF6F9' }}
        rounded={descList[type].rounded ?? { _dark: 'sm' }}
        paddingY={descList[type].paddingY ?? ''}
        whiteSpace={descList[type].whiteSpace ?? 'pre-line'}
    >
        {body ?? ''}
    </Text>)
}

export default HintsDescription